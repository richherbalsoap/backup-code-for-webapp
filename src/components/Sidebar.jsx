
import React from 'react';
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
  X,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const teacherTools = [
    { path: '/homework', icon: BookOpen, label: 'Homework Sender' },
    { path: '/complaints', icon: MessageSquare, label: 'Complaint Sender' },
    { path: '/results', icon: FileText, label: 'Result Sender' },
];

const principalTools = [
    { path: '/students', icon: Users, label: 'Student Management' },
    { path: '/announcements', icon: Bell, label: 'Announcements' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/ai-chatbot', icon: Bot, label: 'AI Insight Chatbot' },
    { path: '/promotion', icon: TrendingUp, label: 'Promotion Panel' },
    { path: '/fees', icon: DollarSign, label: 'Fees Reminder' },
];

const NavItem = ({ item, onClick }) => (
  <li>
    <NavLink
      to={item.path}
      onClick={onClick}
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
);

const CollapsibleSection = ({ title, icon: Icon, items, onClick }) => {
  const [isSectionOpen, setIsSectionOpen] = React.useState(true);

  return (
    <div>
      <button 
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-white/50 hover:text-white/80 transition-colors duration-300"
      >
        <span className="flex items-center gap-2">
          <Icon size={16} />
          {title}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isSectionOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isSectionOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2 pl-4 pt-2"
          >
            {items.map((item) => (
              <NavItem key={item.path} item={item} onClick={onClick} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function Sidebar({ isOpen, toggleSidebar }) {
  const { userName } = useAuth();

  const handleLinkClick = () => {
    toggleSidebar();
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed top-0 left-0 h-screen w-[280px] z-50 
          bg-[#0F0F0F]/80 backdrop-blur-md border-r border-white/10 
          flex flex-col 
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <GraduationCap size={32} className="text-[#FFD93D]"/>
                <div>
                    <h1 className="text-xl font-bold text-white">EDULinker</h1>
                    <p className="text-xs text-white/50">{userName}</p>
                </div>
            </div>
             <button onClick={toggleSidebar} className="text-white/70 hover:text-white">
                <X size={24} />
            </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scroll-track-transparent">
          <ul className="space-y-2">
            <NavItem item={{ path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' }} onClick={handleLinkClick} />
          </ul>

          <CollapsibleSection title="TEACHER TOOLS" icon={BookOpen} items={teacherTools} onClick={handleLinkClick} />
          <CollapsibleSection title="PRINCIPAL TOOLS" icon={Users} items={principalTools} onClick={handleLinkClick} />
          
          <ul className="space-y-2 pt-4 border-t border-white/10">
             <NavItem item={{ path: '/settings', icon: Settings, label: 'Settings' }} onClick={handleLinkClick} />
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
