// OpenApiUtill.js
import  OpenAI  from "openai";

const openai = new OpenAI({
    apiKey : import.meta.env.VITE_GPT_API_KEY,
    dangerouslyAllowBrowser: true,
});

export const OpenApiUtil = {
    async prompt(msg) {

        
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: msg }],
          // model: "gpt-4o",
          model: "gpt-3.5-turbo",

        });
    
        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content
      }
};