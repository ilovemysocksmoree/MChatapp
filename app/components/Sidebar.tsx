'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BiSearch, BiPlus, BiMessageRoundedDetail } from 'react-icons/bi';

const chatList = [
  { id: 1, name: 'Alice Chen', message: 'Hey, how are you?', time: '5m', unread: 2, online: true },
  { id: 2, name: 'Bob Smith', message: 'The project looks great!', time: '10m', unread: 0, online: true },
  { id: 3, name: 'Carol White', message: 'Can we meet tomorrow?', time: '1h', unread: 1, online: false },
  { id: 4, name: 'David Brown', message: 'Thanks for your help!', time: '2h', unread: 0, online: true },
  { id: 5, name: 'Eve Johnson', message: 'Perfect, see you then!', time: '1d', unread: 0, online: false },
];

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  return (
    <div className="w-80 flex-shrink-0 h-full glass dark:glass-dark border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        {/* Search and New Chat */}
        <div className="p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
            <BiSearch className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors duration-200"
          >
            <BiPlus size={20} />
            <span>New Chat</span>
          </motion.button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2">
            <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">Recent Chats</h3>
            {chatList.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChat(chat.id)}
                className={`
                  relative p-3 rounded-xl cursor-pointer transition-all duration-200
                  ${selectedChat === chat.id 
                    ? 'bg-white dark:bg-gray-800 shadow-md' 
                    : 'hover:bg-white/50 dark:hover:bg-gray-800/50'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-medium">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{chat.name}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.message}</p>
                      {chat.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-xs text-white font-medium">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 