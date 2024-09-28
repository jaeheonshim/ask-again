'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';


export async function sendMessage(message, conversationHistory) {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  const model = new GoogleGenerativeAI(geminiApiKey).getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Recreate the conversation with the existing history
  const conversation = model.startChat({
    history: conversationHistory,
    generationConfig: {
      maxOutputTokens: 350,
    },
  });

  const result = await conversation.sendMessage(message);
  const responseText = await result.response.text();

  // Update conversation history
  const updatedHistory = [...conversationHistory];
  updatedHistory.push({ role: 'user', parts: [message] });
  updatedHistory.push({ role: 'model', parts: [responseText] });

  return { responseText, updatedHistory };
}
