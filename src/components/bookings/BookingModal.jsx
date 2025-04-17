import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, onSave, booking = null, title }) => {
  // Initial form state
  const initialFormState = {
    customer: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    status: 'pending',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // If editing a booking, populate the form with existing data
  useEffect(() => {
    if (booking) {
      const dateObject = new Date(booking.date);
      
      setFormData({
        ...booking,
        date: dateObject.toISOString().split('T')[0],
        time: dateObject.toTimeString().slice(0, 5),
      });
    }
  }, [booking]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.customer.trim()) newErrors.customer = 'Customer name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.service.trim()) newErrors.service = 'Service is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.status) newErrors.status = 'Status is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const [hours, minutes] = formData.time.split(':');
      const bookingDate = new Date(formData.date);
      bookingDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      
      const processedData = {
        ...formData,
        date: bookingDate
      };
      
      onSave(processedData);
    }
  };

  // Handle clicking outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Available services
  const services = [
    'Haircut', 
    'Manicure', 
    'Pedicure', 
    'Facial', 
    'Massage', 
    'Spa Package', 
    'Hair Coloring', 
    'Waxing'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl font-semibold text-surface-900 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-white rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                {/* Customer Name */}
                <div>
                  <label htmlFor="customer" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Customer Name*
                  </label>
                  <input
                    type="text"
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    className={`input-field ${errors.customer ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.customer && <p className="mt-1 text-sm text-red-500">{errors.customer}</p>}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                
                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Service*
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`input-field ${errors.service ? 'border-red-500 dark:border-red-500' : ''}`}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
                </div>
                
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Date*
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`input-field ${errors.date ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Time*
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`input-field ${errors.time ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                  </div>
                </div>
                
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Status*
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`input-field ${errors.status ? 'border-red-500 dark:border-red-500' : ''}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                </div>
                
                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Additional information"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {booking ? 'Update Booking' : 'Create Booking'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;