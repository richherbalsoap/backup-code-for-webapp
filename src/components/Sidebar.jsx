
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  Bell, 
  BarChart3, 
  Bot, 
  TrendingUp, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/students', icon: Users, label: 'Student Management' },
    { path: '/homework', icon: BookOpen, label: 'Homework Sender' },
    { path: '/complaints', icon: MessageSquare, label: 'Complaint Sender' },
    { path: '/results', icon: FileText, label: 'Result Sender' },
    { path: '/fees', icon: DollarSign, label: 'Fees Reminder' },
    { path: '/announcements', icon: Bell, label: 'Announcements' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/ai-chatbot', icon: Bot, label: 'AI Insight Chatbot' },
    { path: '/promotion', icon: TrendingUp, label: 'Promotion Panel' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 text-[#FFD93D] hover:bg-[#0F0F0F] transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-[280px] z-40
          bg-[#0F0F0F]/80 backdrop-blur-md border-r border-white/10
          flex flex-col transition-transform duration-300
          lg:translate-x-0
        `}
      >
        {/* Branding */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.5)]">
            Patanjali School System
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-300 group
                    ${isActive 
                      ? 'bg-[#FFD93D]/20 text-[#FFD93D] shadow-[0_0_20px_rgba(255,217,61,0.3)]' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <item.icon 
                    size={20} 
                    className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,217,61,0.6)]" 
                  />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>
    </>
  );
}

export default Sidebar;
