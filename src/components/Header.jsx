
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/10">
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#FFD93D] drop-shadow-[0_0_15px_rgba(255,217,61,0.5)] hidden lg:block">
          Patanjali School System
        </h2>
        
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#FFD93D]/20 flex items-center justify-center">
              <User size={18} className="text-[#FFD93D]" />
            </div>
            <span className="text-white/90 font-medium hidden sm:block">Admin User</span>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-transparent border-white/10 text-white/90 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300"
          >
            <LogOut size={18} className="mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
