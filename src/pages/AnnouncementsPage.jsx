
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';

function AnnouncementsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: '',
    priority: '',
  });

  const targetOptions = ['All Students', 'Specific Class', 'Specific Standard', 'All Parents', 'All Staff'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Announcement Sent Successfully!",
      description: `"${formData.title}" has been sent to ${formData.targetAudience}.`,
    });
    setFormData({ title: '', message: '', targetAudience: '', priority: '' });
  };

  return (
    <>
      <Helmet>
        <title>Announcements - Patanjali School System</title>
        <meta name="description" content="Send announcements and notifications to students and parents" />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Announcements</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Announcement Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                  placeholder="Enter announcement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Target Audience
                </label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Target Audience</option>
                  {targetOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Priority</option>
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Announcement Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={8}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300 resize-none"
                placeholder="Enter your announcement message here..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
            >
              <Send size={20} className="mr-2" />
              Send Announcement
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default AnnouncementsPage;
