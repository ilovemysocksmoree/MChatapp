'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { BiSend, BiSmile, BiImage, BiPaperclip } from 'react-icons/bi';
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react';

const messages = [
  { id: 1, sender: 'Alice Chen', content: 'Hey! How are you doing?', time: '10:30 AM', type: 'received' },
  { id: 2, sender: 'You', content: 'Hi Alice! I\'m doing great, thanks for asking. How about you?', time: '10:31 AM', type: 'sent' },
  { id: 3, sender: 'Alice Chen', content: 'I\'m good too! Just working on some new designs. Would love your feedback when you have a moment.', time: '10:32 AM', type: 'received' },
  { id: 4, sender: 'You', content: 'Of course! I\'d be happy to take a look. Send them over whenever you\'re ready.', time: '10:33 AM', type: 'sent' },
  { id: 5, sender: 'Alice Chen', content: 'Perfect, thanks! I\'ll share them with you later today. 😊', time: '10:34 AM', type: 'received' },
];

export default function ChatRoom() {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message handling logic here
      setMessage('');
      setShowEmoji(false);
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  return (
    <div className="relative flex-1 flex flex-col h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-medium shadow-lg">
              AC
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-lg"></div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Alice Chen</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-lg px-4 py-2 rounded-2xl shadow-lg
                ${msg.type === 'sent'
                  ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white ml-12'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white mr-12'
                }
              `}
            >
              {msg.type === 'received' && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{msg.sender}</p>
              )}
              <p className="text-sm">{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.type === 'sent' ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none placeholder-gray-400 dark:placeholder-gray-500"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <BiSmile size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <BiImage size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <BiPaperclip size={20} />
              </motion.button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-shadow"
          >
            <BiSend size={20} />
          </motion.button>
        </div>
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-20 right-6 z-50">
          <div className="p-1 bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
            <EmojiPicker
              theme={(theme === 'dark' ? 'dark' : 'light') as Theme}
              onEmojiClick={onEmojiClick}
              lazyLoadEmojis={true}
            />
          </div>
        </div>
      )}
    </div>
  );
} 