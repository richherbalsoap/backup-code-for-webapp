
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const FeesReminderPage = () => {
  const { toast } = useToast();
  const [standard, setStandard] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [student, setStudent] = useState('');
  const [message, setMessage] = useState('');

  const classes = ['A', 'B', 'C', 'D', 'E'];
  const students = ['Rohan Gupta', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikas Verma']; // Example student data

  const quickTemplates = [
    `Fees due on ${new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString()}`,
    'Please submit fees for February',
    'Fees pending. Please clear immediately.',
    'Fees received. Thank you!',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!standard || !selectedClass || !student || !message) {
        toast({
            title: "Incomplete Information",
            description: "Please select standard, class, student and enter a message.",
            variant: "destructive",
        });
        return;
    }
    toast({
      title: "Fees Reminder Sent!",
      description: `Reminder has been sent to the parent of ${student}.`,
    });
    // Reset form
    setStandard('');
    setSelectedClass('');
    setStudent('');
    setMessage('');
  };

  return (
    <>
      <Helmet>
        <title>Fees Reminder - Patanjali School System</title>
        <meta name="description" content="Send fees reminders to parents" />
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">Fees Reminder</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">STANDARD *</label>
                <select
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Standard</option>
                  {standards.map(std => <option key={std} value={std}>{std}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">CLASS *</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">SELECT STUDENT *</label>
              <select
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
              >
                <option value="">Choose student</option>
                {students.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">QUICK TEMPLATES</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {quickTemplates.map(template => (
                  <Button
                    key={template}
                    type="button"
                    variant="outline"
                    onClick={() => setMessage(template)}
                    className="text-xs text-center bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">MESSAGE *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300 resize-none"
                placeholder="Type your message..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
            >
              <DollarSign size={20} />
              Send Reminder
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default FeesReminderPage;
