
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { TrendingUp, TrendingDown } from 'lucide-react';

function AnalyticsPage() {
  const classPerformance = [
    { class: '10-A', avgScore: 85, students: 42, trend: 'up' },
    { class: '10-B', avgScore: 78, students: 40, trend: 'up' },
    { class: '9-A', avgScore: 82, students: 38, trend: 'down' },
    { class: '9-B', avgScore: 76, students: 35, trend: 'up' },
    { class: '8-A', avgScore: 88, students: 36, trend: 'up' },
    { class: '8-B', avgScore: 74, students: 34, trend: 'down' },
  ];

  const subjectData = [
    { subject: 'Mathematics', avgScore: 82, color: 'bg-blue-500' },
    { subject: 'Science', avgScore: 78, color: 'bg-green-500' },
    { subject: 'English', avgScore: 85, color: 'bg-purple-500' },
    { subject: 'Hindi', avgScore: 75, color: 'bg-yellow-500' },
    { subject: 'Social Studies', avgScore: 80, color: 'bg-pink-500' },
  ];

  return (
    <>
      <Helmet>
        <title>Analytics - Patanjali School System</title>
        <meta name="description" content="View school performance analytics and statistics" />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
          >
            <p className="text-white/60 text-sm mb-2">Overall Average</p>
            <p className="text-4xl font-bold text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.5)]">
              80.5%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
          >
            <p className="text-white/60 text-sm mb-2">Top Performing Class</p>
            <p className="text-4xl font-bold text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.5)]">
              8-A
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
          >
            <p className="text-white/60 text-sm mb-2">Total Exams Conducted</p>
            <p className="text-4xl font-bold text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.5)]">
              156
            </p>
          </motion.div>
        </div>

        {/* Subject Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#FFD93D] mb-6">Subject-wise Performance</h2>
          
          <div className="space-y-4">
            {subjectData.map((subject, index) => (
              <div key={subject.subject}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{subject.subject}</span>
                  <span className="text-[#FFD93D] font-semibold">{subject.avgScore}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.avgScore}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className={`h-full ${subject.color} shadow-lg`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Class-wise Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#FFD93D] mb-6">Class-wise Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classPerformance.map((cls, index) => (
              <motion.div
                key={cls.class}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:shadow-[0_0_20px_rgba(255,217,61,0.2)] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold text-lg">Class {cls.class}</h3>
                  {cls.trend === 'up' ? (
                    <TrendingUp className="text-green-400" size={20} />
                  ) : (
                    <TrendingDown className="text-red-400" size={20} />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-white/60 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-[#FFD93D]">{cls.avgScore}%</p>
                  <p className="text-white/50 text-xs">{cls.students} students</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default AnalyticsPage;
