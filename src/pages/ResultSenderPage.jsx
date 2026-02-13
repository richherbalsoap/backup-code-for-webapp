
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Upload, Award } from 'lucide-react';

function ResultSenderPage() {
  const { toast } = useToast();
  const [standard, setStandard] = useState('');
  const [classSection, setClassSection] = useState('');
  const [student, setStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [obtainedMarks, setObtainedMarks] = useState('');
  const [totalMarks, setTotalMarks] = useState('100');
  const [resultPhoto, setResultPhoto] = useState(null);

  const standards = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const classes = ['A', 'B', 'C', 'D', 'E'];
  const students = ['Rohan', 'Priya', 'Amit', 'Sneha', 'Vikas']; // Example data
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Hindi']; // Example data


  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResultPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!standard || !classSection || !student || !subject || !obtainedMarks || !totalMarks) {
        toast({
            title: "Incomplete Form",
            description: "Please fill all the required fields.",
            variant: "destructive",
        });
        return;
    }
    toast({
      title: "Result Published!",
      description: `Result for ${student} in ${subject} has been published.`,
    });
    // Reset form
    setStandard('');
    setClassSection('');
    setStudent('');
    setSubject('');
    setObtainedMarks('');
    setTotalMarks('100');
    setResultPhoto(null);
  };

  return (
    <>
      <Helmet>
        <title>Publish Exam Results - Patanjali School System</title>
      </Helmet>

      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Publish Exam Results</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">STANDARD</label>
                <select
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Standard</option>
                  {standards.map((std) => <option key={std} value={std}>{std}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">CLASS SECTION</label>
                <select
                  value={classSection}
                  onChange={(e) => setClassSection(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                >
                  <option value="">Select Section</option>
                  {classes.map((cls) => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">STUDENT</label>
              <select
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
              >
                <option value="">Select Student</option>
                {students.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">SUBJECT</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">OBTAINED MARKS</label>
                    <input
                        type="number"
                        value={obtainedMarks}
                        onChange={(e) => setObtainedMarks(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">TOTAL MARKS</label>
                    <input
                        type="number"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                        placeholder="100"
                    />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">RESULT PHOTO (OPTIONAL)</label>
              <div className="relative w-full h-32 border-2 border-dashed border-white/20 rounded-lg flex flex-col justify-center items-center text-white/50 hover:border-white/40 transition-colors duration-300">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {resultPhoto ? (
                  <div className="text-center text-white">
                      <p className="font-semibold">{resultPhoto.name}</p>
                      <p className="text-xs text-white/60">Click again or drop to replace</p>
                  </div>
                ) : (
                  <div className="text-center">
                      <Upload size={32} className="mx-auto mb-2" />
                      <p>Click to upload result Image</p>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-black font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Award size={20} />
              Publish Result
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default ResultSenderPage;
