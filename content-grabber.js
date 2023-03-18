// testing only
import "./thing.js";

export function grab() {
  console.log("THIS IS CONTENT GRABBER");
  if (typeof init === "undefined") {
    let init = async function () {
      function getContent() {
        return [...document.getElementsByTagName("p")]
          .map((e) => e.innerText)
          .join("");
      }
      const article_content = getContent();
      // console.log(article_content);
      await request(article_content);
    };
    init();
  }
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
    } catch (err) {
      console.log(err);
    }
  }
}
