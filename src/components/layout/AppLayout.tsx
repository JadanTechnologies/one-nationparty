import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIChat } from './AIChat';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <AIChat />
      <Footer />
    </div>
  );
}
