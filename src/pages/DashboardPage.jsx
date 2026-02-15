
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BookOpen, MessageSquare, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function DashboardPage() {
  const navigate = useNavigate(); // Initialize navigate hook

  const panelCards = [
    { id: 'homework', icon: BookOpen, label: 'Homework Sender', onClick: () => navigate('/homework'), color: 'from-purple-500 to-pink-500' },
    { id: 'complaint', icon: MessageSquare, label: 'Complaint Sender', onClick: () => navigate('/complaints'), color: 'from-orange-500 to-red-500' },
    { id: 'result', icon: FileText, label: 'Result Sender', onClick: () => navigate('/results'), color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <> 
      <Helmet>
        <title>Dashboard - Patanjali School System</title>
        <meta name="description" content="View your school dashboard statistics and overview" />
      </Helmet>

      <div className="space-y-6 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col sm:flex-row sm:justify-center items-center w-full gap-4 sm:gap-0">
          <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>
        </div>

        {/* Academic Calendar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Academic Calendar</h2>
          <div className="relative">
            <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">SELECT DATE</label>
            <input
              type="date"
              className="w-full p-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 custom-date-input"
            />
          </div>
        </motion.div>

        {/* New Clickable Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {panelCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index * 0.1) + 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,217,61,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={card.onClick}
              className="relative group cursor-pointer bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg text-center flex flex-col items-center justify-center min-h-[180px]"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon size={32} className="text-white" />
              </div>
              <p className="text-white text-lg font-semibold">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 text-center"
        >
          <h2 className="text-xl font-semibold text-white mb-2">Welcome back, Admin!</h2>
          <p className="text-white/60">
            Here's an overview of your school management system. Navigate through the sidebar to access different modules.
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default DashboardPage;
