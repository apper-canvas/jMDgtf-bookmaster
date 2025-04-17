import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreVertical, Trash2, Edit, 
  CheckCircle, Clock, XCircle, Calendar, Download
} from 'lucide-react';
import { format } from 'date-fns';
import BookingModal from '../components/bookings/BookingModal';
import DeleteConfirmationModal from '../components/bookings/DeleteConfirmationModal';

// Mock data for bookings
const initialBookings = [
  {
    id: 1,
    customer: "Jane Cooper",
    email: "jane@example.com",
    phone: "555-123-4567",
    service: "Haircut",
    date: new Date(2023, 4, 12, 10, 30),
    status: "confirmed",
    notes: "Regular customer, prefers stylist Maria"
  },
  {
    id: 2,
    customer: "Esther Howard",
    email: "esther@example.com",
    phone: "555-987-6543",
    service: "Manicure",
    date: new Date(2023, 4, 15, 14, 0),
    status: "pending",
    notes: "First time customer"
  },
  {
    id: 3,
    customer: "Robert Fox",
    email: "robert@example.com",
    phone: "555-456-7890",
    service: "Massage",
    date: new Date(2023, 4, 10, 16, 30),
    status: "completed",
    notes: "Prefers deep tissue"
  },
  {
    id: 4,
    customer: "Kristin Watson",
    email: "kristin@example.com",
    phone: "555-765-4321",
    service: "Facial",
    date: new Date(2023, 4, 18, 11, 15),
    status: "cancelled",
    notes: "Cancellation due to illness"
  },
  {
    id: 5,
    customer: "Michael Johnson",
    email: "michael@example.com",
    phone: "555-234-5678",
    service: "Haircut",
    date: new Date(2023, 4, 20, 9, 0),
    status: "confirmed",
    notes: "Wants a new style, bring reference photos"
  },
  {
    id: 6,
    customer: "Cameron Williamson",
    email: "cameron@example.com",
    phone: "555-876-5432",
    service: "Spa Package",
    date: new Date(2023, 4, 25, 13, 0),
    status: "pending",
    notes: "Anniversary gift"
  },
  {
    id: 7,
    customer: "Leslie Alexander",
    email: "leslie@example.com",
    phone: "555-321-6789",
    service: "Pedicure",
    date: new Date(2023, 4, 22, 15, 45),
    status: "confirmed",
    notes: ""
  }
];

// Status color mapping
const statusColors = {
  confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
};

// Status icon mapping
const statusIcons = {
  confirmed: <CheckCircle size={16} className="text-green-600 dark:text-green-400" />,
  pending: <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />,
  cancelled: <XCircle size={16} className="text-red-600 dark:text-red-400" />,
  completed: <CheckCircle size={16} className="text-blue-600 dark:text-blue-400" />
};

const Bookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [filteredBookings, setFilteredBookings] = useState(initialBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Filter bookings based on search term and status filter
  useEffect(() => {
    let result = [...bookings];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(booking => 
        booking.customer.toLowerCase().includes(lowercasedTerm) || 
        booking.email.toLowerCase().includes(lowercasedTerm) || 
        booking.service.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    setFilteredBookings(result);
  }, [bookings, searchTerm, statusFilter]);

  // Handle opening the edit modal
  const handleEditBooking = (booking) => {
    setCurrentBooking(booking);
    setIsEditModalOpen(true);
    setActionMenuOpen(null);
  };

  // Handle opening the delete confirmation modal
  const handleDeleteClick = (booking) => {
    setCurrentBooking(booking);
    setIsDeleteModalOpen(true);
    setActionMenuOpen(null);
  };

  // Create a new booking
  const handleCreateBooking = (newBooking) => {
    const newId = Math.max(...bookings.map(b => b.id), 0) + 1;
    const bookingWithId = { ...newBooking, id: newId };
    setBookings([...bookings, bookingWithId]);
    setIsCreateModalOpen(false);
  };

  // Update an existing booking
  const handleUpdateBooking = (updatedBooking) => {
    setBookings(bookings.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
    setIsEditModalOpen(false);
  };

  // Delete a booking
  const handleDeleteBooking = () => {
    setBookings(bookings.filter(booking => booking.id !== currentBooking.id));
    setIsDeleteModalOpen(false);
  };

  // Toggle action menu for a booking
  const toggleActionMenu = (id) => {
    setActionMenuOpen(actionMenuOpen === id ? null : id);
  };

  // Export bookings data
  const handleExport = () => {
    // In a real application, this would generate a CSV or PDF
    alert('Exporting bookings data...');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">Bookings</h1>
          <p className="text-surface-600 dark:text-surface-400">Manage your customer appointments</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={handleExport}
            className="btn btn-outline"
          >
            <Download size={18} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={18} className="mr-2" />
            New Booking
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-surface-400" />
          </div>
          <input
            type="text"
            placeholder="Search bookings..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-surface-400" />
          </div>
          <select
            className="input-field pl-10 pr-10 appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-100 dark:bg-surface-700/50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-surface-500 dark:text-surface-400">
                    <div className="flex flex-col items-center">
                      <Calendar size={48} className="text-surface-400 mb-4" />
                      <p className="text-lg font-medium mb-1">No bookings found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-surface-50 dark:hover:bg-surface-800/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-surface-900 dark:text-white">{booking.customer}</div>
                      <div className="text-sm text-surface-500 dark:text-surface-400">{booking.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-surface-900 dark:text-white">{booking.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-surface-900 dark:text-white">
                        {format(booking.date, 'MMM d, yyyy')}
                      </div>
                      <div className="text-sm text-surface-500 dark:text-surface-400">
                        {format(booking.date, 'h:mm a')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                        {statusIcons[booking.status]}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => toggleActionMenu(booking.id)}
                        className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-white"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {/* Action Menu */}
                      {actionMenuOpen === booking.id && (
                        <div className="absolute right-6 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-surface-800 ring-1 ring-black ring-opacity-5 divide-y divide-surface-200 dark:divide-surface-700 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleEditBooking(booking)}
                              className="flex items-center w-full px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                            >
                              <Edit size={16} className="mr-2" />
                              Edit
                            </button>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={() => handleDeleteClick(booking)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-surface-100 dark:hover:bg-surface-700"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Booking Modal */}
      {isCreateModalOpen && (
        <BookingModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateBooking}
          title="Create New Booking"
        />
      )}

      {/* Edit Booking Modal */}
      {isEditModalOpen && currentBooking && (
        <BookingModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateBooking}
          booking={currentBooking}
          title="Edit Booking"
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentBooking && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteBooking}
          bookingName={currentBooking.customer}
        />
      )}
    </motion.div>
  );
};

export default Bookings;