/* =========================================================================
 * 蓝色大肥鱼 · dsh-pet 站点脚本（无依赖）
 * ========================================================================= */
(function () {
  "use strict";

  var SITE = window.DSH_SITE || { files: {}, releaseBase: "" };

  /* ---------- 生成下载直链 ---------- */
  function fileUrl(key) {
    var f = SITE.files[key];
    if (!f) return SITE.releasesPage || "#";
    return SITE.releaseBase + "/" + f.name;
  }

  function fillDownloads() {
    document.querySelectorAll("[data-dl]").forEach(function (el) {
      var key = el.getAttribute("data-dl");
      el.setAttribute("href", fileUrl(key));
      el.setAttribute("download", "");
      el.setAttribute("rel", "noopener");
      var sizeEl = el.querySelector("[data-size]");
      if (sizeEl && SITE.files[key]) sizeEl.textContent = SITE.files[key].size;
    });
  }

  /* ---------- 版本号占位 ---------- */
  function fillVersion() {
    document.querySelectorAll("[data-version]").forEach(function (el) {
      el.textContent = "v" + SITE.version;
    });
    document.querySelectorAll("[data-repo]").forEach(function (el) { el.href = SITE.repo; });
    document.querySelectorAll("[data-releases]").forEach(function (el) { el.href = SITE.releasesPage; });
  }

  /* ---------- 操作系统识别：高亮对应平台 ---------- */
  function detectOS() {
    var ua = (navigator.userAgent || "").toLowerCase();
    var p = navigator.platform || "";
    if (/mac/.test(p) || /mac os x/.test(ua)) return "mac";
    if (/linux|x11/.test(p) || /linux/.test(ua)) return "linux";
    return "windows";
  }

  function highlightOS() {
    var os = detectOS();
    document.body.setAttribute("data-os", os);
    document.querySelectorAll("[data-os-only]").forEach(function (el) {
      var list = el.getAttribute("data-os-only").split(/\s+/);
      el.hidden = list.indexOf(os) === -1;
    });
    var rec = document.querySelectorAll("[data-os-rec='" + os + "']");
    rec.forEach(function (el) { el.classList.add("is-recommended"); });
  }

  /* ---------- 移动端导航 ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () { links.classList.toggle("open"); });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") links.classList.remove("open");
      });
    }
  }

  /* ---------- 文档侧栏滚动高亮 ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".docs-side a[href^='#']"));
    if (!links.length) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var sections = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    if (!sections.length) return;

    function onScroll() {
      var pos = window.scrollY + 120;
      var current = sections[0];
      sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
      links.forEach(function (a) { a.classList.remove("active"); });
      if (map[current.id]) map[current.id].classList.add("active");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillVersion();
    fillDownloads();
    highlightOS();
    initNav();
    initScrollSpy();

    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
