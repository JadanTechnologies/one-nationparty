import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#058541] rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
            <div className="text-xs text-gray-500 font-medium">
              &copy; {new Date().getFullYear()} African Democratic Congress (ADC). All Rights Reserved.
            </div>
          </div>
          
          <div className="flex space-x-8 text-[11px] uppercase tracking-widest font-bold">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="text-[#058541] hover:text-emerald-400 transition-colors">Contact Secretariat</a>
          </div>

          <div className="flex items-center space-x-3 text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-[10px] uppercase font-bold tracking-wider">Portal Status: Secure & Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
