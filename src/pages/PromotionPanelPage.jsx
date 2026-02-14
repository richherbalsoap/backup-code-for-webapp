
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Repeat, Trash2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const getSortableClassIndex = (classVal) => {
    const standard = classVal.replace('Class ', '');
    const index = standards.indexOf(standard);
    return index === -1 ? Infinity : index;
};

const getNextStandard = (currentStandard) => {
    const currentIndex = standards.indexOf(currentStandard);
    if (currentIndex > -1 && currentIndex < standards.length - 1) {
        return standards[currentIndex + 1];
    }
    return null; // or handle as graduation
};


const PromotionPanelPage = () => {
    const { toast } = useToast();
    const [students, setStudents] = useState([
        { id: '24c511fd', name: 'Nsns', class: '7', section: 'D' },
        { id: '87c68c28', name: 'Meet', class: '4', section: 'B' },
        { id: 'a3d9f0e1', name: 'Priya', class: '9', section: 'A' },
        { id: 'b5e8a1d3', name: 'Rohan', class: '11', section: 'C' },
        { id: 'c8f2b4e7', name: 'Sanjay', class: '7', section: 'A' },
        { id: 'd1e3c5a9', name: 'Alia', class: 'UKG', section: 'B' },
    ]);

    const [selectedClass, setSelectedClass] = useState('All Classes');
    const [selectedSection, setSelectedSection] = useState('All Sections');
    const [searchTerm, setSearchTerm] = useState('');

    const handleAction = (id, action) => {
        const student = students.find(s => s.id === id);
        if (!student) return;

        let title, description;
        switch(action) {
            case 'promote':
                const nextClass = getNextStandard(student.class);
                title = "Student Promoted!";
                description = nextClass ? `${student.name} has been promoted to Class ${nextClass}.` : `${student.name} has graduated.`;
                break;
            case 'delete':
                title = "Student Deleted";
                description = `${student.name} has been removed.`;
                break;
            case 'repeat':
                title = "Student to Repeat";
                description = `${student.name} will repeat Class ${student.class}.`;
                break;
            default: return;
        }

        toast({
            title,
            description,
            variant: action === 'delete' ? 'destructive' : 'default',
        });
        
        setStudents(students.filter(s => s.id !== id));
    };

    const availableClasses = useMemo(() => [...new Set(students.map(s => `Class ${s.class}`))].sort((a, b) => getSortableClassIndex(a) - getSortableClassIndex(b)), [students]);
    const availableSections = useMemo(() => [...new Set(students.map(s => s.section))].sort(), [students]);

    const filteredStudents = useMemo(() => {
        return students
            .filter(s => selectedClass === 'All Classes' || `Class ${s.class}` === selectedClass)
            .filter(s => selectedSection === 'All Sections' || s.section === selectedSection)
            .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [students, selectedClass, selectedSection, searchTerm]);

    const groupedStudents = useMemo(() => {
        const groups = filteredStudents.reduce((acc, student) => {
            const classKey = `Class ${student.class}`;
            if (!acc[classKey]) {
                acc[classKey] = [];
            }
            acc[classKey].push(student);
            return acc;
        }, {});
        return Object.keys(groups).sort((a, b) => getSortableClassIndex(a) - getSortableClassIndex(b)).reduce((acc, key) => {
            acc[key] = groups[key];
            return acc;
        }, {});
    }, [filteredStudents]);

    return (
        <>
            <Helmet>
                <title>Student Management - Patanjali School</title>
                <meta name="description" content="Filter, manage, and promote students for the new academic year" />
            </Helmet>
            <div className="space-y-4 px-4 pb-10 relative z-10">
                <div className="text-center pt-4">
                    <h1 className="text-3xl font-bold text-white">Student Management</h1>
                    <p className="text-white/70">Manage student promotions for the new academic year</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">CLASS</label>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger className="w-full px-4 py-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                                    <SelectValue placeholder="All Classes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Classes">All Classes</SelectItem>
                                    {availableClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                             <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">SECTION</label>
                             <Select value={selectedSection} onValueChange={setSelectedSection}>
                                <SelectTrigger className="w-full px-4 py-3 bg-white/10 border-white/20 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                                    <SelectValue placeholder="All Sections" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Sections">All Sections</SelectItem>
                                    {availableSections.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-wider text-white/60 mb-2">STUDENT NAME</label>
                             <input type="text" placeholder="Search student..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 bg-white/10 border-white/20 border rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"/>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {Object.keys(groupedStudents).map(classGroup => (
                        <div key={classGroup}>
                            <h2 className="text-white text-xl font-bold mb-3 px-2">{classGroup}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {groupedStudents[classGroup].map((student, index) => {
                                    const nextClass = getNextStandard(student.class);
                                    return (
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
                                                    <p className="text-xs text-white/50">ID: {student.id}</p>
                                                </div>
                                                <div className="text-right flex-shrink-0 pl-4">
                                                     <p className="font-bold text-white">Section {student.section}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Button onClick={() => handleAction(student.id, 'promote')} className="w-full bg-green-400/20 hover:bg-green-400/30 text-green-300 font-bold py-2 rounded-lg border border-green-400/30 text-sm">
                                                    <CheckCircle size={16} className="mr-2" />
                                                    {nextClass ? `Promote to Class ${nextClass}` : 'Graduate'}
                                                </Button>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button onClick={() => handleAction(student.id, 'repeat')} className="w-full bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 font-bold py-2 rounded-lg border border-yellow-400/30 text-sm">
                                                        <Repeat size={16} className="mr-2" />
                                                        Repeat
                                                    </Button>
                                                    <Button onClick={() => handleAction(student.id, 'delete')} className="w-full bg-red-400/20 hover:bg-red-400/30 text-red-300 font-bold py-2 rounded-lg border border-red-400/30 text-sm">
                                                        <Trash2 size={16} className="mr-2" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {filteredStudents.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-white/50 text-lg">No students found.</p>
                            <p className="text-white/40">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PromotionPanelPage;
