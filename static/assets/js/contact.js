const contactForm = document.getElementById("contact-form");
const feedbackMessage = document.getElementById("contact-feedback-message");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const submitButton = contactForm.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;

    const formData = new FormData(contactForm);
    const jsonData = JSON.stringify(Object.fromEntries(formData));

    try {
        const response = await fetch("https://contact.illiashust.com/telegram/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonData,
        });

        if (response.ok) {
            feedbackMessage.style.color = "green";
            feedbackMessage.textContent = "Message sent successfully";
            contactForm.reset();
        } else {
            feedbackMessage.style.color = "red";
            feedbackMessage.textContent = "An error occurred";
        }
    } catch (err) {
        console.error(err);
        feedbackMessage.style.color = "red";
        feedbackMessage.textContent = "Network error. Please try again later.";
    } finally {
        setTimeout(() => (feedbackMessage.textContent = ""), 5000);
        if (submitButton) submitButton.disabled = false;
    }
});
