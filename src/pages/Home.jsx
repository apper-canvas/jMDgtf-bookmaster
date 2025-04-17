import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Briefcase, ArrowUpRight, Filter, Search, Plus, MoreHorizontal } from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data for stats
  const stats = [
    { 
      id: 1, 
      title: "Total Bookings", 
      value: "124", 
      change: "+12%", 
      icon: <Calendar size={20} className="text-primary" />,
      positive: true
    },
    { 
      id: 2, 
      title: "Available Slots", 
      value: "38", 
      change: "-5%", 
      icon: <Clock size={20} className="text-secondary" />,
      positive: false
    },
    { 
      id: 3, 
      title: "Active Customers", 
      value: "86", 
      change: "+8%", 
      icon: <Users size={20} className="text-accent" />,
      positive: true
    },
    { 
      id: 4, 
      title: "Services Offered", 
      value: "12", 
      change: "0%", 
      icon: <Briefcase size={20} className="text-green-500" />,
      positive: true
    },
  ];
  
  // Mock data for bookings
  const bookings = [
    {
      id: "BK-1001",
      customer: "Emma Thompson",
      service: "Hair Styling",
      staff: "John Davis",
      date: "2023-11-15",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: "BK-1002",
      customer: "Michael Chen",
      service: "Massage Therapy",
      staff: "Sarah Wilson",
      date: "2023-11-15",
      time: "11:30 AM",
      status: "pending"
    },
    {
      id: "BK-1003",
      customer: "Jessica Miller",
      service: "Dental Checkup",
      staff: "Dr. Robert Brown",
      date: "2023-11-15",
      time: "2:15 PM",
      status: "confirmed"
    },
    {
      id: "BK-1004",
      customer: "David Wilson",
      service: "Car Maintenance",
      staff: "Tony Garcia",
      date: "2023-11-16",
      time: "9:00 AM",
      status: "cancelled"
    },
    {
      id: "BK-1005",
      customer: "Sophia Rodriguez",
      service: "Yoga Class",
      staff: "Maya Patel",
      date: "2023-11-16",
      time: "5:30 PM",
      status: "confirmed"
    }
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button className="btn btn-primary">
            <Plus size={18} className="mr-2" />
            New Booking
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
            className="neu-card group hover:scale-[1.02] transition-transform"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-white dark:bg-surface-700 shadow-sm">
                {stat.icon}
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${
                stat.positive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-4 text-surface-900 dark:text-white">{stat.value}</h3>
            <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">{stat.title}</p>
            <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
              <a href="#" className="text-primary text-sm font-medium flex items-center group-hover:underline">
                View details
                <ArrowUpRight size={14} className="ml-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Main Feature Component */}
      <MainFeature />
      
      {/* Recent Bookings */}
      <div className="card">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Recent Bookings</h2>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
              <button 
                className={`px-3 py-2 text-sm ${activeTab === 'upcoming' ? 
                  'bg-primary text-white' : 
                  'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300'}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`px-3 py-2 text-sm ${activeTab === 'past' ? 
                  'bg-primary text-white' : 
                  'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300'}`}
                onClick={() => setActiveTab('past')}
              >
                Past
              </button>
              <button 
                className={`px-3 py-2 text-sm ${activeTab === 'all' ? 
                  'bg-primary text-white' : 
                  'bg-white dark:bg-surface-800 text-surface-600 dark:text-surface-300'}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Staff</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-surface-50 dark:hover:bg-surface-800/60">
                  <td className="px-4 py-3 text-sm font-medium text-surface-900 dark:text-white">{booking.id}</td>
                  <td className="px-4 py-3 text-sm text-surface-700 dark:text-surface-300">{booking.customer}</td>
                  <td className="px-4 py-3 text-sm text-surface-700 dark:text-surface-300">{booking.service}</td>
                  <td className="px-4 py-3 text-sm text-surface-700 dark:text-surface-300">{booking.staff}</td>
                  <td className="px-4 py-3 text-sm text-surface-700 dark:text-surface-300">
                    {booking.date} at {booking.time}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="p-1 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700">
                      <MoreHorizontal size={18} className="text-surface-500 dark:text-surface-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <p className="text-sm text-surface-500 dark:text-surface-400">Showing 5 of 24 bookings</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 text-sm">Previous</button>
            <button className="px-3 py-1 rounded bg-primary text-white text-sm">1</button>
            <button className="px-3 py-1 rounded border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 text-sm">2</button>
            <button className="px-3 py-1 rounded border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 text-sm">3</button>
            <button className="px-3 py-1 rounded border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300 text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;