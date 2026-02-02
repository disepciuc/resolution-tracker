const tabs = document.querySelectorAll(".tab");
const screens = {
  dashboard: document.getElementById("screen-dashboard"),
  week: document.getElementById("screen-week"),
  login: document.getElementById("screen-login"),
  mobile: document.getElementById("screen-mobile"),
};

function activate(screenId) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[screenId].classList.add("is-active");
  tabs.forEach((tab) => tab.classList.remove("is-active"));
  document.querySelector(`[data-screen="${screenId}"]`).classList.add("is-active");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activate(tab.dataset.screen);
  });
});
