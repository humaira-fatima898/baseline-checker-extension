document.getElementById("scan").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getBaseline" }, (response) => {
      const resultsEl = document.getElementById("results");

      if (chrome.runtime.lastError) {
        resultsEl.innerHTML = "<li class='fail'>❌ This page cannot be scanned (Chrome system page, blocked, or error)</li>";
        return;
      }

      if (response && response.data) {
        resultsEl.innerHTML = `
          <li>${response.data.https ? "✅ <span class='ok'>HTTPS supported</span>" : "❌ <span class='fail'>HTTPS not supported</span>"}</li>
          <li>${response.data.utf8 ? "✅ <span class='ok'>UTF-8 charset declared</span>" : "❌ <span class='fail'>UTF-8 not declared</span>"}</li>
          <li>${response.data.localStorage ? "✅ <span class='ok'>localStorage available</span>" : "❌ <span class='fail'>localStorage not available</span>"}</li>
          <li>${response.data.serviceWorker ? "✅ <span class='ok'>Service Workers supported</span>" : "❌ <span class='fail'>No Service Worker support</span>"}</li>
        `;
      } else {
        resultsEl.innerHTML = "<li class='fail'>⚠️ No data received from this page</li>";
      }
    });
  });
});