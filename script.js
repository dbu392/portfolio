// ---------- 1. Tab switching (nav links, hero buttons, and tab bar all control the same panels) ----------
const tabButtons = document.querySelectorAll(".tab-btn");
const navLinks = document.querySelectorAll(".nav-link, [data-tab].btn");
const panels = document.querySelectorAll(".tab-panel");

function showTab(name) {
  panels.forEach((p) => p.classList.toggle("active", p.id === name));
  tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  navLinks.forEach((l) => l.classList.toggle("active", l.dataset.tab === name));
}

tabButtons.forEach((btn) => btn.addEventListener("click", () => showTab(btn.dataset.tab)));
navLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showTab(link.dataset.tab);
    document.getElementById("menu").classList.remove("open");
    window.scrollTo({ top: document.querySelector(".profile-layout").offsetTop - 80, behavior: "smooth" });
  })
);

// ---------- 2. Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

// ---------- 3. Skill bars: animate once when the Skills tab is opened ----------
let skillsAnimated = false;
function animateSkillsIfNeeded() {
  if (skillsAnimated) return;
  if (!document.getElementById("skills").classList.contains("active")) return;
  document.querySelectorAll(".bar-row").forEach((row) => {
    const fill = row.querySelector(".bar-fill");
    fill.style.width = row.getAttribute("data-level") + "%";
  });
  skillsAnimated = true;
}
document.querySelector('[data-tab="skills"]').addEventListener("click", () => setTimeout(animateSkillsIfNeeded, 50));

// ---------- 4. Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();