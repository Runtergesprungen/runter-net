const themeButton = document.getElementById("theme-toggle");
const langSelect = document.getElementById("lang-select");

const pageName = document.body.dataset.page;

function getBasePath() {
  const script = document.querySelector('script[src$="script.js"]');
  const src = script.getAttribute("src");

  return src.replace("script.js", "");
}

async function loadJson(path) {
  const basePath = getBasePath();
  const response = await fetch(`${basePath}${path}`);

  if (!response.ok) {
    throw new Error(`Could not load ${basePath}${path}`);
  }

  return response.json();
}

function getPageTranslationFile() {
  if (!pageName) {
    return "home";
  }

  return pageName;
}

async function loadLanguage(lang) {
  try {
    const common = await loadJson(`lang/${lang}/common.json`);
    const pageFile = getPageTranslationFile();
    const page = await loadJson(`lang/${lang}/${pageFile}.json`);

    const translations = {
      ...common,
      ...page
    };

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      element.textContent = translations[key] || key;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const key = element.getAttribute("data-i18n-aria");
      element.setAttribute("aria-label", translations[key] || key);
    });

    document.documentElement.lang = lang;
  } catch (error) {
    console.error("Language load error:", error);
  }
}

const savedLang = localStorage.getItem("lang") || "de";
const savedTheme = localStorage.getItem("theme");

langSelect.value = savedLang;
loadLanguage(savedLang);

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

document.documentElement.classList.remove("light-theme-loading");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

langSelect.addEventListener("change", () => {
  const selectedLang = langSelect.value;

  loadLanguage(selectedLang);
  localStorage.setItem("lang", selectedLang);

  langSelect.blur();
});

document.addEventListener("click", (e) => {
  const el = e.target.closest("a, button");

  if (el) {
    el.blur();
  }
});