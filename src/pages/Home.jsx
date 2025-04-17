import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Users, CreditCard, TrendingUp, ArrowUp, ArrowDown, Clock, Filter } from 'lucide-react';
import Chart from 'react-apexcharts';

const Home = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Chart options and data
  const chartOptions = {
    chart: {
      id: 'bookings-stats',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      categories: timeRange === 'week' 
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontSize: '12px',
        }
      }
    },
    colors: ['#3b82f6', '#f97316'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 5,
    },
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    },
    tooltip: {
      theme: 'light'
    }
  };
  
  const series = [
    {
      name: 'New Bookings',
      data: timeRange === 'week' ? [15, 25, 28, 22, 19, 12, 8] : [42, 47, 52, 58, 65, 61, 64, 60, 58, 65, 59, 71]
    },
    {
      name: 'Completed',
      data: timeRange === 'week' ? [10, 22, 23, 20, 16, 9, 6] : [38, 42, 48, 50, 58, 55, 60, 55, 52, 59, 55, 65]
    }
  ];
  
  const statsData = [
    {
      title: 'Total Bookings',
      value: '1,284',
      icon: <Calendar size={20} />,
      change: '+12%',
      trend: 'up',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Customers',
      value: '842',
      icon: <Users size={20} />,
      change: '+5%',
      trend: 'up',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Revenue',
      value: '$12,538',
      icon: <CreditCard size={20} />,
      change: '+18%',
      trend: 'up',
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Growth',
      value: '21%',
      icon: <TrendingUp size={20} />,
      change: '-3%',
      trend: 'down',
      bgColor: 'bg-orange-500'
    }
  ];
  
  const recentBookings = [
    { id: 'BK-7829', customer: 'Emma Watson', service: 'Haircut & Styling', date: 'Today, 10:30 AM', status: 'Completed', amount: '$85.00' },
    { id: 'BK-7830', customer: 'John Doe', service: 'Massage Therapy', date: 'Today, 2:00 PM', status: 'Upcoming', amount: '$120.00' },
    { id: 'BK-7831', customer: 'Alice Cooper', service: 'Manicure & Pedicure', date: 'Tomorrow, 11:00 AM', status: 'Confirmed', amount: '$65.00' },
    { id: 'BK-7832', customer: 'Robert Smith', service: 'Beard Trim', date: 'Tomorrow, 3:30 PM', status: 'Pending', amount: '$35.00' },
    { id: 'BK-7833', customer: 'Sarah Johnson', service: 'Facial Treatment', date: 'Oct 15, 1:15 PM', status: 'Cancelled', amount: '$95.00' }
  ];
  
  const statusColors = {
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Upcoming': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Confirmed': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Clock className="text-surface-500" size={18} />
          <span className="text-surface-500 dark:text-surface-400 text-sm">Last updated: Today at 11:43 AM</span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-surface-800 rounded-lg shadow p-5">
            <div className="flex justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.trend === 'up' ? <ArrowUp size={12} className="inline" /> : <ArrowDown size={12} className="inline" />}
                    {stat.change}
                  </span>
                  <span className="text-surface-500 dark:text-surface-400 text-xs">vs last period</span>
                </div>
              </div>
              <div className={`${stat.bgColor} rounded-lg p-3 flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart Section */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-lg font-semibold mb-2 md:mb-0">Booking Statistics</h2>
          <div className="flex items-center bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-white dark:bg-surface-600 shadow' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${timeRange === 'year' ? 'bg-white dark:bg-surface-600 shadow' : ''}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>
        <div className="h-72">
          <Chart
            options={chartOptions}
            series={series}
            type="line"
            height="100%"
          />
        </div>
      </div>
      
      {/* Recent Bookings */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
        <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-lg font-semibold mb-2 md:mb-0">Recent Bookings</h2>
          <div className="flex items-center">
            <button className="flex items-center gap-2 text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-lg text-sm">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-50 dark:bg-surface-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {recentBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-surface-50 dark:hover:bg-surface-750">
                  <td className="px-4 py-3 text-sm font-medium">{booking.id}</td>
                  <td className="px-4 py-3 text-sm">{booking.customer}</td>
                  <td className="px-4 py-3 text-sm">{booking.service}</td>
                  <td className="px-4 py-3 text-sm text-surface-500 dark:text-surface-400">{booking.date}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-surface-200 dark:border-surface-700 text-center">
          <button className="text-primary hover:text-primary-dark text-sm font-medium">View All Bookings</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;