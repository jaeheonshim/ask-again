'use client';

import React, { useState, useEffect } from 'react';
import { sendMessageToServer, initializeChatOnServer } from './actions';
import { MdSend } from 'react-icons/md';
import { FaWindowClose } from "react-icons/fa";
import MarkdownRenderer from '@/components/MarkdownRenderer';
import '../../components/Markdown.css';
import { DefaultTextComponent, SuggestDoctors, UserEmergencyComponent, UserPromptComponent } from './chatcomponents';

const Chatbot = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  const handleInput = (e) => {
    setMessageInput(e.target.value);
  };

  const parseResponse = (data) => {
    if (!data) return null;
    if (data.type === "text") {
      return <DefaultTextComponent data={data} />;
    } else if (data.type === "user") {
      return <UserPromptComponent data={data} />;
    } else if (data.type === "suggest-speciality") {
      return <SuggestDoctors data={data} />;
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
    <div className='fixed bottom-0 left-0 mb-4 ml-4 z-50'>
      <div
        className='bg-white border border-gray-300 p-4 rounded-lg shadow-md font-Mono flex flex-col justify-between'
        style={{ width: '350px', height: '500px' }}
      >
        {/* Close Button */}
        <div className='flex justify-between mb-2'>
          <h2 className='text-lg font-bold'>New Appointment</h2>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-800 focus:outline-none'>
            <FaWindowClose size={24} />
          </button>
        </div>

        {/* Chat History */}
        <div className='flex-1 overflow-y-auto mb-2'>
          {chatHistory.map((entry, index) => (
            <div key={index}>{parseResponse(entry)}</div>
          ))}
          {loading && <div className='text-center text-black'>Loading...</div>}
        </div>

        {/* Message Input */}
        <div className='flex items-center mt-2'>
          <input
            disabled={loading}
            className='w-full border border-gray-300 px-3 py-2 text-black rounded-md focus:outline-none'
            placeholder='Type your message'
            onKeyDown={(e) => (e.key === 'Enter' ? handleChatInput() : null)}
            onChange={handleInput}
            value={messageInput}
          />
          <button
            className='bg-blue-500 px-4 py-2 text-white rounded-md shadow-md hover:bg-blue-600 disabled:bg-gray-500 focus:outline-none ml-2'
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
