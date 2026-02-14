
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const AIChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you with school management today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      const botMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Insight Chatbot - Patanjali School System</title>
        <meta name="description" content="Get AI-powered insights and recommendations for school management" />
      </Helmet>
      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">AI Insight Chatbot</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col max-w-4xl mx-auto"
          style={{ height: 'calc(100vh - 250px)', minHeight: '500px' }}
        >
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot'
                      ? 'bg-[#FFD93D]/20 border border-[#FFD93D]/30'
                      : 'bg-white/10 border border-white/20'
                  }`}>
                    {message.sender === 'bot' ? (
                      <Bot size={18} className="text-[#FFD93D]" />
                    ) : (
                      <User size={18} className="text-white" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'bot'
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-[#FFD93D]/20 border border-[#FFD93D]/30'
                    }`}>
                      <p className="text-white text-sm leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
                    </div>
                    <p className="text-white/40 text-xs mt-1 px-2">{message.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask for a student's marks (e.g., 'Rohan')"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
              />
              <Button
                type="submit"
                className="bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold px-6 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
              >
                <Send size={20} />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AIChatbotPage;
