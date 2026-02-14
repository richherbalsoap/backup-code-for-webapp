
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, X, Upload, User, Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const standards = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const getSortableClassIndex = (classVal) => {
    const standard = classVal.replace('Class ', '');
    const index = standards.indexOf(standard);
    return index === -1 ? Infinity : index;
};

const initialStudents = [
  {
    id: 1,
    name: 'Meet',
    standard: '4',
    section: 'B',
    parentName: 'Jekkeke',
    parentContact: 'Jsmwkskek',
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: 2,
    name: 'Aarav',
    standard: 'UKG',
    section: 'A',
    parentName: 'Mr. Kumar',
    parentContact: '9876543210',
    avatar: null,
  },
  {
    id: 3,
    name: 'Priya',
    standard: '9',
    section: 'A',
    parentName: 'Mr. Sharma',
    parentContact: '9876543210',
    avatar: null,
  },
  {
    id: 4,
    name: 'Rohan',
    standard: '7',
    section: 'C',
    parentName: 'Mrs. Singh',
    parentContact: '8765432109',
    avatar: 'https://github.com/shadcn.png',
  },
];

const StudentModal = ({ isOpen, onClose, onSave, student }) => {
    const [formData, setFormData] = useState(
        student || {
            name: '',
            standard: '',
            section: '',
            parentName: '',
            parentContact: '',
            avatar: null,
        }
    );
    const [fileName, setFileName] = useState('');

    React.useEffect(() => {
        if (student) {
            setFormData(student);
        } else {
            setFormData({ name: '', standard: '', section: '', parentName: '', parentContact: '', avatar: null });
        }
        setFileName('');
    }, [student, isOpen]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSave = () => {
        onSave(formData);
    };

  if (!isOpen) return null;

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
        onClick={onClose}
    >
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-[#1C1C1C] rounded-2xl p-6 sm:p-8 w-full max-w-md border border-yellow-400/20 relative"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">{student ? 'Edit Student' : 'Add Student'}</h2>
            <Button onClick={onClose} className="absolute top-4 right-4 bg-transparent hover:bg-white/10 p-2 h-auto rounded-full">
                <X className="text-white/70" size={20}/>
            </Button>

            <div className="space-y-5">
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-28 h-28 rounded-full bg-gray-700 border-2 border-dashed border-gray-500 flex items-center justify-center overflow-hidden">
                        {formData.avatar ? (
                            <img src={formData.avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <User size={48} className="text-gray-400" />
                        )}
                    </div>
                    <div className="relative">
                         <Button asChild variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white/80">
                            <div>
                                <Upload size={16} className="mr-2"/> Upload Photo
                            </div>
                        </Button>
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                    </div>
                    {fileName && <p className="text-xs text-white/50">{fileName}</p>}
                </div>

                <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-white/5 rounded-lg text-white placeholder:text-white/40 border border-white/10 focus:ring-yellow-400 focus:border-yellow-400" />
                <div className="grid grid-cols-2 gap-4">
                    <Select value={formData.standard} onValueChange={value => setFormData(prev => ({...prev, standard: value}))}>
                        <SelectTrigger className="w-full p-3 bg-white/5 rounded-lg text-white border border-white/10 focus:ring-yellow-400 focus:border-yellow-400">
                            <SelectValue placeholder="Standard" />
                        </SelectTrigger>
                        <SelectContent>
                            {standards.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                     <Select value={formData.section} onValueChange={value => setFormData(prev => ({...prev, section: value}))}>
                        <SelectTrigger className="w-full p-3 bg-white/5 rounded-lg text-white border border-white/10 focus:ring-yellow-400 focus:border-yellow-400">
                            <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent>
                            {['A', 'B', 'C', 'D'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <input type="text" placeholder="Parent's Name" value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full p-3 bg-white/5 rounded-lg text-white placeholder:text-white/40 border border-white/10 focus:ring-yellow-400 focus:border-yellow-400" />
                <input type="text" placeholder="Parent's Contact" value={formData.parentContact} onChange={e => setFormData({...formData, parentContact: e.target.value})} className="w-full p-3 bg-white/5 rounded-lg text-white placeholder:text-white/40 border border-white/10 focus:ring-yellow-400 focus:border-yellow-400" />
                
                <Button onClick={handleSave} className="w-full bg-white text-black font-bold hover:bg-gray-200 py-3">Save Changes</Button>
            </div>
        </motion.div>
    </motion.div>
  );
}

function StudentManagementPage() {
  const [students, setStudents] = useState(initialStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectedSection, setSelectedSection] = useState('All Sections');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    toast({ title: "Success", description: "Student record deleted." });
  };

  const handleSaveStudent = (studentData) => {
    if (studentData.id) { // Editing existing student
      setStudents(students.map(s => s.id === studentData.id ? studentData : s));
      toast({ title: "Success", description: "Student details updated." });
    } else { // Adding new student
      const newStudent = { ...studentData, id: Date.now() };
      setStudents([newStudent, ...students]);
      toast({ title: "Success", description: "New student added." });
    }
    setIsModalOpen(false);
  };
  
  const availableClasses = useMemo(() => [...new Set(students.map(s => `Class ${s.standard}`))].sort((a, b) => getSortableClassIndex(a) - getSortableClassIndex(b)), [students]);
  const availableSections = useMemo(() => [...new Set(students.map(s => s.section))].sort(), [students]);

  const filteredStudents = useMemo(() => {
      return students
          .filter(s => selectedClass === 'All Classes' || `Class ${s.standard}` === selectedClass)
          .filter(s => selectedSection === 'All Sections' || s.section === selectedSection)
          .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [students, selectedClass, selectedSection, searchTerm]);

  const groupedStudents = useMemo(() => {
      const groups = filteredStudents.reduce((acc, student) => {
          const classKey = `Class ${student.standard}`;
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
        <title>Student Management - Patanjali School System</title>
      </Helmet>
      
      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Manage Student Records</h1>
            <Button onClick={handleAddStudent} className="bg-black text-white hover:bg-gray-800 border border-white/20">
                <Plus size={20} className="mr-2" />
                Add Student
            </Button>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full mx-auto space-y-4"
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
                     <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 bg-white/10 border-white/20 border rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"/>
                </div>
            </div>
        </motion.div>

        <AnimatePresence>
          {filteredStudents.length > 0 ? (
              Object.keys(groupedStudents).map(classGroup => (
                  <motion.div key={classGroup} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                      <h2 className="text-white text-2xl font-bold mb-4 px-2">{classGroup}</h2>
                      <div 
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        {groupedStudents[classGroup].map(student => (
                          <motion.div 
                              key={student.id} 
                              className="bg-transparent backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-4 flex flex-col"
                              layout
                          >
                            <div className="flex items-center gap-4 flex-grow">
                              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
                                {student.avatar ? (
                                   <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                ) : (
                                   student.name.charAt(0).toUpperCase()
                                )}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white">{student.name}</h3>
                                <div className="flex gap-2 text-xs mt-1">
                                  <span className="bg-white/10 text-white/80 px-2 py-0.5 rounded">Section {student.section}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white/5 p-4 rounded-lg space-y-2 text-white/80 text-sm mt-4">
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-white/50" />
                                    <span>Parent: {student.parentName}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-white/50" />
                                    <span>{student.parentContact}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4">
                              <Button onClick={() => handleEditStudent(student)} variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white">
                                <Edit size={16} className="mr-2"/>
                                Edit
                              </Button>
                              <Button onClick={() => handleDeleteStudent(student.id)} variant="destructive" className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400">
                                <Trash2 size={16} className="mr-2"/>
                                Delete
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                  </motion.div>
              ))
            ) : (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-16">
                  <p className="text-white/50 text-lg">No students found.</p>
                  <p className="text-white/40">Try adjusting your filters or add a new student.</p>
              </motion.div>
            )
          }
        </AnimatePresence>
      </div>

      <AnimatePresence>
        <StudentModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSave={handleSaveStudent} 
            student={editingStudent} 
        />
      </AnimatePresence>
    </>
  );
}

export default StudentManagementPage;
