// Loading the required modules
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // reference: https://www.npmjs.com/package/dotenv

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Creating an openai object
const openai = new OpenAIApi(configuration);

// Sending a request - for testing purpose
async function requestFeedback(prompt) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 500, // subject to change - depend on how much text we want
    prompt: prompt,
  });
  console.log(completion.data.choices[0].text);
}

module.exports.requestFeedback = requestFeedback;
