// Script.js handles the logic of the popup page (transition between pages,
// calling the API program, etc.)

console.log("ESIFj");
export function main() {
  console.log("MAIN");

  chrome.runtime.onInstalled.addListener(function () {
    chrome.action.setPopup({ popup: "popup.html" });
  });
}
