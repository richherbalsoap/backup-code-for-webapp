
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import useAppStore from '../store/appStore';
import { BookOpen, Upload, Paperclip } from 'lucide-react';

function HomeworkSender() {
  const { addHomework } = useAppStore();
  const [standard, setStandard] = useState('');
  const [section, setSection] = useState('');
  const [instructions, setInstructions] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!standard || !section || !instructions) return;

    const newHomework = {
      id: Date.now(),
      standard,
      section,
      instructions,
      fileName: file ? file.name : null,
    };

    addHomework(newHomework);

    // Reset form
    setStandard('');
    setSection('');
    setInstructions('');
    setFile(null);
  };

  return (
    <>
      <Helmet>
        <title>Homework Sender - Patanjali School System</title>
      </Helmet>

      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Homework Sender</h1>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-transparent backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-6 max-w-3xl mx-auto"
        >
          {/* Standard and Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">STANDARD</label>
              <select value={standard} onChange={(e) => setStandard(e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition">
                <option value="">Select Standard</option>
                {[...Array(12).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">CLASS SECTION</label>
              <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition">
                <option value="">Select Section</option>
                {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">ATTACHMENT</label>
            <div className="relative w-full h-40 border-2 border-dashed border-white/20 rounded-lg flex flex-col justify-center items-center text-white/50 hover:border-white/40 transition-colors duration-300">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg"
              />
              {file ? (
                <div className="text-center text-white">
                    <Paperclip className="mx-auto mb-2"/>
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-xs text-white/60">Click again or drop to replace</p>
                </div>
              ) : (
                <div className="text-center">
                    <Upload size={32} className="mx-auto mb-2" />
                    <p>Drop file here or <span className="font-semibold text-[#FFD93D]">click to upload</span></p>
                    <p className="text-xs mt-1">Supports: PDF, PNG, JPG</p>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-white/70 mb-2">INSTRUCTIONS</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full h-32 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition"
              placeholder="Write detailed instructions for the students..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full px-6 py-3 bg-[#FFD93D] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_15px_rgba(255,217,61,0.4)] hover:shadow-[0_0_25px_rgba(255,217,61,0.6)] flex items-center justify-center gap-2">
            <BookOpen size={20} />
            Distribute Homework
          </button>
        </motion.form>
      </div>
    </>
  );
}

export default HomeworkSender;
