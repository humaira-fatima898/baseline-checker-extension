console.log("✅ content.js is running on this page!");

// Baseline checks
const isHTTPS = window.location.protocol === "https:";
const hasUTF8 = !!document.querySelector('meta[charset="UTF-8"], meta[charset="utf-8"]');

let hasLocalStorage = true;
try {
  localStorage.setItem("__baseline_test", "1");
  localStorage.removeItem("__baseline_test");
} catch (e) {
  hasLocalStorage = false;
}

const hasServiceWorker = "serviceWorker" in navigator;

console.log("🔒 HTTPS supported:", isHTTPS);
console.log("🔤 UTF-8 charset declared:", hasUTF8);
console.log("💾 localStorage available:", hasLocalStorage);
console.log("⚙️ Service Workers supported:", hasServiceWorker);

// Respond to popup.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "getBaseline") {
    console.log("Popup requested baseline results → sending response...");
    sendResponse({
      data: {
        https: isHTTPS,
        utf8: hasUTF8,
        localStorage: hasLocalStorage,
        serviceWorker: hasServiceWorker
      }
    });
  }
  return true; // ensures async response works reliably
});