// which nav has active
let navs = document.querySelectorAll('.nav-item');
let pagePath = window.location.pathname.replace(/\/$/, '') || '/';
for(let nav of navs) {
  let navPath = nav.getAttribute("data-path");
  if (navPath === pagePath) {
    nav.className = "nav-item active";
  }
}
