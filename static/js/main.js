/**
 * Template Name: eStartup
 * Template URL: https://bootstrapmade.com/estartup-bootstrap-landing-page-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });



  
})();

/**
 * Ujian Imbuhan Logic
 */
const specialCases = new Set(["cat", "lap", "cam", "mop", "cap", "bom", "tin", "pos", "sah"]);

function applyPrefix(rootWord, prefixType) {
  const firstChar = rootWord.charAt(0);

  if (prefixType === "peN") {
    if (specialCases.has(rootWord)) {
        // Special cases where 'penge-' is used
        return { imbuhan: "penge-", jawapan: "penge" + rootWord };
    }
    if ("lmnryw".indexOf(firstChar) !== -1 || rootWord.startsWith("ng") || rootWord.startsWith("ny")) {
        // Words starting with l, m, n, ng, ny, r, or w
        return { imbuhan: "pe-", jawapan: "pe" + rootWord };
    }
    if (firstChar === 'b' || firstChar === 'f' || firstChar === 'p') {
        // Words starting with b, f, or p (p needs to be dropped)
        return { imbuhan: "pem-", jawapan: "pem" + rootWord.substring(firstChar === 'p' ? 1 : 0) };
    }
    if (firstChar === 'c' || firstChar === 'd' || firstChar === 'j' || firstChar === 't') {
        // Words starting with c, d, j, t (t needs to be dropped)
        return { imbuhan: "pen-", jawapan: "pen" + rootWord.substring(firstChar === 't' ? 1 : 0) };
    }
    if ("aeiouhg".indexOf(firstChar) !== -1 || firstChar === 'k') {
        // Words starting with a, e, i, o, u, g, or k (k needs to be dropped)
        return { imbuhan: "peng-", jawapan: "peng" + rootWord.substring(firstChar === 'k' ? 1 : 0) };
    }  
    if (firstChar === 's') {
        // Words starting with 's' (s needs to be dropped)
        return { imbuhan: "peny-", jawapan: "peny" + rootWord.substring(1) };
    }
} else if (prefixType === "meN") {
    if (specialCases.has(rootWord)) {
      return {imbuhan: "menge-", jawapan: "menge" + rootWord};
    }
    if ("lmnryw".indexOf(firstChar) !== -1 || rootWord.startsWith("ng") || rootWord.startsWith("ny")) {
      return {imbuhan: "me-", jawapan: "me" + rootWord};
    }
    if (firstChar === 'b') {
      return {imbuhan: "mem-", jawapan: "mem" + rootWord};
    }
    if ("fp".indexOf(firstChar) !== -1) {
      return {imbuhan: "mem-", jawapan: "mem" + rootWord.substring(1)};
    }
    if (firstChar === 'c' || firstChar === 'd' || firstChar === 'j' || firstChar === 't') {
      // Words starting with c, d, j, t (t needs to be dropped)
      return { imbuhan: "men-", jawapan: "men" + rootWord.substring(firstChar === 't' ? 1 : 0) };
  }
    if ("aeiouhg".indexOf(firstChar) !== -1 || firstChar === 'k') {
      // Words starting with a, e, i, o, u, g, or k (k needs to be dropped)
      return { imbuhan: "meng-", jawapan: "meng" + rootWord.substring(firstChar === 'k' ? 1 : 0) };
  }  
    if (firstChar === 's') {
      return {imbuhan: "meny-", jawapan: "meny" + rootWord.substring(1)};
    }
  } else if (prefixType === "be") {
    if (firstChar === 'r') {
      return {imbuhan: "be-", jawapan: "be" + rootWord};
    }
    return {imbuhan: "ber-", jawapan: "ber" + rootWord};
  } else if (prefixType === "te") {
    if (firstChar === 'r') {
      return {imbuhan: "te-", jawapan: "te" + rootWord};
    }
    return {imbuhan: "ter-", jawapan: "ter" + rootWord};
  }
  return {imbuhan: "", jawapan: rootWord};
}

function checkImbuhan() {
  const kataDasar = document.getElementById("kataDasar").value.trim().toLowerCase();
  const prefixType = document.getElementById("prefix").value;

  const result = applyPrefix(kataDasar, prefixType);

  const resultElement = document.getElementById("result");
  const imbuhanText = document.getElementById("imbuhanText");
  const jawapanText = document.getElementById("jawapanText");

  imbuhanText.textContent = result.imbuhan;
  jawapanText.textContent = result.jawapan;

  // Show the result card with an animation
  resultElement.classList.remove('d-none');
  resultElement.classList.add('animate__animated', 'animate__fadeInUp');

  return false;
}
