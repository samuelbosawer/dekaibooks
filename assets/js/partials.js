/*
 * Shared header, footer, and floating-social markup for every page.
 * Edit the HTML strings below once and every page that includes this
 * file (and has the matching mount elements) picks up the change.
 *
 * To add this to a new page:
 *   1. Add <body data-page="...">   (use "home" for index.html)
 *   2. Add empty mounts: <header id="site-header" class="site-header"></header>
 *                         <footer id="site-footer" class="site-footer"></footer>
 *                         <div id="float-social" class="float-social"></div>
 *   3. Load this file BEFORE assets/js/script.js.
 */
(function () {
  "use strict";

  var page = document.body.getAttribute("data-page") || "home";
  var base = page === "home" ? "" : "index.html";

  var navItems = [
    { label: "Tentang", anchor: "tentang" },
    { label: "Gerakan", anchor: "gerakan" },
    { label: "Kegiatan", anchor: "kegiatan" },
    { label: "Katalog", href: "katalog.html", key: "katalog" },
    { label: "Pengurus", anchor: "pengurus" },
    { label: "Kontak", anchor: "kontak" }
  ];

  var navLinksHTML = navItems.map(function (item) {
    var href = item.anchor ? base + "#" + item.anchor : item.href;
    var current = item.key && item.key === page ? ' aria-current="page"' : "";
    return "<li><a href=\"" + href + "\"" + current + ">" + item.label + "</a></li>";
  }).join("");

  var headerInnerHTML =
    '<div class="header-inner">' +
      '<a href="' + base + '#beranda" class="brand">' +
        '<img src="assets/img/logo.png" alt="Dekai Books" class="brand-logo">' +
        '<span class="brand-name">Dekai Books</span>' +
      "</a>" +
      '<button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Buka menu">' +
        "<span></span><span></span><span></span>" +
      "</button>" +
      '<nav class="primary-nav" id="primary-nav"><ol>' + navLinksHTML + "</ol></nav>" +
    "</div>";

  var footerInnerHTML =
    '<div class="footer-inner">' +
      '<img src="assets/img/logo.png" alt="Dekai Books" class="footer-logo">' +
      '<div class="footer-text">' +
        '<p class="footer-name">dekai books</p>' +
        "<p>Gerakan Literasi dan Perpustakaan Jalanan</p>" +
        '<p class="footer-tagline">&ldquo;Belajar, Bertumbuh, Membumi&rdquo;</p>' +
      "</div>" +
      '<div class="footer-location">' +
        '<span class="footer-label">Lokasi</span>' +
        "<p>Dekai, Yahukimo,<br>Papua Pegunungan</p>" +
      "</div>" +
      '<div class="footer-social">' +
        '<span class="footer-label">Ikuti</span>' +
        '<a href="https://www.instagram.com/dekaibooks" target="_blank" rel="noopener">Instagram</a>' +
        '<a href="https://www.facebook.com/dekaibooks/" target="_blank" rel="noopener">Facebook</a>' +
        '<a href="https://wa.me/6285255247031" target="_blank" rel="noopener">WhatsApp</a>' +
      "</div>" +
    "</div>" +
    '<div class="footer-bottom">' +
      "<span>&copy; " + new Date().getFullYear() + " dekai books</span>" +
      '<span class="footer-credit">Website oleh <a href="https://projectbos.web.id" target="_blank" rel="noopener">sbos.lab</a></span>' +
    "</div>";

  var floatSocialInnerHTML =
    '<a href="https://wa.me/6285255247031" target="_blank" rel="noopener" class="float-btn float-btn--wa" aria-label="Chat WhatsApp">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C10.1 9 9.6 7.8 9.4 7.3c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.6-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.8 3.3 1.3 5.2 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.1.9.9-3-.2-.3C3.6 14.6 3 13.3 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z"/></svg>' +
    "</a>" +
    '<a href="https://www.instagram.com/dekaibooks" target="_blank" rel="noopener" class="float-btn float-btn--ig" aria-label="Instagram Dekai Books">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1"/></svg>' +
    "</a>" +
    '<a href="https://www.facebook.com/dekaibooks/" target="_blank" rel="noopener" class="float-btn float-btn--fb" aria-label="Facebook Dekai Books">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 21v-7.5H17l.4-3H14.5V8.4c0-.9.2-1.5 1.5-1.5H17.5V4.2C17.2 4.1 16.2 4 15 4c-2.4 0-4 1.5-4 4.1V10.5H8.5v3H11V21h3.5z"/></svg>' +
    "</a>";

  var headerEl = document.getElementById("site-header");
  var footerEl = document.getElementById("site-footer");
  var floatSocialEl = document.getElementById("float-social");

  if (headerEl) headerEl.innerHTML = headerInnerHTML;
  if (footerEl) footerEl.innerHTML = footerInnerHTML;
  if (floatSocialEl) floatSocialEl.innerHTML = floatSocialInnerHTML;
})();
