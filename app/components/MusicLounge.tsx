'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiPlay, BiPause, BiSkipNext, BiSkipPrevious, BiVolumeFull, BiHeart } from 'react-icons/bi';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  category: string;
  imageUrl: string;
}

interface Background {
  id: number;
  name: string;
  url: string;
  type: 'gif' | 'video';
}

const musicCategories = [
  'Concentration',
  'Lo-Fi',
  'Nature Sounds',
  'Classical',
  'Ambient',
  'Deep Focus',
  'Piano',
  'Rain Sounds',
];

const backgrounds: Background[] = [
  { id: 1, name: 'Rainy Window', url: '/backgrounds/rain.gif', type: 'gif' },
  { id: 2, name: 'Cozy Cafe', url: '/backgrounds/cafe.gif', type: 'gif' },
  { id: 3, name: 'Forest', url: '/backgrounds/forest.gif', type: 'gif' },
  { id: 4, name: 'Night City', url: '/backgrounds/city.gif', type: 'gif' },
  { id: 5, name: 'Ocean Waves', url: '/backgrounds/ocean.gif', type: 'gif' },
];

const tracks: Track[] = [
  {
    id: 1,
    title: 'Deep Focus',
    artist: 'Ambient Beats',
    duration: '3:45',
    category: 'Concentration',
    imageUrl: '/music/track1.jpg',
  },
  {
    id: 2,
    title: 'Rain & Piano',
    artist: 'Nature Sounds',
    duration: '4:20',
    category: 'Nature Sounds',
    imageUrl: '/music/track2.jpg',
  },
  // Add more tracks as needed
];

export default function MusicLounge() {
  const [selectedCategory, setSelectedCategory] = useState('Concentration');
  const [selectedBackground, setSelectedBackground] = useState<Background>(backgrounds[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);

  const filteredTracks = tracks.filter(track => track.category === selectedCategory);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Background Preview */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={selectedBackground.url}
          alt={selectedBackground.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Music Lounge</h1>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {musicCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tracks */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tracks</h2>
            {filteredTracks.map((track) => (
              <motion.div
                key={track.id}
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center gap-4"
              >
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{track.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{track.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{track.duration}</span>
                  <BiHeart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Backgrounds */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Backgrounds</h2>
            <div className="grid grid-cols-2 gap-3">
              {backgrounds.map((bg) => (
                <motion.button
                  key={bg.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBackground(bg)}
                  className={`relative rounded-xl overflow-hidden aspect-video ${
                    selectedBackground.id === bg.id ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <img
                    src={bg.url}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{bg.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BiSkipPrevious className="w-8 h-8 text-gray-600 dark:text-gray-300 cursor-pointer" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white"
            >
              {isPlaying ? (
                <BiPause className="w-6 h-6" />
              ) : (
                <BiPlay className="w-6 h-6 ml-1" />
              )}
            </motion.button>
            <BiSkipNext className="w-8 h-8 text-gray-600 dark:text-gray-300 cursor-pointer" />
          </div>
          
          <div className="flex items-center gap-2">
            <BiVolumeFull className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-24 accent-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 