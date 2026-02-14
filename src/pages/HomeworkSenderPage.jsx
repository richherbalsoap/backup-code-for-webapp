
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send, Calendar, BookOpen, ChevronDown } from 'lucide-react';

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D', 'E'];
const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];

const HomeworkSenderPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    standard: '',
    section: '',
    subject: '',
    homework: '',
    dueDate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.standard || !formData.section || !formData.subject || !formData.homework) {
        toast({ 
            title: "Incomplete Information", 
            description: "Please fill out all the fields before sending.",
            variant: "destructive"
        });
        return;
    }
    toast({ 
      title: "Homework Sent Successfully!", 
      description: `Homework for ${formData.standard} - ${formData.section} has been sent to all parents.` 
    });
    // Reset form
    setFormData({ standard: '', section: '', subject: '', homework: '', dueDate: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  return (
    <>
      <Helmet>
        <title>Homework Sender - EDULinker</title>
        <meta name="description" content="Send homework assignments to students and parents" />
      </Helmet>
      
      <div className="space-y-6 px-4 pb-10 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Homework Sender</h1>
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">STANDARD</label>
              <select 
                value={formData.standard} 
                onChange={e => handleInputChange('standard', e.target.value)}
                className="w-full appearance-none p-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" disabled>Select Standard</option>
                {standards.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-5 h-5 text-white/50 pointer-events-none" />
            </div>

            <div className="relative">
              <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">CLASS SECTION</label>
              <select 
                value={formData.section} 
                onChange={e => handleInputChange('section', e.target.value)}
                className="w-full appearance-none p-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="" disabled>Select Section</option>
                {sections.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-5 h-5 text-white/50 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">SUBJECT</label>
            <select 
              value={formData.subject} 
              onChange={e => handleInputChange('subject', e.target.value)}
              className="w-full appearance-none p-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="" disabled>Select Subject</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 bottom-3 w-5 h-5 text-white/50 pointer-events-none" />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">HOMEWORK DETAILS</label>
            <textarea 
              value={formData.homework} 
              onChange={e => handleInputChange('homework', e.target.value)}
              placeholder="Enter homework description..."
              className="w-full p-3 h-32 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 resize-y"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">DUE DATE (OPTIONAL)</label>
            <input 
              type="date" 
              value={formData.dueDate} 
              onChange={e => handleInputChange('dueDate', e.target.value)}
              className="w-full p-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 custom-date-input"
            />
          </div>

          <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base py-3 rounded-lg transition-all duration-300 shadow-lg shadow-yellow-400/20">
            <Send size={20} className="mr-2"/>
            Send Homework
          </Button>
        </motion.form>
      </div>
    </>
  );
}

export default HomeworkSenderPage;
