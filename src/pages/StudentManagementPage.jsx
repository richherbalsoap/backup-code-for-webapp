
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Edit, Trash2 } from 'lucide-react';

function StudentManagementPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    standard: '',
    class: '',
    parentNumber: '',
  });

  const standards = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const classes = ['A', 'B', 'C', 'D', 'E'];

  const students = [
    { id: 1, name: 'Aarav Sharma', standard: '10', class: 'A', parent: '+91 98765 43210', photo: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=FFD93D&color=0F0F0F' },
    { id: 2, name: 'Priya Patel', standard: '9', class: 'B', parent: '+91 98765 43211', photo: 'https://ui-avatars.com/api/?name=Priya+Patel&background=4F46E5&color=fff' },
    { id: 3, name: 'Rohan Verma', standard: '10', class: 'A', parent: '+91 98765 43212', photo: 'https://ui-avatars.com/api/?name=Rohan+Verma&background=8B5CF6&color=fff' },
    { id: 4, name: 'Ananya Singh', standard: '8', class: 'C', parent: '+91 98765 43213', photo: 'https://ui-avatars.com/api/?name=Ananya+Singh&background=EC4899&color=fff' },
    { id: 5, name: 'Arjun Gupta', standard: '11', class: 'B', parent: '+91 98765 43214', photo: 'https://ui-avatars.com/api/?name=Arjun+Gupta&background=10B981&color=fff' },
    { id: 6, name: 'Sneha Reddy', standard: '9', class: 'A', parent: '+91 98765 43215', photo: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=F59E0B&color=fff' },
    { id: 7, name: 'Kabir Khan', standard: '7', class: 'D', parent: '+91 98765 43216', photo: 'https://ui-avatars.com/api/?name=Kabir+Khan&background=EF4444&color=fff' },
    { id: 8, name: 'Diya Joshi', standard: '10', class: 'B', parent: '+91 98765 43217', photo: 'https://ui-avatars.com/api/?name=Diya+Joshi&background=06B6D4&color=fff' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Student Added Successfully!",
      description: `${formData.name} has been added to the system.`,
    });
    setFormData({ name: '', standard: '', class: '', parentNumber: '' });
  };

  const handleEdit = (student) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleDelete = (student) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Student Management - Patanjali School System</title>
        <meta name="description" content="Manage students, add new students, and view student information" />
      </Helmet>

      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Student Management</h1>

        {/* Add Student Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#FFD93D] mb-6">Add New Student</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Student Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                placeholder="Enter student name"
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

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Parent Number
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Photo Upload
              </label>
              <Button
                type="button"
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all duration-300"
              >
                <Upload size={18} className="mr-2" />
                Upload Photo
              </Button>
            </div>

            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
              >
                Add Student
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Student List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-[#FFD93D] mb-6">Student List</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((student) => (
              <motion.div
                key={student.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:shadow-[0_0_20px_rgba(255,217,61,0.2)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-12 h-12 rounded-full border-2 border-[#FFD93D]/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{student.name}</h3>
                    <p className="text-white/60 text-sm">Std {student.standard} - {student.class}</p>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-3">{student.parent}</p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(student)}
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(student)}
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/5 border-white/10 text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default StudentManagementPage;
