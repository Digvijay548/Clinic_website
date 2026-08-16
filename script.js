/* ═══════════════════════════════════════════════════════
   Platinum Dental Smile — script.js (data-driven)
   All content is loaded from data.json.
   ═══════════════════════════════════════════════════════ */

let D = null;

/* ── HELPERS ──────────────────────────────────────────── */
function esc(str) {
  return String(str ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const TOOTH_SVG = `<svg width="SIZE" height="SIZE" viewBox="0 0 32 32" fill="none"><path d="M16 2C10 2 5 6.5 5 12c0 3.5 1.5 6.5 4 8.5L10 28c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2l1-7.5c2.5-2 4-5 4-8.5C27 6.5 22 2 16 2z" fill="#00B4D8"/><path d="M13 14v-4M16 14v-6M19 14v-4" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const WA_SVG = `<svg width="SIZE" height="SIZE" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;

function toothSvg(size) { return TOOTH_SVG.replace(/SIZE/g, size); }
function waSvg(size) { return WA_SVG.replace(/SIZE/g, size); }

function waHref() {
  return `https://wa.me/${D.whatsapp.number}?text=${encodeURIComponent(D.whatsapp.message)}`;
}

function headerHTML(eyebrow, title, titleAccent, subtitle) {
  return `
    <p class="section-eyebrow">${esc(eyebrow)}</p>
    <h2 class="section-title">${esc(title)}${titleAccent ? ` <span class="accent">${esc(titleAccent)}</span>` : ""}</h2>
    ${subtitle ? `<p class="section-subtitle">${esc(subtitle)}</p>` : ""}
  `;
}

/* ── RENDER: META + HEADER ────────────────────────────── */
function applyMeta() {
  document.title = D.site.pageTitle;
  document.getElementById("pageDesc").setAttribute("content", D.site.pageDescription);
}

function renderHeader() {
  document.getElementById("logo").innerHTML = `
    <div class="logo-icon">${toothSvg(32)}</div>
    <div class="logo-text">
      <span class="logo-name">${esc(D.site.name)}</span>
      <span class="logo-sub">${esc(D.site.branch)}</span>
    </div>
  `;
  document.getElementById("navList").innerHTML = D.nav.map(n =>
    n.cta
      ? `<li><a href="${esc(n.href)}" class="nav-cta-btn">${esc(n.label)}</a></li>`
      : `<li><a href="${esc(n.href)}" class="nav-link">${esc(n.label)}</a></li>`
  ).join("");
}

/* ── RENDER: HERO ─────────────────────────────────────── */
function renderHero() {
  const h = D.hero;
  const title = h.titleLines.map(l =>
    l.accent ? `<span class="hero-title-accent">${esc(l.text)}</span>` : esc(l.text)
  ).join("<br/>");

  document.getElementById("heroContent").innerHTML = `
    <div class="hero-badge">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#F4A642"/></svg>
      ${esc(h.badge)}
    </div>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-subtitle">${esc(h.subtitle)}</p>
    <div class="hero-actions">
      <a href="${esc(h.btnPrimary.href)}" class="btn btn-primary btn-lg">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        ${esc(h.btnPrimary.label)}
      </a>
      <a href="${esc(h.btnSecondary.href)}" class="btn btn-outline btn-lg">${esc(h.btnSecondary.label)}</a>
    </div>
    <div class="hero-trust">
      ${h.trust.map((t, i) => `
        ${i > 0 ? '<div class="trust-divider"></div>' : ''}
        <div class="trust-item"><strong>${esc(t.value)}</strong><span>${esc(t.label)}</span></div>
      `).join("")}
    </div>
  `;

  const cc = h.consultCard;
  document.getElementById("heroVisual").innerHTML = `
    <div class="hero-card-main">
      <div class="hero-consult-card">
        <div class="consult-icon">${esc(cc.icon)}</div>
        <p class="consult-label">${esc(cc.label)}</p>
        <h3>${esc(cc.title)}</h3>
        <p>${esc(cc.desc)}</p>
        <div class="consult-mini-grid">
          ${cc.tags.map(t => `<span>${esc(t)}</span>`).join("")}
        </div>
      </div>
    </div>
    ${h.badges.map(b => `<div class="hero-float-badge badge-${esc(b.position)}">${b.icon}<span>${esc(b.text)}</span></div>`).join("")}
  `;
}

/* ── RENDER: ABOUT ────────────────────────────────────── */
function renderAbout() {
  const a = D.about;
  document.getElementById("aboutInner").innerHTML = `
    <div class="about-image-col">
      <div class="about-img-wrap">
        <div class="care-process-card">
          <div class="process-head">
            <span>${esc(a.process.headLabel)}</span>
            <strong>${esc(a.process.headTitle)}</strong>
          </div>
          ${a.process.steps.map(s => `
            <div class="process-step"><b>${esc(s.num)}</b><div><h4>${esc(s.title)}</h4><p>${esc(s.desc)}</p></div></div>
          `).join("")}
        </div>
        <div class="about-img-accent"></div>
        <div class="about-exp-badge">
          <strong>${esc(a.expBadge.value)}</strong>
          <span>${a.expBadge.label}</span>
        </div>
      </div>
    </div>
    <div class="about-text-col">
      <p class="section-eyebrow">${esc(a.eyebrow)}</p>
      <h2 class="section-title">${esc(a.title)} <span class="accent">${esc(a.titleAccent)}</span></h2>
      ${a.desc.map(d => `<p class="about-desc">${esc(d)}</p>`).join("")}
      <div class="about-features">
        ${a.features.map(f => `
          <div class="about-feat">
            <div class="feat-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span>${esc(f)}</span>
          </div>
        `).join("")}
      </div>
      <a href="#appointment" class="btn btn-primary">${esc(a.btnLabel)}</a>
    </div>
  `;
}

/* ── RENDER: SERVICES ─────────────────────────────────── */
function renderServices() {
  const s = D.sections.services;
  document.getElementById("servicesHeader").innerHTML = headerHTML(s.eyebrow, s.title, s.titleAccent, s.subtitle);
  document.getElementById("servicesGrid").innerHTML = D.services.map(service => `
    <div class="service-card">
      <div class="service-img"><img src="${esc(service.image)}" alt="${esc(service.name)}" loading="lazy" /></div>
      <div class="service-icon" style="--icon-color:${esc(service.color)}">${service.icon}</div>
      <h3 class="service-name">${esc(service.name)}</h3>
      <p class="service-desc">${esc(service.desc)}</p>
      <a href="#appointment" class="service-link">Book Now →</a>
    </div>
  `).join("");
}

/* ── RENDER: WHY US ───────────────────────────────────── */
function renderWhy() {
  const s = D.sections.whyUs;
  document.getElementById("whyHeader").innerHTML = headerHTML(s.eyebrow, s.title, s.titleAccent, s.subtitle);
  document.getElementById("whyGrid").innerHTML = D.whyUs.map(item => `
    <div class="why-card">
      <div class="why-num">${esc(item.num)}</div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.desc)}</p>
    </div>
  `).join("");
}

/* ── RENDER: DOCTOR ───────────────────────────────────── */
function renderDoctor() {
  const doc = D.doctor;
  document.getElementById("doctorInner").innerHTML = `
    <div class="doctor-img-col">
      <div class="doctor-expertise-card">
        <div class="expertise-icon">✓</div>
        <h3>${esc(doc.expertise.title)}</h3>
        <ul>
          ${doc.expertise.points.map(p => `<li>${esc(p)}</li>`).join("")}
        </ul>
        <div class="expertise-note">${esc(doc.expertise.note)}</div>
      </div>
    </div>
    <div class="doctor-text-col">
      <p class="section-eyebrow eyebrow-light">${esc(doc.eyebrow)}</p>
      <h2 class="section-title title-light">${esc(doc.name)}</h2>
      <p class="doctor-degree">${esc(doc.degree)}</p>
      ${doc.bio.map(b => `<p class="doctor-bio">${esc(b)}</p>`).join("")}
      <div class="doctor-credentials">
        ${doc.credentials.map(c => `
          <div class="cred-item"><strong>${esc(c.value)}</strong><span>${esc(c.label)}</span></div>
        `).join("")}
      </div>
      <a href="#appointment" class="btn btn-gold">${esc(doc.btnLabel)}</a>
    </div>
  `;
}

/* ── RENDER: TESTIMONIALS ─────────────────────────────── */
function renderTestimonials() {
  const s = D.sections.testimonials;
  document.getElementById("testiHeader").innerHTML = headerHTML(s.eyebrow, s.title, s.titleAccent, s.subtitle);
  document.getElementById("testiGrid").innerHTML = D.testimonials.map(ti => `
    <div class="testi-card${ti.featured ? " testi-featured" : ""}">
      <div class="testi-stars">${"★".repeat(ti.stars)}${"☆".repeat(Math.max(0, 5 - ti.stars))}</div>
      <p class="testi-text">"${esc(ti.text)}"</p>
      <div class="testi-author">
        <div class="testi-avatar" style="background:${esc(ti.avatar)}">${esc((ti.name || "?").charAt(0))}</div>
        <div>
          <strong>${esc(ti.name)}</strong>
          <span>${esc(ti.role)}</span>
        </div>
      </div>
    </div>
  `).join("");
}

/* ── RENDER: EXPERIENCE ───────────────────────────────── */
function renderExperience() {
  const s = D.sections.experience;
  document.getElementById("expHeader").innerHTML = headerHTML(s.eyebrow, s.title, s.titleAccent, s.subtitle);
  document.getElementById("expGrid").innerHTML = D.experience.map(x => `
    <div class="experience-card${x.large ? " experience-large" : ""}">
      <div class="experience-number">${esc(x.num)}</div>
      <h3>${esc(x.title)}</h3>
      <p>${esc(x.desc)}</p>
    </div>
  `).join("");
}

/* ── RENDER: APPOINTMENT ──────────────────────────────── */
function renderAppointment() {
  const a = D.appointment;
  const hoursText = D.hours.map(h => `Mon–Sat: ${esc(h.time)}`).join("<br/>").replace("Mon–Sat:", "").trim();

  document.getElementById("apptInner").innerHTML = `
    <div class="appt-info">
      <p class="section-eyebrow">${esc(a.eyebrow)}</p>
      <h2 class="section-title">${esc(a.title)} <span class="accent">${esc(a.titleAccent)}</span></h2>
      <p class="appt-desc">${esc(a.desc)}</p>
      <div class="appt-features">
        ${a.features.map(f => `
          <div class="appt-feat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${esc(f)}
          </div>
        `).join("")}
      </div>
      <div class="clinic-hours">
        <h4>${esc(a.hoursTitle)}</h4>
        ${D.hours.map(h => `
          <div class="hours-row"><span>${esc(h.days)}</span><span>${esc(h.time)}</span></div>
        `).join("")}
      </div>
    </div>
    <div class="appt-form-wrap">
      <div class="appt-form-card">
        <div class="form-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#25D366"/></svg>
          <span>${esc(a.formTitle)}</span>
        </div>
        <div class="appt-form" id="appointmentForm">
          <div class="form-group">
            <label for="patientName">${esc(a.labels.name)}</label>
            <input type="text" id="patientName" placeholder="${esc(a.placeholders.name)}" required />
          </div>
          <div class="form-group">
            <label for="patientPhone">${esc(a.labels.phone)}</label>
            <input type="tel" id="patientPhone" placeholder="${esc(a.placeholders.phone)}" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="preferredDate">${esc(a.labels.date)}</label>
              <input type="date" id="preferredDate" required />
            </div>
            <div class="form-group">
              <label for="preferredTime">${esc(a.labels.time)}</label>
              <select id="preferredTime" required>
                <option value="">${esc(a.placeholders.time)}</option>
                ${a.timeOptions.map(t => `<option>${esc(t)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="treatment">${esc(a.labels.treatment)}</label>
            <select id="treatment" required>
              <option value="">${esc(a.placeholders.treatment)}</option>
              ${a.treatmentOptions.map(t => `<option>${esc(t)}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label for="message">${esc(a.labels.message)}</label>
            <textarea id="message" rows="3" placeholder="${esc(a.placeholders.message)}"></textarea>
          </div>
          <button type="button" class="btn btn-whatsapp btn-full" id="submitBtn" onclick="bookOnWhatsApp()">${waSvg(20)} ${esc(a.submitLabel)}</button>
          <p class="form-note">${esc(a.formNote)}</p>
        </div>
      </div>
    </div>
  `;
}

/* ── RENDER: CONTACT ──────────────────────────────────── */
function renderContact() {
  const c = D.contactSection;
  const w = D.whatsapp;
  const contactHours = D.hours.map(h => `${esc(h.days)}: ${esc(h.time)}`).join("<br/>");

  document.getElementById("contactHeader").innerHTML = `
    <p class="section-eyebrow">${esc(c.eyebrow)}</p>
    <h2 class="section-title">${esc(c.title)} - ${esc(c.titleBranch)}</h2>
  `;

  document.getElementById("contactInner").innerHTML = `
    <div class="contact-details">
      <div class="contact-card">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div>
          <h4>Address</h4>
          <p>${esc(D.contact.address)}</p>
        </div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <div>
          <h4>Phone / WhatsApp</h4>
          <p><a href="tel:${esc(w.display)}">${esc(w.display)}</a></p>
        </div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <div>
          <h4>Email</h4>
          <p><a href="mailto:${esc(D.contact.email)}">${esc(D.contact.email)}</a></p>
        </div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div>
          <h4>Clinic Hours</h4>
          <p>${contactHours}</p>
        </div>
      </div>
      <a href="${waHref()}" target="_blank" class="btn btn-whatsapp contact-wa">${waSvg(18)} ${esc(c.waButton)}</a>
    </div>
    <div class="map-wrap">
      <div class="map-placeholder">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="30" fill="#E8F4FD"/><path d="M30 10a14 14 0 0 1 14 14c0 10-14 26-14 26S16 34 16 24A14 14 0 0 1 30 10z" fill="#00B4D8" opacity="0.6"/><circle cx="30" cy="24" r="5" fill="white"/></svg>
        <iframe src="${esc(D.contact.mapEmbed)}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  `;
}

/* ── RENDER: FOOTER ───────────────────────────────────── */
function renderFooter() {
  const s = D.site;
  const f = D.footer;
  const w = D.whatsapp;
  const wa = waHref();

  document.getElementById("footerInner").innerHTML = `
    <div class="footer-brand">
      <a href="#" class="logo logo-light">
        <div class="logo-icon">${toothSvg(28)}</div>
        <div class="logo-text">
          <span class="logo-name">${esc(s.name)}</span>
          <span class="logo-sub">${esc(s.tagline)}</span>
        </div>
      </a>
      <p class="footer-tagline">${esc(s.footerTagline)}</p>
      <div class="footer-social">
        ${f.social.map(soc => {
          const href = soc.href === "whatsapp" ? wa : soc.href;
          return `<a href="${esc(href)}" aria-label="${esc(soc.label)}" class="social-link"${soc.href === "whatsapp" ? ' target="_blank"' : ""}>${soc.icon}</a>`;
        }).join("")}
      </div>
    </div>
    <div class="footer-links">
      <h4>Services</h4>
      <ul>
        ${f.servicesLinks.map(l => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}
      </ul>
    </div>
    <div class="footer-links">
      <h4>Quick Links</h4>
      <ul>
        ${f.quickLinks.map(l => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}
      </ul>
    </div>
    <div class="footer-contact">
      <h4>Contact</h4>
      <p>${esc(D.contact.address)}</p>
      <p class="phone-link"><a href="tel:${esc(w.display)}">${esc(w.display)}</a></p>
      <p><a href="mailto:${esc(D.contact.email)}">${esc(D.contact.email)}</a></p>
      <a href="${wa}" target="_blank" class="btn btn-whatsapp footer-wa">${waSvg(16)} WhatsApp Us</a>
    </div>
  `;

  document.getElementById("footerBottom").innerHTML = `
    <p>${esc(s.copyright)}</p>
    <p>${esc(s.credit)}</p>
  `;
}

/* ── RENDER: FLOATING WHATSAPP ────────────────────────── */
function renderFloat() {
  const el = document.getElementById("whatsappFloat");
  el.href = waHref();
  el.innerHTML = `${waSvg(28)}<span class="whatsapp-float-label">Book Now</span>`;
}

/* ── RENDER ALL ───────────────────────────────────────── */
function renderAll() {
  applyMeta();
  renderHeader();
  renderHero();
  renderAbout();
  renderServices();
  renderWhy();
  renderDoctor();
  renderTestimonials();
  renderExperience();
  renderAppointment();
  renderContact();
  renderFooter();
  renderFloat();
}

/* ═══════════════════════════════════════════════════════
   BEHAVIOURS (run after render)
   ═══════════════════════════════════════════════════════ */

function initBehaviours() {
  const header = document.getElementById("header");

  // ── HEADER SCROLL EFFECT ──
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }, { passive: true });

  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("open");
    document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
  });

  document.querySelectorAll(".nav-link, .nav-cta-btn").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      nav.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // ── ACTIVE NAV LINK ON SCROLL ──
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(sec => sectionObserver.observe(sec));

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll(
    ".service-card, .why-card, .testi-card, .about-feat, .contact-card, .experience-card, .appt-feat, .cred-item"
  );
  reveals.forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), 60 * (Array.from(reveals).indexOf(entry.target) % 6));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObserver.observe(el));

  // ── SET MIN DATE FOR APPOINTMENT FORM ──
  const dateInput = document.getElementById("preferredDate");
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
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

  // ── HIDE/SHOW FLOATING WA BUTTON ──
  const waFloat = document.getElementById("whatsappFloat");
  let lastScrollY = 0;
  window.addEventListener("scroll", () => {
    if (!waFloat) return;
    const current = window.scrollY;
    if (current > lastScrollY + 60) {
      waFloat.style.transform = "translateY(120%)";
      waFloat.style.opacity = "0";
    } else {
      waFloat.style.transform = "";
      waFloat.style.opacity = "";
    }
    lastScrollY = current;
  }, { passive: true });

  // ── COUNTER ANIMATION ──
  function animateCounter(el, target, suffix = "") {
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + suffix;
    }, step);
  }

  const numbers = document.querySelectorAll(".trust-item strong, .cred-item strong");
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
  numbers.forEach(el => counterObserver.observe(el));

  console.log(`%c🦷 ${D.site.name} Website Loaded`, "color:#00B4D8;font-size:14px;font-weight:bold");
  console.log("%cEdit data.json to update all clinic details.", "color:#6B7E96;font-size:12px");
}

