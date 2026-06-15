import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { SerpAPI } from '@langchain/community/tools/serpapi';
import { createAgent } from 'langchain';

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    maxOutputTokens: 2048,
    temperature: 0.7,
    apiKey: process.env.GOOGLE_API_KEY,
});

const tools = [new SerpAPI(process.env.SERP_API_KEY, { location: 'India' })];

const agent = createAgent({
    model,
    tools,
});

const result = await agent.invoke({
    messages: [
        {
            role: 'user',
            content: "What's the latest version of Next.js?",
        },
    ],
});

console.log(result);
