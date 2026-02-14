
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Bell, BarChart2, Settings, User, FileText, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const mainFeatures = [
    { name: 'Student Management', icon: User, color: 'text-cyan-400', path: '/student-management' },
    { name: 'Homework Sender', icon: BookOpen, color: 'text-blue-400', path: '/homework-sender' },
    { name: 'Result Sender', icon: FileText, color: 'text-green-400', path: '/result-sender' },
    { name: 'Complaint Sender', icon: MessageSquare, color: 'text-red-400', path: '/complaint-sender' },
  ];
  
  const secondaryFeatures = [
    { name: 'Announcements', icon: Bell, color: 'text-yellow-400', path: '/announcements' },
    { name: 'Fees Reminder', icon: Send, color: 'text-indigo-400', path: '/fees-reminder' },
    { name: 'Analytics', icon: BarChart2, color: 'text-purple-400', path: '/analytics' },
    { name: 'Settings', icon: Settings, color: 'text-gray-400', path: '/settings' },
  ]

  const FeatureCard = ({ feature, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors cursor-pointer"
      onClick={() => navigate(feature.path)}
    >
      <feature.icon size={40} className={`${feature.color} mb-3`} />
      <h2 className="text-md sm:text-lg font-semibold text-white">{feature.name}</h2>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>Dashboard - Patanjali School System</title>
      </Helmet>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, Administrator</h1>
          <p className="text-white/70 mt-1">Here's a quick overview of your school system.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {mainFeatures.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
          ))}
        </motion.div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button onClick={() => navigate('/homework-sender')} className="bg-blue-500 hover:bg-blue-600 text-white">Send Homework</Button>
                <Button onClick={() => navigate('/announcements')} className="bg-yellow-500 hover:bg-yellow-600 text-white">Announcement</Button>
                <Button onClick={() => navigate('/complaint-sender')} className="bg-red-500 hover:bg-red-600 text-white">Log Complaint</Button>
                <Button onClick={() => navigate('/student-management')} className="bg-cyan-500 hover:bg-cyan-600 text-white">Add Student</Button>
            </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">More Tools</h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {secondaryFeatures.map((feature, index) => (
              <FeatureCard key={feature.name} feature={feature} index={index + mainFeatures.length} />
            ))}
          </motion.div>
        </div>

      </div>
    </>
  );
}

export default HomePage;
