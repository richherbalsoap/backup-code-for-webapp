
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Repeat, Trash2, TrendingUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';

const PromotionPanelPage = () => {
    const { toast } = useToast();
    // Initial student data, now including a unique string ID
    const [students, setStudents] = useState([
        { id: '24c511fd', name: 'Nsns', class: 7, section: 'D', promoted: false },
        { id: '87c68c28', name: 'Meet', class: 4, section: 'B', promoted: false },
        { id: 'a3d9f0e1', name: 'Priya', class: 9, section: 'A', promoted: false },
        { id: 'b5e8a1d3', name: 'Rohan', class: 11, section: 'C', promoted: false },
    ]);

    const [selectedClass, setSelectedClass] = useState('All Classes');

    const handlePromote = (id) => {
        const student = students.find(s => s.id === id);
        if (student) {
            toast({
                title: "Student Promoted!",
                description: `${student.name} has been promoted to Class ${student.class + 1}.`,
            });
            // For this example, we'll remove the student from the list upon action.
            setStudents(students.filter(s => s.id !== id));
        }
    };
    
    const handleDelete = (id) => {
        const student = students.find(s => s.id === id);
        if (student) {
            toast({
                title: "Student Deleted",
                description: `${student.name} has been removed.`,
                variant: 'destructive',
            });
            setStudents(students.filter(s => s.id !== id));
        }
    };
    
    const handleRepeat = (id) => {
        const student = students.find(s => s.id === id);
        if (student) {
            toast({
                title: "Student to Repeat",
                description: `${student.name} will repeat Class ${student.class}.`,
            });
             setStudents(students.filter(s => s.id !== id));
        }
    };
    
    const filteredStudents = selectedClass === 'All Classes' 
        ? students 
        : students.filter(s => `Class ${s.class}` === selectedClass);

    // Get unique classes from students for the dropdown
    const availableClasses = [...new Set(students.map(s => `Class ${s.class}`))].sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));

    return (
        <>
            <Helmet>
                <title>Promotion Panel - Agentra AI</title>
                <meta name="description" content="Manage student promotions for the new academic year" />
            </Helmet>
            <div className="space-y-4 px-4 pb-10 relative z-10">
                <div className="text-center pt-4">
                    <h1 className="text-3xl font-bold text-white">Promotion Panel</h1>
                    <p className="text-white/70">Manage student promotions for the new academic year</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md mx-auto space-y-6"
                >
                    <div>
                        <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">SELECT CLASS:</label>
                        <div className="relative">
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full appearance-none px-4 py-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                            >
                                <option>All Classes</option>
                                {availableClasses.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                        </div>
                    </div>
                    
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-lg transition-all duration-300 text-base">
                        <TrendingUp size={20} className="mr-2" />
                        Bulk Promote Class
                    </Button>
                </motion.div>

                <div className="space-y-4 max-w-md mx-auto">
                    {filteredStudents.map((student, index) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-xl text-white">{student.name}</h3>
                                    <p className="text-xs text-white/50">ID: {student.id}...</p>
                                </div>
                                <div className="text-right flex-shrink-0 pl-4">
                                    <p className="font-bold text-white">Class {student.class}</p>
                                    <p className="text-sm text-white/60">Sec {student.section}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Button onClick={() => handlePromote(student.id)} className="w-full bg-green-400/20 hover:bg-green-400/30 text-green-300 font-bold py-2 rounded-lg border border-green-400/30 text-sm">
                                    <CheckCircle size={16} className="mr-2" />
                                    Promote to Class {student.class + 1}
                                 </Button>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button onClick={() => handleRepeat(student.id)} className="w-full bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 font-bold py-2 rounded-lg border border-yellow-400/30 text-sm">
                                        <Repeat size={16} className="mr-2" />
                                        Repeat
                                    </Button>
                                    <Button onClick={() => handleDelete(student.id)} className="w-full bg-red-400/20 hover:bg-red-400/30 text-red-300 font-bold py-2 rounded-lg border border-red-400/30 text-sm">
                                        <Trash2 size={16} className="mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                     {filteredStudents.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-white/50">No students to display for this class.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PromotionPanelPage;
