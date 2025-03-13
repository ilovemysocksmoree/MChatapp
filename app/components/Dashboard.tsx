'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BiSun, BiMoon } from 'react-icons/bi';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto h-full flex gap-4 max-w-7xl">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-80 flex-shrink-0"
        >
          <Sidebar />
        </motion.div>

        {/* Chat Room */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="flex-1"
        >
          <ChatRoom />
        </motion.div>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
        >
          {theme === 'dark' ? (
            <BiSun className="w-6 h-6 text-yellow-500" />
          ) : (
            <BiMoon className="w-6 h-6 text-gray-600" />
          )}
        </motion.button>
      </div>
    </div>
  );
} 