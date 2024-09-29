'use client';

import React, { useState, useEffect } from 'react';
import { getSummary, sendMessageToServer, initializeChatOnServer } from './actions';
import { MdSend } from 'react-icons/md';
import { FaWindowClose } from "react-icons/fa";
import MarkdownRenderer from '@/components/MarkdownRenderer';
import '../../components/Markdown.css';
import { DefaultTextComponent, SuggestDoctors, UserEmergencyComponent, UserPromptComponent } from './chatcomponents';
import { useRouter } from 'next/navigation';

const Chatbot = ({ onClose }) => {
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    localStorage.removeItem('user_llm_chat_data');
  }, []);

  const handleInput = (e) => {
    setMessageInput(e.target.value);
  };

  const searchDoctor = (speciality) => {
    // save to localStorage
    localStorage.setItem('user_llm_chat_data', JSON.stringify(chatHistory));
    router.push(`patient/finddoctors?speciality=${speciality}`);
  }

  const parseResponse = (data) => {
    if (!data) return null;
    if (data.type === "text") {
      return <DefaultTextComponent data={data} />;
    } else if (data.type === "user") {
      return <UserPromptComponent data={data} />;
    } else if (data.type === "suggest-speciality") {
      return <SuggestDoctors data={data} searchDoctor={searchDoctor} />;
    } else if (data.type === "emergency") {
      return <UserEmergencyComponent />;
    }
  };

  useEffect(() => {
    async function queryChatbot(message) {
      const { responseText } = await sendMessageToServer(message.content, conversationId);
      setChatHistory((prev) => [
        ...prev,
        JSON.parse(responseText.trim()),
      ]);
    }

    const lastMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
    if (lastMessage && lastMessage.type === "user") {
      queryChatbot(lastMessage);
    }
  }, [chatHistory]);

  const handleChatInput = async () => {
    if (messageInput.trim() === '') return;

    setLoading(true);
    try {
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', content: messageInput },
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
        { type: 'text', content: initialResponse }, // Store the model's response as an object
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
<div className='fixed bottom-0 right-4 mb-2 mr-4 z-50'>
  <div
    className='bg-white border border-gray-200 p-4 rounded-lg shadow-lg font-Mono flex flex-col justify-between'
    style={{ width: '500px', height: '600px' }} // Increased width and height
  >
    {/* Close Button */}
    <div className='flex justify-between mb-2'>
      <h2 className='text-xl font-bold text-purple-700'>Help Us Understand You!</h2> {/* Matching title styling */}
      <button onClick={onClose} className='text-gray-500 hover:text-gray-700 focus:outline-none'>
        <FaWindowClose size={24} />
      </button>
    </div>

    {/* Chat History */}
    <div className='flex-1 overflow-y-auto mb-4 bg-gray-50 p-3 rounded-md'>
      {chatHistory.map((entry, index) => (
        <div key={index} className='m-0 p-0 rounded-md'>
          {parseResponse(entry)}
        </div>
      ))}
      {loading && <div className='text-center text-gray-600'>Loading...</div>}
    </div>

    {/* Message Input */}
    <div className='flex items-center'>
      <input
        disabled={loading}
        className='w-full border border-gray-300 px-4 py-3 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600'
        placeholder='Type your message'
        onKeyDown={(e) => (e.key === 'Enter' ? handleChatInput() : null)}
        onChange={handleInput}
        value={messageInput}
      />
      <button
        className='bg-purple-600 px-4 py-3 text-white rounded-md shadow-md hover:bg-purple-700 disabled:bg-gray-400 focus:outline-none ml-2'
        disabled={messageInput.trim() === '' || loading}
        onClick={handleChatInput}
      >
        <MdSend size={24} />
      </button>
    </div>
  </div>
</div>

  );
};

export default Chatbot;
