
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2 } from 'lucide-react';

function PromotionPanelPage() {
  const { toast } = useToast();
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', currentStd: '9', currentClass: 'A', promoted: false, nextStd: '10', nextClass: 'A' },
    { id: 2, name: 'Priya Patel', currentStd: '9', currentClass: 'A', promoted: false, nextStd: '10', nextClass: 'A' },
    { id: 3, name: 'Rohan Verma', currentStd: '9', currentClass: 'B', promoted: false, nextStd: '10', nextClass: 'A' },
    { id: 4, name: 'Ananya Singh', currentStd: '8', currentClass: 'A', promoted: false, nextStd: '9', nextClass: 'A' },
    { id: 5, name: 'Arjun Gupta', currentStd: '8', currentClass: 'B', promoted: false, nextStd: '9', nextClass: 'B' },
    { id: 6, name: 'Sneha Reddy', currentStd: '7', currentClass: 'A', promoted: false, nextStd: '8', nextClass: 'A' },
  ]);

  const classes = ['A', 'B', 'C', 'D', 'E'];

  const updateNextClass = (id, value) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, nextClass: value } : student
    ));
  };

  const promoteStudent = (id) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, promoted: true } : student
    ));
    toast({
      title: "Student Promoted!",
      description: "Student has been successfully promoted to next standard.",
    });
  };

  const promoteAll = () => {
    setStudents(students.map(student => ({ ...student, promoted: true })));
    toast({
      title: "All Students Promoted!",
      description: "All students have been successfully promoted.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Promotion Panel - Patanjali School System</title>
        <meta name="description" content="Manage student promotions for the next academic year" />
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-white">Promotion Panel</h1>
          <Button
            onClick={promoteAll}
            className="bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
          >
            <CheckCircle2 size={20} className="mr-2" />
            Promote All Students
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/80 font-medium">Student Name</th>
                <th className="text-left py-3 px-4 text-white/80 font-medium">Current</th>
                <th className="text-left py-3 px-4 text-white/80 font-medium">Promote To</th>
                <th className="text-left py-3 px-4 text-white/80 font-medium">Next Class</th>
                <th className="text-left py-3 px-4 text-white/80 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="py-4 px-4 text-white">{student.name}</td>
                  <td className="py-4 px-4 text-white/70">
                    Std {student.currentStd}-{student.currentClass}
                  </td>
                  <td className="py-4 px-4 text-[#FFD93D] font-semibold">
                    Std {student.nextStd}
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={student.nextClass}
                      onChange={(e) => updateNextClass(student.id, e.target.value)}
                      disabled={student.promoted}
                      className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {classes.map((cls) => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    {student.promoted ? (
                      <span className="text-green-400 font-medium flex items-center gap-2">
                        <CheckCircle2 size={18} />
                        Promoted
                      </span>
                    ) : (
                      <Button
                        onClick={() => promoteStudent(student.id)}
                        size="sm"
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]/50 hover:text-[#FFD93D] transition-all duration-300"
                      >
                        Promote
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
}

export default PromotionPanelPage;
