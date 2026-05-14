const themeButton = document.getElementById("theme-toggle");
const langSelect = document.getElementById("lang-select");
const pageLang = document.documentElement.lang || "en";

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // The site should still work when storage is blocked.
  }
}

function getLocalizedPath(lang) {
  const path = window.location.pathname.replace(/^\/(en|de)(?=\/|$)/, "") || "/";
  return `/${lang}${path}`;
}

if (langSelect) {
  langSelect.value = pageLang;

  langSelect.addEventListener("change", () => {
    const selectedLang = langSelect.value;

    storageSet("lang", selectedLang);
    window.location.href = getLocalizedPath(selectedLang);
  });
}

if (storageGet("theme") === "light") {
  document.body.classList.add("light-theme");
}

document.documentElement.classList.remove("light-theme-loading");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");
    storageSet("theme", isLight ? "light" : "dark");
  });
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("a, button");

  if (el) {
    el.blur();
  }
});
