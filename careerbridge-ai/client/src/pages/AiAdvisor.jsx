import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Zap, Send, Bot, User } from 'lucide-react';

const AiAdvisor = () => {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMsg = { role: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await api.post('/ai/career-advice', { question });
      const aiResponse = {
        role: 'ai',
        text: res.data.data.response
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: 'ai',
        text: 'Sorry, I encountered an error while processing your request. Please try again later.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col h-full">
      <div className="text-center mb-8">
        <Zap className="h-12 w-12 text-purple-600 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-gray-900">AI Career Advisor</h1>
        <p className="mt-2 text-gray-600">Ask anything about your career, skills, or job search strategy.</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 overflow-y-auto max-h-96 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            <Bot className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="font-medium">No messages yet.</p>
            <p className="text-sm mt-1">Ask me anything about careers, skills, or interview prep!</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'ai' && (
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-purple-600" />
              </div>
            )}
            <div className={`max-w-md px-4 py-3 rounded-lg text-sm whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-green-600 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-green-600" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5 text-purple-600" />
            </div>
            <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-lg text-sm rounded-bl-none">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={askAI} className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. How to prepare for Google interview?"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 disabled:bg-gray-400 flex items-center gap-2 font-medium"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default AiAdvisor;
