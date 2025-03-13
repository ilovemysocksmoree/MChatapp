'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSend, BiSmile, BiImage, BiDotsVerticalRounded, BiUser } from 'react-icons/bi';

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  type: 'text' | 'image' | 'system';
  status: 'sent' | 'delivered' | 'read';
}

const sampleMessages: Message[] = [
  {
    id: 1,
    content: 'Welcome to Chill Zone! 🌿 A space for relaxed conversations and good vibes.',
    sender: 'system',
    timestamp: '12:00',
    type: 'system',
    status: 'read'
  },
  {
    id: 2,
    content: 'Hey everyone! How\'s the day going?',
    sender: 'Alex',
    timestamp: '12:05',
    type: 'text',
    status: 'read'
  },
  {
    id: 3,
    content: 'Just finished a great meditation session. Anyone else into mindfulness?',
    sender: 'Sarah',
    timestamp: '12:07',
    type: 'text',
    status: 'read'
  },
  {
    id: 4,
    content: 'I\'ve been practicing for a few months now. It really helps with stress!',
    sender: 'currentUser',
    timestamp: '12:08',
    type: 'text',
    status: 'delivered'
  }
];

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        content: newMessage,
        sender: 'currentUser',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        status: 'sent'
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🌿</div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chill Zone</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">32 participants • 12 online</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <BiDotsVerticalRounded className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'currentUser' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'system' ? (
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className={`max-w-md ${message.sender === 'currentUser' ? 'items-end' : 'items-start'}`}>
                  {message.sender !== 'currentUser' && (
                    <div className="flex items-center gap-2 mb-1 ml-2">
                      <BiUser className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{message.sender}</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.sender === 'currentUser'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="flex items-center gap-1 mt-1 mx-2">
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                    {message.sender === 'currentUser' && (
                      <span className="text-xs text-gray-500">• {message.status}</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 max-h-32 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <button
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <BiSmile className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <BiImage className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="p-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
          >
            <BiSend className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
} 