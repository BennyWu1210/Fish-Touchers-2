// Loading the required modules
/*const { Configuration, OpenAIApi } = require("openai");
import { Configuration, OpenAIApi } from "openai";
require("dotenv").config(); // reference: https://www.npmjs.com/package/dotenv

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Creating an openai object
const openai = new OpenAIApi(configuration);

// Sending a request - for testing purpose
export async function requestFeedback(prompt) {
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 500, // subject to change - depend on how much text we want
    prompt: prompt,
  });
  console.log("Response:");
  console.log(completion.data.choices[0].text);
}

module.exports.request = requestFeedback;*/
