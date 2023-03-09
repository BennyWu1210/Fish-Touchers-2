try{
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        if(changeInfo.status == 'complete'){
            chrome.scripting.executeScript({
                files: ["content-grabber.js"],
                target: {tabId: tab.id}
            })
        }
    })
}
catch(e){
    console.log(e)
}