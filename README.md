# Portfolio Website

This is a personal portfolio website built using FastAPI for the backend and HTML/CSS/JavaScript for the frontend

### Prerequisites

- Python 3.9 or higher
- Node.js (for managing frontend dependencies, if needed)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/awerks/portfolio.git
cd portfolio
```

2.  Install Python dependencies:

```bash
pip install -r requirements.txt
```

3.  Set up environment variables:

- Add the following variables:
    ```bash
    BOT_TOKEN=<your-telegram-bot-token>
    CHAT_ID=<your-telegram-chat-id>
    ```

4. Run the FastAPI server:

```bash
uvicorn main:app --reload
```

or simply

```bash
python main.py
```

## Usage

### Adding a New Project

- Create a new HTML file in the projects directory (e.g., `project_3.html`).
- Add the project details and images.
- Update the `portfolio.html` or navigation to link to the new project.

### Customizing Styles

- Modify the `style.css` file in the `css` folder for global styles.
- Use `responsive.css` for mobile-specific adjustments.

### Gallery Popup

The project uses Magnific Popup for displaying images in a gallery. To add a gallery popup:

- Wrap the image in an `<a>` tag with the `gallery-popup` class.
- Set the `href` attribute to the full-size image URL.

Example:

```html
<a
    href="../assets/img/projects/2/3.webp"
    class="gallery-popup">
    <img
        src="../assets/img/projects/2/3.webp"
        alt="Project Image"
        class="img-fluid w-100" />
</a>
```

### Contact Form

- The contact form is integrated with Telegram.
- Messages are sent to a specified chat using the Telegram Bot API.
