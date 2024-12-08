import React, { useState } from 'react';
import './Chatbot.css';
import { formatTimestamp } from './helpers';

const API_KEY = 'AIzaSyAe6d1ZbuP6OFY17CbkE516IxeuK_0_XIc';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot", timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = {
        text: input,
        sender: "user",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Fetch bot's response
      const botReply = await fetchAIResponse(input);
      const botMessage = {
        text: botReply || "Sorry, I couldn't understand that.",
        sender: "bot",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    }
  };

  // Function to fetch AI response from Gemini API
  const fetchAIResponse = async (userInput) => {
    if (!userInput.trim()) return 'Error: Input cannot be empty.';

    const requestBody = {
      contents: [{ parts: [{ text: userInput }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 150,
      },
    };

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(`Error: Failed to fetch response. Status: ${response.status}`);
        return `Error: Failed to fetch response.`;
      }

      const data = await response.json();
      if (data?.candidates?.length > 0 && data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        return 'Error: No content generated.';
      }
    } catch (error) {
      console.error('Error:', error);
      return 'Error: Unable to fetch response.';
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${message.sender === "bot" ? "bot" : "user"}`}
          >
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
