'use client';

import React, { useState, useEffect } from 'react';
import { sendMessageToServer, initializeChatOnServer } from './actions';
import { MdOutlineChat } from 'react-icons/md';
import { FaWindowClose } from "react-icons/fa";
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useRouter } from 'next/navigation';
import '../../components/Markdown.css'
import { DefaultTextComponent, SuggestDoctors, UserEmergencyComponent, UserPromptComponent } from './chatcomponents';
import { parse } from 'date-fns';

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const router = useRouter();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInput = (e) => {
    setMessageInput(e.target.value);
  };

  const parseResponse = (data) => {
    if (!data) return null;
    console.log(data);
    if (data.type === "text") {
      return <DefaultTextComponent data={data} />
    } else if (data.type === "user") {
      return <UserPromptComponent data={data} />
    } else if (data.type === "suggest-speciality") {
      return <SuggestDoctors data={data} />
    } else if (data.type === "emergency") {
      return <UserEmergencyComponent />
    }
  }

  useEffect(() => {
    async function queryChatbot(message) {
      const {responseText} = await sendMessageToServer(message.content, conversationId);
      setChatHistory((prev) => [
        ...prev,
        JSON.parse(responseText.trim())
      ]);
    }

    const lastMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
    if (lastMessage && lastMessage.type === "user") {
      queryChatbot(lastMessage);
    }
  }, [chatHistory])

  const handleChatInput = async () => {
    if (messageInput.trim() === '') return;

    setLoading(true);
    try {
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', content: messageInput }
      ]);

      setMessageInput('');
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const initializeChatbot = async () => {
    setLoading(true);
    try {
      const { initialResponse, newConversationId } = await initializeChatOnServer();
      setChatHistory([
        { type: 'text', content: initialResponse } // Store the model's response as an object
      ]);
      setConversationId(newConversationId);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeChatbot();
  }, []);

  return (
    <div className='fixed inset-0 z-20'>
      <div className='fixed inset-0 bg-white border border-gray-300 p-4 rounded-lg shadow-md z-70 font-Mono flex flex-col justify-between'>

        <div className='flex-1 overflow-y-auto snap-y'>
          {chatHistory.map((entry) => parseResponse(entry))}
          {loading && <div className='text-center text-black'>Loading...</div>}
        </div>

        <div className='flex items-center justify-between mt-4'>
          <input
            disabled={loading}
            className='w-full border border-gray-300 px-3 py-2 text-black rounded-md focus:outline-none'
            placeholder='Type your message'
            onKeyDown={(e) => (e.key === 'Enter' ? handleChatInput() : null)}
            onChange={handleInput}
            value={messageInput}
          />
          <button
            className='bg-black px-4 py-2 text-white rounded-md shadow-md hover:bg-gray-800 disabled:bg-gray-500 focus:outline-none ml-4'
            disabled={messageInput.trim() === '' || loading}
            onClick={handleChatInput}
          >
            <MdOutlineChat size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
