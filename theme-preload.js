(function () {
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("light-theme-loading");
    }
  } catch (error) {
    document.documentElement.classList.remove("light-theme-loading");
  }
})();
