// Script.js handles the logic of the popup page (transition between pages,
// calling the API program, etc.)

document.getElementById("btn").addEventListener("click", function() {
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
                for (let i = 0; i < n; i++) {
                    const p = doc.querySelectorAll('p').item(i);
                    article_content += p.innerText;
                }
                console.log("fetched content: " + article_content);
                request(article_content).then(() => {
                    console.log("request success");
                });
            });
    });
});
async function request(content) {
    try {
        const api_key = "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";
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
                        content: `Do you think the following text is legit ${content}`,
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