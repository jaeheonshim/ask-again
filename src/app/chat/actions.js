'use server';

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
        Your objective is to give the patient preliminary advice before they consult a doctor.
        You will keep responding to patients queries with relevant medical knowledge until you are confident you know the problem and can 
        decide which type of doctor the patient should go to out of the following. Try and make a judgement as fast as possible:

        ${promptFormattedSpecialties}

        Once you are sure, respond with this:
        "Connecting you with a <Selected Doctor Type> now...".
        Act Mature like a Doctor would. Always prioritize patient safety and well-being in your answers. 
        Use simple language when explaining medical terms or procedures.
        Ask one question at a time.
        If you feel that this is a medical emergency, respond with only this: 
        "You should call 911 and seek medical assistance immediately!"
        Return your answers in MARKDOWN
        
        Please send responses in the following formats only.
        If you would like to send a plain text message to the user:
        {"type": "text", "content": "<your message>"}

        If you would like to ask the user a multiple choice question:
        {"type": "question", "question": "<your question>", "choices": ["<choice1>", "<choice2>"], "multiple": <true if multiple answers can be selected, false otherwise>}
        The user will respond with the text value of the choice.
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
