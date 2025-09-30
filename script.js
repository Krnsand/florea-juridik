// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Active link på scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
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
  if (atBottom) {
    const lastSection = sections[sections.length - 1];
    if (lastSection) current = lastSection.getAttribute("id");
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Smooth scroll fungerar via CSS scroll-behavior
