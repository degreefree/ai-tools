import express from "express";
import * as path from "path";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import "dotenv/config";

const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_URL,
});
router.use(cors());
const summarizeTranscript = async (transcript) => {
  let summary = "";
  for (let i = 0; i < transcript.length; i++) {
    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Would you please summarize this?

          "${transcript[i]}"
          `,
          },
        ],
      })
      .then((result) => {
        summary = summary + result.data.choices[0].message.content;
      });
  }
  const titles = await getTitles(summary);
  return titles;
};
const getTags = async (summary) => {
  let generatedTags = "";
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here's a podcast summary: "${summary}". Would you please generate 10 youtube tags from that summary? Write 10 youtube tags only. Make sure it's hyper-targeted. Separate the results by comma. Use all lowercase. Send the result only as this is for a web app.`,
        },
      ],
    })
    .then((result) => {
      generatedTags = result.data.choices[0].message.content;
    });
  return generatedTags;
};

const getHooks = async (generatedTitles) => {
  let generatedHooks = {};
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `From these titles, generated a 3 - 5 words to be put on a Youtube Thumbnail graphic. Our content is about career tips, alternative education, learning skills and landing jobs without a degree. Make it extremely attention grabbing like how viral Youtubers make their thumbnails.  Send in JSON format.
        "${generatedTitles}"

        And here's the corresponding JSON structure:
        
        [{
          "hooks": "["hook 1", "hook 2", "hook 3", ...]"
        }]`,
        },
      ],
    })
    .then((result) => {
      generatedHooks = result.data.choices[0].message.content;
      console.log(generatedHooks);
    });
  return generatedHooks;
};

const getTitles = async (summary) => {
  let generatedTitles = {};

  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Would you please send me 5 title ideas from a podcast summary in this JSON format:
          
          And here's the corresponding JSON structure:
          
          [{
            "titles": "["title 1", "title 2", "title 3", ...]"
          }]

          Write the guest name at the end of the titles.
          
          Here are examples of our published titles, that you can use as reference. Please generate titles similar to this style. 
          • Learning Beyond the Classroom: From Pool Tech to Tech Solutions Engineer with [Guest Name]
          • Breaking into Code: How to Launch Your Software Engineering Career with No Experience with [Guest Name]
          • Future-Proof Your Career: Positioning Yourself for Success in the AI Era with [Guest Name]
          • Debunking ’Follow Your Passion’ as Career Advice, The Rise of Downcredentialing & Skill Based Hiring
          • How to Break into Marketing with No Degree or Experience with [Guest Name]
          • Unlock Opportunities in Operations - No Degree Needed! with [Guest Name]
          • Level Up Your Career: Achieving Tech Success Without a Degree with [Guest Name]
          • How To Get a $100,000+ IT Job with Bootcamps & Certifications with [Guest Name]
          • Breaking Into Cybersecurity: The Power of Accidents & Saying Yes To Everything with [Guest Name]
          
          Here's the summary: 
          "${summary}"

        `,
        },
      ],
    })
    .then((result) => {
      generatedTitles = result.data.choices[0].message.content;
      console.log(generatedTitles);
    });
  return generatedTitles;
};
const openai = new OpenAIApi(configuration);
router.post("/", async (req, res) => {
  const summary = await summarizeTranscript(req.body);
  const generatedTitle = await getTitles(summary);
  const generatedTags = await getTags(summary);
  const generatedHooks = await getHooks(generatedTitle);
  res.json({
    titles: generatedTitle,
    tags: generatedTags,
    hooks: generatedHooks,
  });
});

export default router;
