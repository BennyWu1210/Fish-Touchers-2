// Script.js handles the logic of the popup page (transition between pages,
// calling the API program, etc.)

// "Check if the source is credible?"
document.getElementsByClassName("btn1")[0].addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        console.log(tabs[0].id);
        fetch(`${tabs[0].url}`)
            .then(response => response.text())
            .then(html => {
                // fetch the raw HTML for the current site
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const n = doc.querySelectorAll('p').length;
                var article_content = "";
                var word_count = 0;

                for (let i = 0; i < n && word_count < 700; i++) {
                    // for each <p> tag attach its innerText to article_content
                    const p = doc.querySelectorAll('p').item(i);
                    article_content += p.innerText;
                    p.innerText.length;
                    word_count += p.innerText.length;
                }
                //console.log("fetched content: " + article_content);
                request(`check if the source of the following article seem credible. If the following content doesn't seem like a news article, reply 'This webpage does not seem like a legitimate article...'. FYI, the url of this article is ${tabs[0].url} `, article_content).then(() => {
                    console.log("request success");
                });
            });
    });
});
// "Get a summary of the article?"
document.getElementsByClassName("btn2")[0].addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        console.log(tabs[0].id);
        fetch(`${tabs[0].url}`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const n = doc.querySelectorAll('p').length;
                var article_content = "";
                var word_count = 0;

                for (let i = 0; i < n && word_count < 700; i++) {
                    const p = doc.querySelectorAll('p').item(i);
                    article_content += p.innerText;
                    word_count += p.innerText.length;
                }
                //console.log("fetched content: " + article_content);
                request(`Get a summary of the following article. If the following content doesn't seem like an article, reply 'This webpage does not seem like a news article...'. Limit your response to 100 words. FYI, the url of this article is ${tabs[0].url}  `, article_content).then(() => {
                    console.log("request success");
                });
            });
    });
});
// "Check for factual errors?"
document.getElementsByClassName("btn3")[0].addEventListener("click", function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        console.log(tabs[0].id);
        fetch(`${tabs[0].url}`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const n = doc.querySelectorAll('p').length;
                var article_content = "";
                var word_count = 0;

                for (let i = 0; i < n && word_count < 700; i++) {
                    const p = doc.querySelectorAll('p').item(i);
                    article_content += p.innerText;
                    word_count += p.innerText.length;
                }
                //console.log("fetched content: " + article_content);
                request(`Check for potential factual errors in the following article. If the following content doesn't seem like a news article, reply 'This webpage does not seem like an article...'. Limit your response to 100 words. If the article seem like its from the future, assume that it is not. FYI, the url of this article is ${tabs[0].url}   `, article_content).then(() => {
                    console.log("request success");
                });
            });
    });
});
async function request(prompt, content) {
    console.log("prompt:")
    console.log(prompt);
    console.log("content: ")
    console.log(content)
    try {
        const api_key = "YOUR KEY HERE";
        const url = "https://api.openai.com/v1/chat/completions";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${api_key}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `${prompt} ${content}`,
                    },
                ],
            }),
        });
        const res = await response.text();
        const str = JSON.parse(res);
        console.log("Response: ");
        console.log(str.choices[0].message.content);
        document.getElementById("fct-info").innerText = str.choices[0].message.content
    } catch (err) {
        console.log(err);
    }
}
