
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

function ComplaintSenderPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentName: '',
    standard: '',
    class: '',
    description: '',
  });

  const classes = ['A', 'B', 'C', 'D', 'E'];
  const students = ['Rohan', 'Priya', 'Amit', 'Sneha', 'Vikas']; // Example student list

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.standard || !formData.class || !formData.studentName || !formData.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Complaint Registered!",
      description: `Your complaint regarding ${formData.studentName} has been submitted.`,
    });
    setFormData({ studentName: '', standard: '', class: '', description: '' });
  };

  return (
    <>
      <Helmet>
        <title>Log a Complaint - Patanjali School System</title>
        <meta name="description" content="Log a complaint about a student." />
      </Helmet>

      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Log a Complaint</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  STANDARD *
                </label>
                <Select value={formData.standard} onValueChange={value => setFormData({ ...formData, standard: value })}>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300">
                        <SelectValue placeholder="Select Standard" />
                    </SelectTrigger>
                    <SelectContent>
                        {standards.map((std) => <SelectItem key={std} value={std}>{std}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  CLASS *
                </label>
                <Select value={formData.class} onValueChange={value => setFormData({ ...formData, class: value })}>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300">
                        <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map((cls) => <SelectItem key={cls} value={cls}>{cls}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                STUDENT NAME *
              </label>
                <Select value={formData.studentName} onValueChange={value => setFormData({ ...formData, studentName: value })}>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300">
                        <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                        {students.map((student) => <SelectItem key={student} value={student}>{student}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                COMPLAINT DETAILS *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300 resize-none"
                placeholder="Describe the issue clearly..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              <AlertTriangle size={20} className="mr-2" />
              Send Complaint
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default ComplaintSenderPage;
