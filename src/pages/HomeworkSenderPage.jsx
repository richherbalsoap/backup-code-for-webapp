
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';

function HomeworkSenderPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    standard: '',
    class: '',
    subject: '',
    homework: '',
    dueDate: '',
  });

  const standards = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const classes = ['A', 'B', 'C', 'D', 'E'];
  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Homework Sent Successfully!",
      description: `Homework for ${formData.standard}-${formData.class} has been sent to all parents.`,
    });
    setFormData({ standard: '', class: '', subject: '', homework: '', dueDate: '' });
  };

  return (
    <>
      <Helmet>
        <title>Homework Sender - Patanjali School System</title>
        <meta name="description" content="Send homework assignments to students and parents" />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Homework Sender</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Standard
                </label>
                <select
                  value={formData.standard}
                  onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Standard</option>
                  {standards.map((std) => (
                    <option key={std} value={std}>{std}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Class
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Homework Details
              </label>
              <textarea
                value={formData.homework}
                onChange={(e) => setFormData({ ...formData, homework: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300 resize-none"
                placeholder="Enter homework details here..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
            >
              <Send size={20} className="mr-2" />
              Send Homework to All Parents
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default HomeworkSenderPage;
