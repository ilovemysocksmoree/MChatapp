'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiX, BiCheck, BiMessageDetail, BiUserPlus, BiHeart } from 'react-icons/bi';

interface Notification {
  id: number;
  type: 'message' | 'friend_request' | 'reaction';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'message',
    user: {
      name: 'Sarah Chen',
      avatar: 'SC'
    },
    content: 'mentioned you in Chill Zone',
    time: '5m ago',
    read: false
  },
  {
    id: 2,
    type: 'friend_request',
    user: {
      name: 'Mike Wilson',
      avatar: 'MW'
    },
    content: 'wants to join your space',
    time: '10m ago',
    read: false
  },
  {
    id: 3,
    type: 'reaction',
    user: {
      name: 'Emma Davis',
      avatar: 'ED'
    },
    content: 'reacted to your message',
    time: '15m ago',
    read: false
  }
];

interface NotificationsPanelProps {
  onClose: () => void;
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 w-80 h-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full h-full bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3 p-4 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                    {notification.user.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-medium">{notification.user.name}</span>
                    {' '}{notification.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800">
            <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              Mark all as read
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 