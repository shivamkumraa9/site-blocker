// ========================
// Configuration
// ========================
const SITE_SETTINGS = {
  "www.instagram.com": {
    timeLimit: 2 * 60 * 1000, // 2 minutes
    subUrls: {
      "/reels": { action: "clearBody" },
      "/": {
        action: "hideElements",
        selectors: [".x1nhvcw1"],
      },
    },
  },
  "youtube.com": {
    timeLimit: 2 * 60 * 1000,
    subUrls: {
      "/shorts": {
        action: "clearBody",
        redirect: "about:blank",
      },
    },
  },
  "x.com": {
    timeLimit: 2 * 60 * 1000,
  },
  "facebook.com": {
    timeLimit: 2 * 60 * 1000,
    subUrls: {
      "/gaming": { action: "clearBody" },
      "/": {
        action: "hideElements",
        selectors: [".x1unhpq9"],
      },
    },
  },
};

const STORAGE_KEY = "site_usage_data";

// ========================
// Core Functionality
// ========================
function enforceContentRestrictions() {
  const currentHost = window.location.hostname;
  const currentPath = window.location.pathname;
  const settings = SITE_SETTINGS[currentHost];

  if (!settings) return;

  // Handle sub-url specific rules
  if (settings.subUrls) {
    const subUrlConfig = settings.subUrls[currentPath];
    if (subUrlConfig) handleAction(subUrlConfig);

    Object.keys(settings.subUrls).forEach((path) => {
      if (currentPath.includes(path)) {
        handleAction(settings.subUrls[path]);
      }
    });
  }
}

function handleAction(config) {
  switch (config.action) {
    case "clearBody":
      document.body.innerHTML = "";
      if (config.redirect) window.location.href = config.redirect;
      break;

    case "hideElements":
      config.selectors.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) element.innerHTML = "";
      });
      break;
  }
}

// ========================
// Usage Tracking
// ========================
function trackSiteUsage() {
  console.log('I am called')
  const currentHost = window.location.hostname;
  const settings = SITE_SETTINGS[currentHost];

  if (!settings) return;

  const today = new Date().toISOString().split("T")[0];
  let storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  // Initialize storage
  storedData[currentHost] = storedData[currentHost] || {};
  storedData[currentHost][today] = storedData[currentHost][today] || 0;

  let startTime = Date.now();

  const updateTracker = () => {
    const elapsed = Date.now() - startTime;
    storedData[currentHost][today] += elapsed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

    if (storedData[currentHost][today] >= settings.timeLimit) {
      document.body.innerHTML = "<h1>Access Blocked</h1>";
      clearInterval(intervalId);
      return
    }

    startTime = Date.now();
  };
  updateTracker()
  const intervalId = setInterval(updateTracker, 60000);
  window.addEventListener("beforeunload", () => {
    // updateTracker();
    clearInterval(intervalId);
  });
}

new MutationObserver(enforceContentRestrictions).observe(document, {
  subtree: true,
  childList: true,
});

enforceContentRestrictions();

trackSiteUsage();
