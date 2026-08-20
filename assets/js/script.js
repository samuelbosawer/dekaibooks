(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.getElementById("primary-nav");
  var floatSocial = document.getElementById("float-social");
  var siteFooter = document.querySelector(".site-footer");
  var nearFooter = false;

  /* Header keeps its black background; just add a border once scrolled */
  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 12);

    if (floatSocial) {
      var pastHero = window.scrollY > window.innerHeight * 0.6;
      floatSocial.classList.toggle("is-visible", pastHero && !nearFooter);
    }
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", updateHeader);

  /* Hide the floating social bar before it overlaps the footer's own links */
  if (siteFooter && floatSocial && "IntersectionObserver" in window) {
    var footerObserver = new IntersectionObserver(
      function (entries) {
        nearFooter = entries[0].isIntersecting;
        updateHeader();
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    footerObserver.observe(siteFooter);
  }

  /* Mobile nav toggle */
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Buka menu");
      });
    });
  }

  /* Reveal-on-scroll for editorial sections */
  var revealTargets = document.querySelectorAll(
    ".section-side, .section-body, .big-quote, .visi-title, .lapak-days, " +
    ".lapak-caption, .lapak-detail, .lapak-note, .gallery-frame, .kontak-title, .kontak-list"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Gallery lightbox */
  var galleryFrames = Array.prototype.slice.call(document.querySelectorAll(".gallery-frame"));
  var lightbox = document.getElementById("lightbox");

  if (galleryFrames.length && lightbox) {
    var lightboxImg = document.getElementById("lightbox-img");
    var lightboxCaption = document.getElementById("lightbox-caption");
    var lightboxClose = document.getElementById("lightbox-close");
    var lightboxPrev = document.getElementById("lightbox-prev");
    var lightboxNext = document.getElementById("lightbox-next");
    var currentIndex = 0;

    function showAt(index) {
      currentIndex = (index + galleryFrames.length) % galleryFrames.length;
      var frame = galleryFrames[currentIndex];
      var img = frame.querySelector("img");
      var caption = frame.querySelector(".gallery-caption");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : "";
    }

    function openLightbox(index) {
      showAt(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    galleryFrames.forEach(function (frame, index) {
      frame.addEventListener("click", function () { openLightbox(index); });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", function () { showAt(currentIndex - 1); });
    lightboxNext.addEventListener("click", function () { showAt(currentIndex + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showAt(currentIndex + 1);
      if (e.key === "ArrowLeft") showAt(currentIndex - 1);
    });
  }
})();
