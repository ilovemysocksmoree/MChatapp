'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BiRocket, BiGlobe, BiPlus } from 'react-icons/bi';

interface Space {
  id: number;
  name: string;
  participants: number;
  icon: string;
  type: 'your' | 'suggested';
}

interface SidebarProps {
  selectedSpace: number;
  onSpaceSelect: (spaceId: number) => void;
}

const spaces: Space[] = [
  { id: 1, name: 'Design Inspiration', participants: 24, icon: '🎨', type: 'your' },
  { id: 2, name: 'Midnight Talks', participants: 15, icon: '🌙', type: 'your' },
  { id: 3, name: 'Creative Hub', participants: 42, icon: '✨', type: 'your' },
  { id: 4, name: 'Chill Zone', participants: 32, icon: '🌿', type: 'your' },
  { id: 5, name: 'Music Lounge', participants: 28, icon: '🎵', type: 'your' },
  { id: 6, name: 'Art Gallery', participants: 19, icon: '🖼️', type: 'your' },
  { id: 7, name: 'Tech Innovators', participants: 156, icon: '🚀', type: 'suggested' },
  { id: 8, name: 'Eco Warriors', participants: 89, icon: '🌍', type: 'suggested' },
];

export default function Sidebar({ selectedSpace, onSpaceSelect }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const yourSpaces = filteredSpaces.filter(space => space.type === 'your');
  const suggestedSpaces = filteredSpaces.filter(space => space.type === 'suggested');

  return (
    <div className="h-full flex flex-col rounded-2xl bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search spaces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* Create New Space Button */}
      <div className="px-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-indigo-500/25 transition-shadow flex items-center justify-center gap-2"
        >
          <BiPlus className="w-5 h-5" />
          Create New Space
        </motion.button>
      </div>

      {/* Spaces List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {/* Your Spaces */}
        <div>
          <h2 className="px-4 text-sm font-semibold text-gray-900 dark:text-white mb-2">Your Spaces</h2>
          <div className="space-y-1">
            {yourSpaces.map((space) => (
              <motion.button
                key={space.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSpaceSelect(space.id)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                  selectedSpace === space.id
                    ? 'bg-white dark:bg-gray-800 shadow-lg'
                    : 'hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <span className="text-2xl">{space.icon}</span>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{space.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{space.participants} participants</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Suggested Spaces */}
        <div>
          <h2 className="px-4 text-sm font-semibold text-gray-900 dark:text-white mb-2">Suggested Spaces</h2>
          <div className="space-y-1">
            {suggestedSpaces.map((space) => (
              <motion.button
                key={space.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSpaceSelect(space.id)}
                className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 ${
                  selectedSpace === space.id
                    ? 'bg-white dark:bg-gray-800 shadow-lg'
                    : 'hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <span className="text-2xl">{space.icon}</span>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{space.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{space.participants} participants</p>
                </div>
                <div className="flex items-center gap-2">
                  {space.id === 7 && <BiRocket className="w-4 h-4 text-indigo-500" />}
                  {space.id === 8 && <BiGlobe className="w-4 h-4 text-green-500" />}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium shadow-lg">
            YK
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Your Profile</h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
} 