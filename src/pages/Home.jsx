import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto"
    >
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the BookMaster dashboard. Use the sidebar to navigate to different sections.</p>
    </motion.div>
  );
};

export default Home;