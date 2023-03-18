import { grab } from "./content-grabber.js";

console.log("THIS IS BACKGROUND");

try {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: grab,
      });
    }
  });
} catch (e) {
  console.log(`Error at background.js: ${e}`);
}
