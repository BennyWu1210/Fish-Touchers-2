// import { main } from "./script.js";

console.log("THIS IS BACKGROUND");

try {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {},
      });
    }
  });
} catch (e) {
  console.log(`Error at background.js: ${e}`);
}

function setupIndex() {
  console.log("SETUP");
  try {
    document.addEventListener("DOMContentLoaded", (event) => {
      event.preventDefault();
      document.getElementById("btn").addEventListener("click", (event) => {
        event.preventDefault();

        let views = chrome.extension.getViews({ type: "popup" });
        if (views.length > 0) {
          //   views[0].window.close();

          chrome.windows.create({
            type: "popup",
            url: "result_page_2.html",
            height: 600,
            width: 400,
          });

          setupPage2();
        }
        document
          .getElementById("index-body")
          .addEventListener("click", (event) => {
            event.preventDefault();
            console.log("clicked");
          });
      });
    });
  } catch (err) {
    console.log(`Error at setup(): ${err}`);
  }
}

setupIndex();

function setupPage2() {
  console.log("FUSDJF");
  document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    document
      .getElementById("page-backbutton")
      .addEventListener("click", (event) => {
        console.log("FUSDJF");
        event.preventDefault();
        // Get the background page of the extension
        let backgroundPage = chrome.extension.getBackgroundPage();

        // Get information about the last focused window from the background page
        backgroundPage.chrome.windows.getLastFocused(
          {},
          function (lastFocusedWindow) {
            // Update the last focused window to activate it
            chrome.windows.update(lastFocusedWindow.id, { focused: true });
          }
        );
      });
  });
}
