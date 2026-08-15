"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const services = [
  ["Lawn Mowing", "Consistent, precision mowing on a schedule that keeps your lawn looking sharp all season."],
  ["Mulch Installation", "Clean, defined beds with premium mulch that locks in moisture and boosts curb appeal instantly."],
  ["Landscape Design", "Custom outdoor layouts built around how you actually use your property — form and function together."],
  ["Shrub & Bush Trimming", "Sharp, healthy shaping that keeps shrubs full and your property looking intentional."],
  ["Tree & Shrub Planting", "Species selection and placement suited to Connecticut soil and seasons, planted to last."],
  ["Flower Bed Renovations", "Tired beds reworked with clean edges, healthy soil, and plantings that bloom on schedule."],
  ["Spring & Fall Cleanup", "Seasonal reset — leaves, debris, and dead growth cleared so your property starts fresh."],
  ["Junk Removal", "Old furniture, yard waste, or leftover debris hauled away quickly and responsibly."],
  ["Brush Removal", "Overgrown brush and thicket cleared so you can reclaim usable outdoor space."],
  ["Yard Cleanups", "One-time or recurring cleanups that keep your yard tidy without you lifting a finger."],
  ["Property Maintenance", "Ongoing care plans that keep every corner of your property looking its best, year-round."],
  ["Hedge Trimming", "Crisp, level lines on every hedge — the kind of detail that makes a property feel finished."],
] as const;

const standards = [
  ["Reliable", "We show up when we say we will — every visit, every season."],
  ["Fully Professional", "Trained crews, proper equipment, and a standard of work that holds up."],
  ["Attention to Detail", "Clean edges, tidy beds, no shortcuts — the small things are the whole job."],
  ["Affordable Pricing", "Premium results priced fairly, with clear estimates and no surprise fees."],
  ["Honest Communication", "Straight answers about scope, timing, and cost — before we start, not after."],
  ["Satisfaction Guaranteed", "If it’s not right, we make it right. Your property, treated like our own."],
] as const;

const gallery = [
  ["/images/tblc/front-landscape.jpeg", "install", "Landscape Design", "Complete Front Landscape Refresh", "Finished front landscape with curved mulch beds, shrubs, and a manicured lawn"],
  ["/images/tblc/patio-lawn.jpeg", "lawn", "Lawn Care", "Patio & Lawn Installation", "Finished stone patio overlooking a newly installed lawn and plantings"],
  ["/images/tblc/foundation-garden.jpeg", "install", "Landscape Install", "Foundation Garden Installation", "Landscaped home with foundation plantings, stone edging, and a curved walk"],
  ["/images/tblc/curved-walkway.jpeg", "mulch", "Mulch & Beds", "Curved Walkway & Garden Beds", "Curved front walkway bordered by dark mulch, flowers, and a striped lawn"],
  ["/images/tblc/junk-removal.png", "junk", "Junk Removal", "Residential Junk Removal", "Truck and utility trailer loaded for a residential junk removal job"],
] as const;

const reviews = [
  ["They mulched our entire front bed in an afternoon and it looked better than I imagined. Clean lines, no mess left behind. Already booked them for fall cleanup.", "Karen Whitfield", "Avon, CT"],
  ["Honestly the most responsive landscaping company I’ve worked with. Fair quote, showed up on time, and the yard cleanup made our whole property feel new again.", "Mike Delvecchio", "Simsbury, CT"],
  ["We had them redesign the front beds and plant new shrubs along the walkway. Every detail was thought through, and they cleaned up like they were never here.", "Priya Nair", "Canton, CT"],
  ["Needed a big pile of old fencing and yard debris gone before a family event. They took care of it same week, no hassle at all. Highly recommend.", "Tom Reyes", "Unionville, CT"],
] as const;

