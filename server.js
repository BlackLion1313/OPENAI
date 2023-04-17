// import the necessary modules
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require("express");

// create an instance of the express app
const app = express();

// use JSON middleware to parse request bodies
app.use(express.json());

// use the static middleware to serve static files from the "public" directory
app.use(express.static("public"));

// define the port to listen on
const port = 3000;

// create an instance of the OpenAI Configuration class with the API key from the environment
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create an instance of the OpenAIApi class with the configuration object
const openai = new OpenAIApi(config);

// define a function to get an image from OpenAI's Dall-E API
const getImage = async (message) => {
  const res = await openai.createImage({
    prompt: message,
    n: 5,
    size: "1024x1024",
  });
  return res.data;
};

// define a function to generate text using OpenAI's GPT-3 API
const getText = async (message) => {
  const res = await openai.createCompletion({
    prompt: message,
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
  return res.data;
};

// define a route to handle incoming POST requests to the root URL
app.post("/", async (req, res, next) => {
  try {
    const { type, message } = req.body;

    // if the request is for text generation, call the getText function
    if(type === 'text'){
        const data = await getText(message)
        // check if the response contains any choices and return the first choice as JSON
        if(data?.choices?.length){
            res.json({text: data.choices[0].text})
            return
        }
    } 
    // if the request is for image generation, call the getImage function
    else {
        const data = await getImage(message)
        // check if the response contains any data and return it as an array of objects with "image" properties
        if(data?.data){
            res.json({images: data.data.map((obj) => ({image: obj.url}))})
            return
        }
    }
  } catch (e) {
    console.log(e);
    next(e)
  }
});

// start the server and log a message to the console
app.listen(port, () => {
    console.log(` The app listening on port ${port}`)
})
