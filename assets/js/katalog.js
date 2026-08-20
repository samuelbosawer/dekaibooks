/*
 * Katalog Buku: reads book data straight from a public Google Sheet
 * using the gviz query endpoint (no API key needed).
 *
 * Setup:
 *   1. In Google Sheets: File > Share > "Anyone with the link" as Viewer.
 *   2. Copy the sheet ID from the URL: docs.google.com/spreadsheets/d/{ID}/edit
 *   3. Paste it below as CONFIG.sheetId, and set CONFIG.sheetName to the
 *      tab that holds the catalog (the tab name shown at the bottom of Sheets).
 *   4. Column headers in row 1 of the sheet are used as-is for the table
 *      header, so rename them there (e.g. Judul, Penulis, Kategori, Tahun,
 *      Status) — no code change needed.
 */
(function () {
  "use strict";

  var CONFIG = {
    sheetId: "",
    sheetName: "Sheet1"
  };

  var stateEl = document.getElementById("katalog-state");
  var tableWrap = document.getElementById("katalog-table-wrap");
  var theadEl = document.getElementById("katalog-thead");
  var tbodyEl = document.getElementById("katalog-tbody");
  var searchInput = document.getElementById("katalog-search");
  var countEl = document.getElementById("katalog-count");

  if (!stateEl || !tableWrap || !theadEl || !tbodyEl) return;

  var allRows = [];

  function setState(message) {
    stateEl.textContent = message;
    stateEl.hidden = !message;
    tableWrap.hidden = !!message;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cellText(cell) {
    if (!cell) return "";
    if (cell.f !== undefined && cell.f !== null) return String(cell.f);
    if (cell.v === undefined || cell.v === null) return "";
    return String(cell.v);
  }

  function parseGvizResponse(text) {
    var match = text.match(/setResponse\(([\s\S]*)\);?\s*$/);
    if (!match) throw new Error("Format respons Google Sheets tidak dikenali.");
    return JSON.parse(match[1]);
  }

  function paintRows(rows) {
    if (!rows.length) {
      tbodyEl.innerHTML = "";
      if (countEl) countEl.textContent = "0 judul";
      setState("Tidak ada judul yang cocok dengan pencarian.");
      return;
    }
    setState("");
    tbodyEl.innerHTML = rows.map(function (cells) {
      return "<tr>" + cells.map(function (text) {
        return "<td>" + escapeHTML(text) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    if (countEl) countEl.textContent = rows.length + " judul";
  }

  function renderTable(table) {
    var cols = table.cols || [];
    var rows = table.rows || [];

    theadEl.innerHTML = "<tr>" + cols.map(function (col, i) {
      return "<th>" + escapeHTML(col.label || "Kolom " + (i + 1)) + "</th>";
    }).join("") + "</tr>";

    allRows = rows.map(function (row) {
      return (row.c || []).map(cellText);
    });

    paintRows(allRows);
  }

  function loadCatalog() {
    if (!CONFIG.sheetId) {
      setState("Katalog belum terhubung ke Google Sheet. Tambahkan sheetId pada assets/js/katalog.js.");
      return;
    }

    setState("Memuat katalog...");

    var url = "https://docs.google.com/spreadsheets/d/" + CONFIG.sheetId +
      "/gviz/tq?tqx=out:json&sheet=" + encodeURIComponent(CONFIG.sheetName);

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Gagal memuat data (" + res.status + ").");
        return res.text();
      })
      .then(function (text) {
        var json = parseGvizResponse(text);
        if (!json.table || !json.table.rows || !json.table.rows.length) {
          setState("Katalog masih kosong.");
          return;
        }
        renderTable(json.table);
      })
      .catch(function () {
        setState("Gagal memuat katalog. Pastikan sheet sudah dibagikan sebagai “Anyone with the link” (Viewer), lalu muat ulang halaman.");
      });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim().toLowerCase();
      if (!q) { paintRows(allRows); return; }
      paintRows(allRows.filter(function (cells) {
        return cells.join(" ").toLowerCase().indexOf(q) !== -1;
      }));
    });
  }

  loadCatalog();
})();
