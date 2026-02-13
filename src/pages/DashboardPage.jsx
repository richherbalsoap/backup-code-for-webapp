
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Users, BookOpen, MessageSquare, FileText } from 'lucide-react';
import useAppStore from '../store/appStore'; // Import the store

function DashboardPage() {
  // Get the state from the store
  const { students, homework, complaints, results } = useAppStore();

  const stats = [
    { icon: Users, label: 'Total Students', value: students.length, color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, label: 'Total Homework Sent', value: homework.length, color: 'from-purple-500 to-pink-500' },
    { icon: MessageSquare, label: 'Total Complaints Logged', value: complaints.length, color: 'from-orange-500 to-red-500' },
    { icon: FileText, label: 'Total Results Updated', value: results.length, color: 'from-green-500 to-emerald-500' },
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
          
          <div className="sm:absolute sm:right-0">
            <select className="w-full sm:w-auto px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300">
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
              <div className="bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,217,61,0.2)] transition-all duration-300 text-center">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
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
