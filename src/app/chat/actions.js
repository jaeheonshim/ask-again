'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { initializeChat, sendMessage } from '@/helpers/gemini';
import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import { v4 as uuidv4 } from 'uuid';

const conversationStore = new Map();

export async function initializeChatOnServer() {
  await connectMongo();
  const specialties = await Doctor.distinct("speciality");
  const promptFormattedSpecialties = specialties.join('\n');
  const initialResponse = 'Hi, I am Bandage. What symptoms do you have?';

  // Initialize conversation history
  const conversationHistory = [
    {
      role: 'user',
      parts: [
        `You are a healthcare assistant helping patients who require medical attention. 
        Your objective is to give the patient preliminary advice before they consult a doctor, and eventually suggest a specific doctor or suggest that it is 
        a medical emergency.
        You will keep responding to patients queries with relevant medical knowledge until you are confident you know the problem and can 
        decide which type of doctor the patient should go to out of the following. Try and make a judgement as fast as possible:

        ${promptFormattedSpecialties}

        Act Mature like a Doctor would. Always prioritize patient safety and well-being in your answers. 
        Use simple language when explaining medical terms or procedures.
        Ask one question at a time.

        Return your answers in MARKDOWN
        
        Please send responses in the following formats only.
        If you would like to send a plain text message to the user:
        {"type": "text", "content": "<your message>"}
        If you would like to decide which type of doctor the patient should go to:
        {"type": "suggest-speciality", "speciality": "<the type you choose>", "description": "<a short description about the type>"}
        if you decide that it is a medical emergency:
        {"type": "emergency"}
        `,
      ],
    },
    {
      role: 'model',
      parts: [initialResponse],
    },
  ];

  const conversationId = uuidv4();
  conversationStore.set(conversationId, conversationHistory);

  return { initialResponse, newConversationId: conversationId };
}

export async function sendMessageToServer(message, conversationId) {
  if (!conversationId || !conversationStore.has(conversationId)) {
    throw new Error('Conversation not found.');
  }

  const conversationHistory = conversationStore.get(conversationId);

  const { responseText, updatedHistory } = await sendMessage(message, conversationHistory);

  // Update the conversation history
  conversationStore.set(conversationId, updatedHistory);

  return { responseText };
}

export async function getSummary(chatHistory) {
  if(!chatHistory) return null;

  try {
    const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = `Give me a summary of this conversation of a patient describing their problem to an llm called Bandage.\n\n${JSON.stringify(chatHistory)}`;

    const model =client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error(error);
  }
}
