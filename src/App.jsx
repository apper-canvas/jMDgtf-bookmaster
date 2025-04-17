import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sun, Moon, Menu, X, Calendar, Users, Briefcase, Settings, BarChart2, Bell, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const navItems = [
    { name: "Dashboard", icon: <BarChart2 size={20} />, path: "/" },
    { name: "Bookings", icon: <Calendar size={20} />, path: "/bookings" },
    { name: "Customers", icon: <Users size={20} />, path: "/customers" },
    { name: "Services", icon: <Briefcase size={20} />, path: "/services" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-30">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-xl">BookMaster</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              AM
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleSidebar}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25 }}
                className="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-surface-800 shadow-lg"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-4 flex justify-between items-center border-b border-surface-200 dark:border-surface-700">
                  <span className="text-primary font-bold text-xl">BookMaster</span>
                  <button 
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <nav className="p-4 space-y-1">
                  {navItems.map((item) => (
                    <a 
                      key={item.name}
                      href={item.path}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  ))}
                </nav>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-200 dark:border-surface-700">
                  <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.path === "/" 
                    ? "bg-primary/10 text-primary dark:bg-primary/20" 
                    : "text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-200 dark:border-surface-700">
            <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;