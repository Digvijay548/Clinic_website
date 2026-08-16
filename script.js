/* ═══════════════════════════════════════════════════════
   Platinum Dental Smile — script.js
   ═══════════════════════════════════════════════════════ */

// ── CONFIG ─────────────────────────────────────────────
const WHATSAPP_NUMBER = "917030939995"; // ← Replace with actual number (no + or spaces)
const CLINIC_NAME     = "Platinum dental smile";

// ── HEADER SCROLL EFFECT ────────────────────────────────
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ── HAMBURGER MENU ──────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const nav       = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("open");
  document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
});

// Close menu when a nav link is clicked
document.querySelectorAll(".nav-link, .nav-cta-btn").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (nav.classList.contains("open") &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)) {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
    document.body.style.overflow = "";
  }
});

// ── ACTIVE NAV LINK ON SCROLL ───────────────────────────
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-link");

const observeSection = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active-link",
            link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(sec => observeSection.observe(sec));

// ── SCROLL REVEAL ───────────────────────────────────────
const reveals = document.querySelectorAll(
  ".service-card, .why-card, .testi-card, .about-feat, .contact-card, .experience-card, .appt-feat, .cred-item, .about-exp-badge"
);

reveals.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 60 * (Array.from(reveals).indexOf(entry.target) % 6));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach(el => revealObserver.observe(el));

// ── SET MIN DATE FOR APPOINTMENT FORM ──────────────────
const dateInput = document.getElementById("preferredDate");
if (dateInput) {
  const today = new Date();
  const yyyy  = today.getFullYear();
  const mm    = String(today.getMonth() + 1).padStart(2, "0");
  const dd    = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// ── WHATSAPP BOOKING FUNCTION ───────────────────────────
function bookOnWhatsApp() {
  const name      = document.getElementById("patientName").value.trim();
  const phone     = document.getElementById("patientPhone").value.trim();
  const date      = document.getElementById("preferredDate").value;
  const time      = document.getElementById("preferredTime").value;
  const treatment = document.getElementById("treatment").value;
  const message   = document.getElementById("message").value.trim();

  // Validation
  if (!name) {
    showFormError("patientName", "Please enter your full name.");
    return;
  }
  if (!phone) {
    showFormError("patientPhone", "Please enter your mobile number.");
    return;
  }
  if (!isValidPhone(phone)) {
    showFormError("patientPhone", "Please enter a valid phone number.");
    return;
  }
  if (!date) {
    showFormError("preferredDate", "Please select a preferred date.");
    return;
  }
  if (!time) {
    showFormError("preferredTime", "Please select a preferred time.");
    return;
  }
  if (!treatment) {
    showFormError("treatment", "Please select the treatment required.");
    return;
  }

  // Format date for display
  const displayDate = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Build WhatsApp message
  const waMessage = [
    `🦷 *Appointment Request — ${CLINIC_NAME}*`,
    ``,
    `👤 *Patient Name:* ${name}`,
    `📱 *Mobile Number:* ${phone}`,
    `📅 *Preferred Date:* ${displayDate}`,
    `🕐 *Preferred Time:* ${time}`,
    `🩺 *Treatment Required:* ${treatment}`,
    message ? `💬 *Message / Problem:* ${message}` : ``,
    ``,
    `_Sent from the clinic website booking form._`
  ].filter(line => line !== undefined).join("\n");

  // Open WhatsApp
  const encodedMessage = encodeURIComponent(waMessage);
  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Visual feedback
  const btn = document.getElementById("submitBtn");
  btn.textContent = "Opening WhatsApp...";
  btn.style.opacity = "0.8";
  btn.style.pointerEvents = "none";

  setTimeout(() => {
    window.open(waURL, "_blank");
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> ✅ Message Sent!`;
    btn.style.background = "#16a34a";
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";

    // Reset after 3 seconds
    setTimeout(() => {
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Send Appointment on WhatsApp`;
      btn.style.background = "";
    }, 3000);
  }, 400);
}

// ── FORM VALIDATION HELPERS ─────────────────────────────
function showFormError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Remove existing error
  clearFormError(field);

  field.style.borderColor = "#EF4444";
  field.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";

  const error = document.createElement("p");
  error.className = "form-error";
  error.style.cssText = `
    color: #EF4444;
    font-size: 12px;
    margin-top: 5px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  `;
  error.innerHTML = `⚠️ ${message}`;

  field.parentNode.appendChild(error);
  field.focus();
  field.scrollIntoView({ behavior: "smooth", block: "center" });

  // Clear error on input
  const clear = () => {
    clearFormError(field);
    field.removeEventListener("input", clear);
    field.removeEventListener("change", clear);
  };
  field.addEventListener("input", clear);
  field.addEventListener("change", clear);
}

function clearFormError(field) {
  field.style.borderColor = "";
  field.style.boxShadow = "";
  const existingError = field.parentNode.querySelector(".form-error");
  if (existingError) existingError.remove();
}

function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
  return /^\d{7,15}$/.test(cleaned);
}

// ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ── HIDE/SHOW FLOATING WA BUTTON ────────────────────────
const waFloat = document.getElementById("whatsappFloat");
let lastScrollY = 0;

window.addEventListener("scroll", () => {
  if (!waFloat) return;
  const current = window.scrollY;
  // Hide while scrolling down fast, show otherwise
  if (current > lastScrollY + 60) {
    waFloat.style.transform = "translateY(120%)";
    waFloat.style.opacity = "0";
  } else {
    waFloat.style.transform = "";
    waFloat.style.opacity = "";
  }
  lastScrollY = current;
}, { passive: true });

// ── COUNTER ANIMATION ───────────────────────────────────
function animateCounter(el, target, suffix = "") {
  let start = 0;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, step);
}

// Observe hero trust numbers
const trustNumbers = document.querySelectorAll(".trust-item strong");
const credNumbers  = document.querySelectorAll(".cred-item strong");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = "true";
      const raw = entry.target.textContent;
      const num = parseInt(raw.replace(/\D/g, ""), 10);
      const suffix = raw.replace(/[\d]/g, "");
      if (!isNaN(num)) animateCounter(entry.target, num, suffix);
    }
  });
}, { threshold: 0.5 });

[...trustNumbers, ...credNumbers].forEach(el => counterObserver.observe(el));

// ── INIT ────────────────────────────────────────────────
console.log(`%c🦷 ${CLINIC_NAME} Website Loaded`, "color:#00B4D8;font-size:14px;font-weight:bold");
console.log("%cTo customize: update WHATSAPP_NUMBER in script.js and clinic details in index.html", "color:#6B7E96;font-size:12px");