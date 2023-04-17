const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));
const port = 3000;

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const getImage = async (message) => {
  const res = await openai.createImage({
    prompt: message,
    n: 5,
    size: "1024x1024",
  });
  return res.data;
};

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

app.post("/", async (req, res, next) => {
  try {
    const { type, message } = req.body;
    if(type === 'text'){
        const data = await getText(message)
        if(data?.choices?.length){
            res.json({text: data.choices[0].text})
            return
        }
    } else {
        const data = await getImage(message)
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

app.listen(port, () => {
    console.log(` The app listening on port ${port}`)
})