/* ── WHATSAPP BOOKING ─────────────────────────────────── */
function bookOnWhatsApp() {
  const name = document.getElementById("patientName").value.trim();
  const phone = document.getElementById("patientPhone").value.trim();
  const date = document.getElementById("preferredDate").value;
  const time = document.getElementById("preferredTime").value;
  const treatment = document.getElementById("treatment").value;
  const message = document.getElementById("message").value.trim();

  if (!name) { showFormError("patientName", "Please enter your full name."); return; }
  if (!phone) { showFormError("patientPhone", "Please enter your mobile number."); return; }
  if (!isValidPhone(phone)) { showFormError("patientPhone", "Please enter a valid phone number."); return; }
  if (!date) { showFormError("preferredDate", "Please select a preferred date."); return; }
  if (!time) { showFormError("preferredTime", "Please select a preferred time."); return; }
  if (!treatment) { showFormError("treatment", "Please select the treatment required."); return; }

  const displayDate = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  const waMessage = [
    `🦷 *Appointment Request — ${D.site.name}*`,
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

  const waURL = `https://wa.me/${D.whatsapp.number}?text=${encodeURIComponent(waMessage)}`;

  const btn = document.getElementById("submitBtn");
  btn.textContent = "Opening WhatsApp...";
  btn.style.opacity = "0.8";
  btn.style.pointerEvents = "none";

  setTimeout(() => {
    window.open(waURL, "_blank");
    btn.innerHTML = `${waSvg(20)} ✅ Message Sent!`;
    btn.style.background = "#16a34a";
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";

    setTimeout(() => {
      btn.innerHTML = `${waSvg(20)} ${D.appointment.submitLabel}`;
      btn.style.background = "";
    }, 3000);
  }, 400);
}

function showFormError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  clearFormError(field);

  field.style.borderColor = "#EF4444";
  field.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";

  const error = document.createElement("p");
  error.className = "form-error";
  error.style.cssText = `color:#EF4444;font-size:12px;margin-top:5px;font-weight:500;display:flex;align-items:center;gap:4px;`;
  error.innerHTML = `⚠️ ${message}`;

  field.parentNode.appendChild(error);
  field.focus();
  field.scrollIntoView({ behavior: "smooth", block: "center" });

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

/* ── BOOT ─────────────────────────────────────────────── */
(async function boot() {
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    D = await res.json();
    renderAll();
    initBehaviours();
  } catch (err) {
    console.error("Failed to load data.json", err);
    document.body.insertAdjacentHTML("afterbegin",
      `<div style="background:#EF4444;color:#fff;padding:12px 24px;font-family:sans-serif;text-align:center;">Failed to load data.json — check the file exists and is valid JSON.</div>`);
  }
})();