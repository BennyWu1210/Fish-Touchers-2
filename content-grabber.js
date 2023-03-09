// testing only

if(typeof init === 'undefined'){
    let init = async function(){
        function getContent() {
            return [...document.getElementsByTagName("p")].map(e => e.innerText).join("")
        }
        const article_content = getContent();
        console.log(article_content);

        const response = await fetch("http://localhost:8000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With",
                "Access-Control-Allow-Private-Network": "true"
            },
            body: JSON.stringify({ promot: article_content }),
        });

        const data = await response.json();
        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        } else {
            alert("success");
        }


    }
    init();
}