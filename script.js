const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function updateActiveNav() {
  let current = null;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140) current = section;
  });

  navLinks.forEach((link) => {
    const isActive = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
}

window.addEventListener("scroll", () => {
  updateHeaderState();
  updateActiveNav();
}, { passive: true });

updateHeaderState();
updateActiveNav();
