import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogIn } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#058541] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
                A
              </div>
              <div className="leading-none">
                <h1 className="text-lg font-black text-gray-900 tracking-tight uppercase">ADC <span className="text-[#e31e24]">Nigeria</span></h1>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">African Democratic Congress</p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-bold text-[#058541]">Home</Link>
            <Link to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link to="/manifesto" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Manifesto</Link>
            <Link to="/news" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">The Constitution</Link>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Member Login</Link>
            <Link to="/register">
              <Button size="sm" className="bg-[#058541] hover:bg-[#046b34] text-white rounded-md px-6 font-bold">
                Register Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2"
        >
          <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">About ADC</Link>
          <Link to="/manifesto" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Manifesto</Link>
          <Link to="/news" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">News</Link>
          <div className="pt-4 flex flex-col space-y-2">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full justify-center">Login</Button>
            </Link>
            <Link to="/register" className="w-full">
              <Button className="w-full justify-center bg-emerald-600 hover:bg-emerald-700">Join Now</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
