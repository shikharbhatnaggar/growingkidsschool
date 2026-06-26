// ⚠️ REPLACE WITH SCHOOL'S WHATSAPP NUMBER (digits only, with country code, no '+', no spaces).
//    Example: India 9876543210 → "919876543210"
const WHATSAPP_NUMBER = "918109695832";

document.addEventListener("DOMContentLoaded", () => {
  // Lucide icons
  if (window.lucide) lucide.createIcons();

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Update floating WhatsApp button + form to use real number
  const waFloat = document.getElementById("wa-float");
  if (waFloat) {
    waFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi GrowingKids, I'd like to know more about admissions."
    )}`;
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-drawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => drawer.classList.toggle("hidden"));
    drawer.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => drawer.classList.add("hidden"))
    );
  }

  // Header scroll style
  const header = document.getElementById("site-header");
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  // Safety net: ensure reveals are visible even if IO somehow misses them
  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("visible"));
  }, 1500);

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  document.querySelectorAll(".gallery-img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("show");
      lightbox.classList.remove("hidden");
      lightbox.style.display = "flex";
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove("show");
    lightbox.classList.add("hidden");
    lightbox.style.display = "";
    lightboxImg.src = "";
  };
  closeBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
  });

  // Admission form -> WhatsApp
  const form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const parentName = (data.get("parentName") || "").toString().trim();
      const phone = (data.get("phone") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const childName = (data.get("childName") || "").toString().trim();
      const grade = (data.get("grade") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      const lines = [
        "Hi GrowingKids! I'd like to enquire about admission.",
        "",
        `• Parent's name: ${parentName}`,
        `• Phone: ${phone}`,
        `• Email: ${email}`,
        `• Child's name: ${childName}`,
        `• Grade applying for: ${grade}`,
      ];
      if (message) lines.push(`• Message: ${message}`);

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(url, "_blank", "noopener");
    });
  }
});