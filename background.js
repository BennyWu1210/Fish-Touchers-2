/*
function become_dalao() {
    document.getElementById("button").addEventListener("click", myFunction);
}

function myFunction() {
    let dalao = document.getElementById("button");
    dalao.innerHTML = "Bill is dalao";
}

become_dalao();
*/
console.log("???")
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