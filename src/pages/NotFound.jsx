import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="w-64 h-64 mb-8 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 bg-white dark:bg-surface-800 rounded-full flex items-center justify-center shadow-neu-light dark:shadow-neu-dark">
          <span className="text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">404</span>
        </div>
      </motion.div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">Page Not Found</h1>
      
      <p className="text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.
      </p>
      
      <Link 
        to="/"
        className="btn btn-primary px-6 py-3 rounded-xl shadow-soft"
      >
        <Home size={20} className="mr-2" />
        Back to Dashboard
      </Link>
    </motion.div>
  );
};

export default NotFound;