// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

const closeMenu = () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  hamburger.setAttribute("aria-expanded", "false");
};

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close when clicking outside the menu/hamburger
document.addEventListener("click", (e) => {
  if (!navMenu.classList.contains("active")) return;
  const clickInsideMenu = navMenu.contains(e.target);
  const clickOnHamburger = hamburger.contains(e.target);
  if (!clickInsideMenu && !clickOnHamburger) {
    closeMenu();
  }
});

// Active link på scroll
// Include footer with an id (e.g., footer#contact) since the contact section is in the footer now
const sections = document.querySelectorAll("section, footer[id]");
const navLinks = document.querySelectorAll("nav a");

const updateActiveFromScroll = () => {
  const headerOffset = 90; // match CSS header min-height
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerOffset;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  // If at the very bottom, ensure the last section is active
  const atBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom && sections.length) {
    current = sections[sections.length - 1].getAttribute("id");
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
};

// Close menu on nav link click (useful on mobile)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // set active state based on clicked link target
    const target = link.getAttribute("href");
    navLinks.forEach((l) => l.classList.remove("active"));
    if (target) {
      const match = Array.from(navLinks).find((l) => l.getAttribute("href") === target);
      if (match) match.classList.add("active");
    }
    closeMenu();
  });
});

window.addEventListener("scroll", updateActiveFromScroll);
window.addEventListener("resize", updateActiveFromScroll);
window.addEventListener("load", updateActiveFromScroll);
window.addEventListener("hashchange", () => {
  // allow browser to jump, then compute
  setTimeout(updateActiveFromScroll, 20);
});

// Smooth scroll fungerar via CSS scroll-behavior