const faqs = [
  ["What areas do you service?", "We primarily serve the Farmington Valley — including Avon, Simsbury, Canton, Farmington, and Unionville — along with surrounding Connecticut towns. Reach out and we’ll confirm coverage for your address."],
  ["How quickly can I get an estimate?", "Most estimate requests are returned within 24–48 hours. For straightforward jobs like mowing or mulch, we can often provide a quote right over the phone."],
  ["Do you offer recurring lawn care plans?", "Yes — weekly and bi-weekly mowing plans are available, along with seasonal property maintenance packages that bundle cleanups, trimming, and mulch refreshes."],
  ["Are you insured?", "Yes, Two Buck Lawn Care is fully insured. We’re happy to provide documentation as part of your estimate if needed."],
  ["What forms of payment do you accept?", "We accept cash, check, and all major cards. Recurring service clients can also set up simple automatic billing."],
] as const;

const links = ["Home", "Services", "Gallery", "About", "Reviews", "Contact"];
const contactEmail = "twobucklawncare@gmail.com";

function Logo() {
  return (
    <a href="#home" className="brand" aria-label="Two Buck Lawn Care home">
      <Image src="/images/logo.svg" alt="" width={44} height={44} priority />
      <span className="brand-text"><strong>Two Buck</strong><span>Lawn Care</span></span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("all");
  const [review, setReview] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => setReview((current) => (current + 1) % reviews.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  function submitEstimate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Estimate request from ${form.get("name")}`;
    const body = [
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Email: ${form.get("email")}`,
      `Service: ${form.get("service")}`,
      `Property address: ${form.get("address")}`,
      "",
      "Project description:",
      String(form.get("details") || "Not provided"),
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <Logo />
          <nav className="main-nav" aria-label="Primary">
            {links.slice(1).map((link) => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}
          </nav>
          <div className="header-actions">
            <a href="tel:+12034417687" className="call-chip">☎ <span>(203) 441-7687</span></a>
            <a href="#contact" className="btn btn-primary">Free Estimate</a>
            <button className="nav-toggle" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>☰</button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer-top"><Logo /><button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button></div>
        <nav>{links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{link}</a>)}</nav>
        <div className="drawer-cta"><a href="#contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Free Estimate</a><a href="tel:+12034417687" className="btn btn-outline">Call (203) 441-7687</a></div>
      </div>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-media hero-real" aria-hidden="true"><Image src="/images/tblc/front-landscape.jpeg" alt="" fill priority sizes="100vw" /></div>
          <div className="container hero-content">
            <span className="eyebrow">Farmington Valley, Connecticut</span>
            <h1 className="reveal in">Premium Landscaping That Makes Your Home <em>Stand Out.</em></h1>
            <p className="lead reveal in">We transform ordinary properties into beautiful outdoor spaces with professional landscaping, mulch, planting, lawn care, junk removal, and more.</p>
            <div className="hero-actions reveal in"><a href="#contact" className="btn btn-primary">Get Free Estimate →</a><a href="tel:+12034417687" className="btn btn-outline">☎ Call Now</a></div>
            <div className="hero-stats"><div><strong>500+</strong><span>Properties Serviced</span></div><div><strong>5.0★</strong><span>Average Rating</span></div><div><strong>7</strong><span>Years in the Valley</span></div></div>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span className="line" /></div>
        </section>

        <section className="services section-pad" id="services">
          <div className="container">
            <div className="section-head reveal"><span className="eyebrow forest-label">What We Do</span><h2>Full-service landscaping, handled with real craft.</h2><p>From weekly mowing to full property transformations — every job gets the same attention to detail, whether it takes twenty minutes or two weeks.</p></div>
            <div className="services-grid">{services.map(([title, body], index) => <article className="service-card reveal" key={title}><div className="service-icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
        </section>

        <section className="why section-pad" id="why"><div className="container"><div className="section-head center on-dark reveal"><span className="eyebrow">The Two Buck Standard</span><h2>Why homeowners across the Valley choose us.</h2></div><div className="why-grid reveal">{standards.map(([title, body]) => <article className="why-card" key={title}><div className="check">✓</div><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

        <section className="section-pad" id="gallery"><div className="container">
          <div className="section-head reveal"><span className="eyebrow forest-label">Recent Work</span><h2>Before & after, across the Farmington Valley.</h2><p>A look at real transformations — mulch refreshes, full installs, and seasonal cleanups.</p></div>
          <div className="gallery-filters reveal" aria-label="Filter gallery by category">{[["all", "All Work"], ["install", "Landscaping"], ["lawn", "Lawn Care"], ["mulch", "Mulch & Beds"], ["junk", "Junk Removal"]].map(([value, label]) => <button key={value} className={`filter-btn${filter === value ? " active" : ""}`} onClick={() => setFilter(value)}>{label}</button>)}</div>
          <div className="masonry reveal">{gallery.filter((item) => filter === "all" || item[1] === filter).map(([file, , tag, caption, alt]) => <article className="masonry-item" key={file}><Image src={file} width={1200} height={900} alt={alt} sizes="(max-width: 700px) 100vw, 33vw" /><span className="tag">{tag}</span><div className="overlay"><span>{caption}</span></div></article>)}</div>
        </div></section>

        <section className="testimonials section-pad" id="reviews"><div className="container"><div className="section-head center reveal"><span className="eyebrow forest-label">Reviews</span><h2>What the Valley is saying.</h2></div><div className="slider reveal"><div className="slide-track"><div className="slides" style={{ transform: `translateX(-${review * 100}%)` }}>{reviews.map(([quote, author, town]) => <article className="slide" key={author}><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><p className="quote">“{quote}”</p><div className="author"><strong>{author}</strong><span>{town}</span></div></article>)}</div></div><div className="slider-controls"><button className="slider-arrow" aria-label="Previous review" onClick={() => setReview((review - 1 + reviews.length) % reviews.length)}>‹</button><div className="slider-dots">{reviews.map((_, index) => <button key={index} className={`dot${review === index ? " active" : ""}`} aria-label={`Go to review ${index + 1}`} onClick={() => setReview(index)} />)}</div><button className="slider-arrow" aria-label="Next review" onClick={() => setReview((review + 1) % reviews.length)}>›</button></div></div></div></section>

        <section className="section-pad" id="about"><div className="container"><div className="about-grid"><div className="about-media reveal"><Image src="/images/tblc/patio-lawn.jpeg" alt="Completed stone patio, lawn, fencing, and foundation planting project" width={640} height={480} sizes="(max-width: 900px) 100vw, 50vw" /><div className="about-badge"><strong>7 yrs</strong><span>Serving the Farmington Valley</span></div></div><div className="about-text reveal"><span className="eyebrow forest-label">About Two Buck</span><h2>Quality over quantity, on every single property.</h2><p>Two Buck Lawn Care was built on a simple idea: take fewer shortcuts, and treat every yard like it’s your own. We’d rather do right by twenty properties than rush through fifty — so every mow, every mulch bed, and every cleanup gets the same level of care.</p><p>We’re dependable, detail-oriented, and easy to reach when you need us. No vague timelines, no surprise charges — just honest work from a crew that actually shows up.</p><ul className="trait-list">{["Dependable", "Detail-oriented", "Friendly", "Honest", "Professional", "Locally Owned"].map((trait) => <li key={trait}><span>✓</span>{trait}</li>)}</ul></div></div></div></section>

        <section className="cta-band"><div className="hero-media cta-real" aria-hidden="true"><Image src="/images/tblc/curved-walkway.jpeg" alt="" fill sizes="100vw" /></div><div className="container cta-band-content reveal"><span className="eyebrow">Free, No-Obligation Estimate</span><h2>Ready To Transform Your Property?</h2><div className="actions"><a href="#contact" className="btn btn-primary">Get Free Estimate</a><a href="tel:+12034417687" className="btn btn-outline">Call (203) 441-7687</a></div></div></section>

        <section className="section-pad" id="faq"><div className="container"><div className="section-head center reveal"><span className="eyebrow forest-label">Good to Know</span><h2>Frequently asked questions.</h2></div><div className="faq-list reveal">{faqs.map(([question, answer], index) => <article className={`faq-item${openFaq === index ? " open" : ""}`} key={question}><button className="faq-q" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>{question}<span className="plus" /></button><div className="faq-a" style={{ maxHeight: openFaq === index ? "180px" : 0 }}><p>{answer}</p></div></article>)}</div></div></section>

        <section className="section-pad map-section"><div className="container"><div className="map-wrap reveal"><div className="map-info"><span className="eyebrow">Service Area</span><h3>Proudly serving the Farmington Valley</h3><p>Based in Connecticut and focused on the Farmington Valley region. If you’re nearby and don’t see your town listed, reach out — we’re always expanding.</p><div className="towns">{["Avon", "Simsbury", "Canton", "Farmington", "Unionville", "Burlington", "Granby"].map((town) => <span key={town}>{town}</span>)}</div></div><div className="map-frame"><iframe src="https://www.google.com/maps?q=Farmington+Valley,+CT&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Two Buck Lawn Care service area map" /></div></div></div></section>

        <section className="section-pad contact" id="contact"><div className="container contact-grid"><div className="contact-info reveal"><span className="eyebrow">Get In Touch</span><h2>Request your free estimate.</h2><p>Tell us about your property and what you need done — we’ll get back to you within one business day with a clear, no-pressure quote.</p><div className="contact-line"><div className="ic">☎</div><div><strong>(203) 441-7687</strong><span>Call or text anytime</span></div></div><div className="contact-line"><div className="ic">↗</div><div><strong><a href={`mailto:${contactEmail}`}>{contactEmail}</a></strong><span>Email estimate requests welcome</span></div></div><div className="contact-line"><div className="ic">⌖</div><div><strong>Farmington Valley, CT</strong><span>Avon · Simsbury · Canton · Farmington</span></div></div></div>
          <div className="form-card reveal"><form onSubmit={submitEstimate}>{sent ? <div className="form-success show"><div className="ic">✓</div><h3>Email draft opened!</h3><p>Review the estimate request in your email app, then click send. It is addressed to {contactEmail}.</p></div> : <div><div className="form-row"><div className="field"><label htmlFor="name">Full Name</label><input id="name" name="name" required autoComplete="name" /></div><div className="field"><label htmlFor="phone">Phone</label><input type="tel" id="phone" name="phone" required autoComplete="tel" /></div></div><div className="form-row"><div className="field"><label htmlFor="email">Email</label><input type="email" id="email" name="email" required autoComplete="email" /></div><div className="field"><label htmlFor="service">Service Needed</label><select id="service" name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(([title]) => <option key={title}>{title}</option>)}<option>Other</option></select></div></div><div className="field"><label htmlFor="address">Property Address</label><input id="address" name="address" required autoComplete="street-address" /></div><div className="field"><label htmlFor="details">Project Description</label><textarea id="details" name="details" placeholder="Tell us a bit about your property and what you’d like done..." /></div><button type="submit" className="btn btn-dark full-width">Request Free Estimate</button><p className="form-note">We typically respond within one business day. No spam, ever.</p></div>}</form></div>
        </div></section>
      </main>

      <footer><div className="container"><div className="footer-grid"><div className="col"><div className="footer-brand"><Image src="/images/logo.svg" alt="" width={48} height={48} /><strong>Two Buck Lawn Care</strong></div><p className="footer-intro">Premium landscaping across the Farmington Valley, CT. Quality over quantity, on every property.</p></div><div className="col"><h4>Quick Links</h4><ul>{links.map((link) => <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>)}</ul></div><div className="col"><h4>Services</h4><ul>{services.slice(0, 5).map(([title]) => <li key={title}><a href="#services">{title}</a></li>)}</ul></div><div className="col"><h4>Service Areas</h4><ul>{["Avon, CT", "Simsbury, CT", "Canton, CT", "Farmington, CT", "Unionville, CT"].map((town) => <li key={town}>{town}</li>)}</ul></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Two Buck Lawn Care. All rights reserved.</span><div className="legal-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div></div></div></footer>

      <div className="floating-cta"><a href="#contact" className="fab fab-quote">✎ Get Quote</a><button className={`fab-top${scrolled ? " show" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button></div>
      <div className="mobile-call-bar"><a href="tel:+12034417687">☎ Call (203) 441-7687</a></div>
    </>
  );
}
