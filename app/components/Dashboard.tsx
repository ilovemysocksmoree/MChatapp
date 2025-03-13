'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import ChatRoom from './ChatRoom';
import { useTheme } from '../context/ThemeContext';
import { BiBell, BiUser, BiSun, BiMoon, BiSearch } from 'react-icons/bi';

export default function Dashboard() {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      {/* Top Navigation */}
      <div className="glass dark:glass-dark border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold gradient-text"
              >
                ChillChat
              </motion.span>
              <nav className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {['chat', 'explore', 'friends'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    } px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  <BiSearch className="absolute right-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? (
                  <BiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <BiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <BiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800"></span>
                </motion.button>

                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 rounded-xl glass dark:glass-dark shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[
                        { id: 1, initials: 'AC', name: 'Alice Chen', action: 'mentioned you', time: '5 minutes ago', color: 'from-pink-500 to-rose-500' },
                        { id: 2, initials: 'BS', name: 'Bob Smith', action: 'sent you a message', time: '10 minutes ago', color: 'from-blue-500 to-indigo-500' }
                      ].map((notification) => (
                        <motion.a
                          key={notification.id}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                          href="#"
                          className="block px-4 py-3"
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${notification.color} flex items-center justify-center text-white font-medium`}>
                                {notification.initials}
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.name} {notification.action}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                        View all notifications
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                    YK
                  </div>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl glass dark:glass-dark shadow-lg py-2 z-50"
                  >
                    {['Profile', 'Settings', 'Sign out'].map((item) => (
                      <motion.a
                        key={item}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        {item}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-6">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-900/50 dark:to-indigo-950/50"></div>
          
          {/* Animated shapes */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute -bottom-8 right-1/4 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex w-full gap-6">
          <div className="w-80 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1">
            <ChatRoom />
          </div>
        </div>
      </div>
    </div>
  );
} 