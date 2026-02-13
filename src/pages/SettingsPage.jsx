
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Mail, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function SettingsPage() {
  const { toast } = useToast();
  const { userName, updateUserName } = useAuth();
  const [passwords, setPasswords] = useState({
    new: '',
    confirm: '',
  });
  const [email, setEmail] = useState('');
  const [newName, setNewName] = useState(userName);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirm password must be the same.",
        variant: "destructive",
      });
      return;
    }
    if (!passwords.new) {
        toast({
            title: "Password cannot be empty",
            variant: "destructive",
        });
        return;
    }
    toast({
      title: "Password Changed Successfully!",
      description: "Your password has been updated.",
    });
    setPasswords({ new: '', confirm: '' });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email cannot be empty",
        description: "Please enter a new email address.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Email Change Request Sent",
      description: `A confirmation link has been sent to ${email}.`,
    });
    setEmail('');
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast({
        title: "Name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    updateUserName(newName);
    toast({
      title: "Name Updated Successfully!",
      description: `Your name has been changed to ${newName}.`,
    });
  };


  return (
    <>
      <Helmet>
        <title>Settings - EDULinker</title>
        <meta name="description" content="Manage your account settings and preferences" />
      </Helmet>

      <div className="space-y-6 relative z-10">
        <h1 className="text-3xl font-bold text-white text-center">Settings</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FFD93D]/20 flex items-center justify-center">
              <User size={20} className="text-[#FFD93D]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Change Name</h2>
          </div>

          <form onSubmit={handleNameSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                New Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                placeholder="Enter your new name"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
            >
              Update Name
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FFD93D]/20 flex items-center justify-center">
              <Lock size={20} className="text-[#FFD93D]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                placeholder="Confirm new password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
            >
              Update Password
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-xl p-6 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FFD93D]/20 flex items-center justify-center">
              <Mail size={20} className="text-[#FFD93D]" />
            </div>
            <h2 className="text-xl font-semibold text-white">Change Email ID</h2>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                New Email ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFD93D]/50 transition-all duration-300"
                placeholder="Enter new email address"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FFD93D] hover:bg-[#FFD93D]/90 text-[#0F0F0F] font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(255,217,61,0.4)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] transition-all duration-300"
            >
              Update Email
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default SettingsPage;
