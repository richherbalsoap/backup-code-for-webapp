
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send, Plus, Trash2 } from 'lucide-react';

function ResultSenderPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentName: '',
    standard: '',
    class: '',
    examType: '',
    parentNumber: '',
  });

  const [marks, setMarks] = useState([
    { subject: 'Mathematics', obtained: '', total: '100' },
    { subject: 'Science', obtained: '', total: '100' },
    { subject: 'English', obtained: '', total: '100' },
  ]);

  const standards = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const classes = ['A', 'B', 'C', 'D', 'E'];
  const examTypes = ['Unit Test 1', 'Unit Test 2', 'Mid-Term Exam', 'Final Exam', 'Annual Exam'];

  const addSubject = () => {
    setMarks([...marks, { subject: '', obtained: '', total: '100' }]);
  };

  const removeSubject = (index) => {
    setMarks(marks.filter((_, i) => i !== index));
  };

  const updateMark = (index, field, value) => {
    const newMarks = [...marks];
    newMarks[index][field] = value;
    setMarks(newMarks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Result Sent Successfully!",
      description: `Result for ${formData.studentName} has been sent to parent.`,
    });
    setFormData({ studentName: '', standard: '', class: '', examType: '', parentNumber: '' });
    setMarks([
      { subject: 'Mathematics', obtained: '', total: '100' },
      { subject: 'Science', obtained: '', total: '100' },
      { subject: 'English', obtained: '', total: '100' },
    ]);
  };

  return (
    <>
      <Helmet>
        <title>Result Sender - Patanjali School System</title>
        <meta name="description" content="Send exam results and report cards to parents" />
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Result Sender</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Parent Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.parentNumber}
                  onChange={(e) => setFormData({ ...formData, parentNumber: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Exam Type
                </label>
                <select
                  value={formData.examType}
                  onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Exam Type</option>
                  {examTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/80">
                  Subject-wise Marks
                </label>
                <Button
                  type="button"
                  onClick={addSubject}
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Plus size={16} className="mr-1" />
                  Add Subject
                </Button>
              </div>

              {marks.map((mark, index) => (
                <div key={index} className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 sm:col-span-5">
                    <input
                      type="text"
                      value={mark.subject}
                      onChange={(e) => updateMark(index, 'subject', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                      placeholder="Subject name"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <input
                      type="number"
                      value={mark.obtained}
                      onChange={(e) => updateMark(index, 'obtained', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                      placeholder="Obtained"
                    />
                  </div>
                  <div className="col-span-5 sm:col-span-3">
                    <input
                      type="number"
                      value={mark.total}
                      onChange={(e) => updateMark(index, 'total', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                      placeholder="Total"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                    {marks.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeSubject(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
            >
              <Send size={20} className="mr-2" />
              Send Result to Parent
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default ResultSenderPage;
