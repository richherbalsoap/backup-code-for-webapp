
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Users, BookOpen, MessageSquare, FileText } from 'lucide-react';

function DashboardPage() {
  const stats = [
    { icon: Users, label: 'Total Students', value: '245', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, label: 'Total Homework Sent', value: '89', color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, label: 'Total Complaints Logged', value: '12', color: 'from-orange-500 to-red-500' },
    { icon: FileText, label: 'Total Results Updated', value: '156', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Patanjali School System</title>
        <meta name="description" content="View your school dashboard statistics and overview" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          
          <div className="w-full sm:w-auto">
            <select className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300">
              <option>Academic Year 2025-26</option>
              <option>Academic Year 2024-25</option>
              <option>Academic Year 2023-24</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,217,61,0.2)] transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                
                <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.5)]">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
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
