'use server';

import { initializeChat, sendMessage } from '@/helpers/gemini';
import { v4 as uuidv4 } from 'uuid';

const conversationStore = new Map();

export async function initializeChatOnServer() {
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
        1) Cardiologist
        2) Oncologist
        3) General Consultant
        4) Pediatrician
        Once you are sure, respond with this:
        "Connecting you with a <Selected Doctor Type> now..."
        Act Mature like a Doctor would. Always prioritize patient safety and well-being in your answers. 
        Use simple language when explaining medical terms or procedures.
        If you feel that this is a medical emergency, respond with only this: 
        "You should call 911 and seek medical assistance immediately!"
        Return your answers in MARKDOWN`,
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
