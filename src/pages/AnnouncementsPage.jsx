
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';

const AnnouncementsPage = () => {
  const { toast } = useToast();
  const [broadcastToAll, setBroadcastToAll] = useState(false);
  const [standard, setStandard] = useState('');
  const [section, setSection] = useState('');
  const [message, setMessage] = useState('');

  const standards = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const sections = ['A', 'B', 'C', 'D'];

  const handleSubmit = (e) => {
    e.preventDefault();
    let description = '';
    if (broadcastToAll) {
        description = `Announcement has been sent to ALL Classes.`;
    } else {
        description = `Announcement has been sent to Standard ${standard}, Section ${section}.`;
    }
    toast({
      title: "Announcement Sent Successfully!",
      description: description,
    });
    setBroadcastToAll(false);
    setStandard('');
    setSection('');
    setMessage('');
  };

  return (
    <>
      <Helmet>
        <title>Announcement Bot - Agentra AI</title>
        <meta name="description" content="Send announcements to students." />
      </Helmet>
      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Announcement Bot</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-2 bg-white/10 p-4 rounded-lg">
                <Checkbox id="broadcast" checked={broadcastToAll} onCheckedChange={setBroadcastToAll} className="border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-black" />
                <label
                    htmlFor="broadcast"
                    className="text-sm font-medium leading-none text-white"
                >
                    Broadcast to ALL Classes
                </label>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${broadcastToAll ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                    <label className="block text-xs font-medium text-white/80 mb-2">STANDARD</label>
                    <select
                        value={standard}
                        onChange={(e) => setStandard(e.target.value)}
                        required={!broadcastToAll}
                        disabled={broadcastToAll}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    >
                        <option value="">Select Standard</option>
                        {standards.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-white/80 mb-2">SECTION</label>
                    <select
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        required={!broadcastToAll}
                        disabled={broadcastToAll}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    >
                        <option value="">Select Section</option>
                        {sections.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-white/80 mb-2">ANNOUNCEMENT MESSAGE</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 resize-none"
                    placeholder="Type your announcement here..."
                />
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-black/80 text-white font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all duration-300"
            >
              <Send size={20} className="mr-2" />
              Broadcast Announcement
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default AnnouncementsPage;
