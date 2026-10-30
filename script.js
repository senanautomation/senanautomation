/* SENAN Automation — navigation and enquiry interactions */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const subject = `SENAN Automation enquiry — ${data.get("interest")}`;
      const body = [
        "Hello SENAN Automation,",
        "",
        "I'd like to discuss an automation project.",
        "",
        `Name: ${data.get("name")}`,
        `Work email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `Area of interest: ${data.get("interest")}`,
        "",
        "Project details:",
        data.get("message"),
        "",
        "Regards,",
        data.get("name")
      ].join("\n");

      const mailto = `mailto:sales@senanautomation.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (feedback) feedback.textContent = "Your email app should open with the enquiry details. Please review and send the message.";
      window.location.href = mailto;
    });
  }
});
