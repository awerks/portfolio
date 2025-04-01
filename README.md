# Portfolio Website

This is a personal portfolio website built using **FastAPI** for the backend and **HTML/CSS/JavaScript** for the frontend. The project showcases various sections, including a portfolio of projects, services offered, and a contact form. It is designed to be responsive and visually appealing.

---

## Features

- **Dynamic Navigation Bar**: Highlights the active page dynamically.
- **Portfolio Section**: Displays projects with detailed pages for each project.
- **Gallery Popup**: Allows users to view project images in a popup gallery.
- **Contact Form**: Integrated with Telegram API for message delivery.
- **Dark Mode Support**: Includes a dark theme for better user experience.
- **Pagination**: Supports navigation between projects.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Technologies Used

### Backend

- **FastAPI**: A modern, fast web framework for Python.
- **Jinja2**: Template engine for rendering HTML pages dynamically.

### Frontend

- **HTML5**: Markup language for structuring content.
- **CSS3**: Styling with custom variables and responsive design.
- **JavaScript**: For interactivity and gallery popup functionality.
- **Magnific Popup**: A lightweight jQuery plugin for gallery popups.

### Other Tools

- **Bootstrap**: For responsive grid and components.
- **FontAwesome**: For icons.
- **Slick.js**: For sliders and carousels.

---

## Setup Instructions

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
<a href="../assets/img/projects/2/3.webp" class="gallery-popup">
  <img
    src="../assets/img/projects/2/3.webp"
    alt="Project Image"
    class="img-fluid w-100"
  />
</a>
```

### Contact Form

- The contact form is integrated with Telegram.
- Messages are sent to a specified chat using the Telegram Bot API.

### Rate Limiting

• The contact form is protected with rate limiting to prevent abuse.
• The limit is set to 5 requests per minute.

### Dark Mode

- he website supports a dark theme.
- To enable dark mode, add the dark-theme class to the `<body>` tag.
- Styles for dark mode are defined in the style.css file under the .dark-theme selector.
