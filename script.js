const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
