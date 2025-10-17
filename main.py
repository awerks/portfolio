from typing import Annotated
from fastapi import FastAPI, Form, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import PlainTextResponse
from models import ContactForm
from os import getenv
from rate_limiter import limiter
from slowapi.errors import RateLimitExceeded
from fastapi.templating import Jinja2Templates

import os
import httpx

app = FastAPI(openapi_url=None, docs_url=None, redoc_url=None)
app.state.limiter = limiter

BOT_TOKEN = getenv("BOT_TOKEN")
CHAT_ID = getenv("CHAT_ID")

if not BOT_TOKEN or not CHAT_ID:
    raise ValueError("BOT_TOKEN and CHAT_ID must be set in environment variables.")

templates = Jinja2Templates(directory="templates")


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler():
    return PlainTextResponse("Rate limit exceeded. Please try again later.", status_code=429)


@app.get("/")
async def index():
    return templates.TemplateResponse("index.html", {"request": {}, "active_page": "home"})


@app.get("/services")
async def services():
    return templates.TemplateResponse("services.html", {"request": {}, "active_page": "services"})


@app.get("/contact")
async def contact_page():
    return templates.TemplateResponse("contact.html", {"request": {}, "active_page": "contact"})


@app.get("/portfolio")
async def portfolio():
    return templates.TemplateResponse("portfolio.html", {"request": {}, "active_page": "portfolio"})


@app.get("/project-details/{project_id}")
async def project_details(request: Request, project_id: int):
    project_dir = f"templates/projects"
    if not os.path.exists(os.path.join(project_dir, f"project_{project_id}.html")):
        return PlainTextResponse("Project not found.", status_code=404)

    num_projects = len(os.listdir(project_dir))
    next_project = project_id + 1 if project_id < num_projects else 1
    previous_project = project_id - 1 if project_id > 1 else num_projects
    return templates.TemplateResponse(
        f"projects/project_{project_id}.html",
        {
            "request": request,
            "active_page": "portfolio",
            "next_project": next_project,
            "previous_project": previous_project,
        },
    )


@app.post("/contact")
@limiter.limit("5/minute")
async def contact(request: Request, data: Annotated[ContactForm, Form()]):

    telegram_api_url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    telegram_message = f"""
`
    New contact form submission:

    Name: {data.name}
    Email: {data.email}
    Message: {data.message}
    Subject: {data.subject}

    """

    async with httpx.AsyncClient() as client:
        response = await client.post(
            telegram_api_url,
            data={
                "chat_id": CHAT_ID,
                "text": telegram_message,
            },
        )
    if response.status_code != 200:
        return {"ok": False, "error": "Failed to send message."}

    return {"ok": True, "message": "Message sent successfully."}


app.mount("/", StaticFiles(directory="static", html=True), name="static")
