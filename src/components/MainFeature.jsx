import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, AlertCircle, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const MainFeature = () => {
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    service: '',
    staff: '',
    date: '',
    time: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  
  // Services and staff data
  const services = [
    { id: 1, name: "Haircut & Styling", duration: 60, price: 80 },
    { id: 2, name: "Massage Therapy", duration: 90, price: 120 },
    { id: 3, name: "Dental Checkup", duration: 45, price: 150 },
    { id: 4, name: "Car Maintenance", duration: 120, price: 200 },
    { id: 5, name: "Yoga Class", duration: 60, price: 40 }
  ];
  
  const staffMembers = [
    { id: 1, name: "John Davis", specialties: [1], avatar: "JD" },
    { id: 2, name: "Sarah Wilson", specialties: [2], avatar: "SW" },
    { id: 3, name: "Dr. Robert Brown", specialties: [3], avatar: "RB" },
    { id: 4, name: "Tony Garcia", specialties: [4], avatar: "TG" },
    { id: 5, name: "Maya Patel", specialties: [5], avatar: "MP" }
  ];
  
  // Generate time slots when date changes
  useEffect(() => {
    if (bookingForm.date) {
      // In a real app, this would come from an API based on staff availability
      const slots = [];
      const startHour = 9; // 9 AM
      const endHour = 17; // 5 PM
      
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute of [0, 30]) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const isAvailable = Math.random() > 0.3; // Randomly mark some as unavailable
          
          slots.push({
            time: timeString,
            available: isAvailable
          });
        }
      }
      
      setAvailableTimeSlots(slots);
    }
  }, [bookingForm.date]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const selectTimeSlot = (time) => {
    setBookingForm(prev => ({
      ...prev,
      time
    }));
    setShowTimeSlots(false);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingForm.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }
    
    if (!bookingForm.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingForm.customerEmail)) {
      newErrors.customerEmail = "Email is invalid";
    }
    
    if (!bookingForm.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    }
    
    if (!bookingForm.service) {
      newErrors.service = "Service is required";
    }
    
    if (!bookingForm.staff) {
      newErrors.staff = "Staff member is required";
    }
    
    if (!bookingForm.date) {
      newErrors.date = "Date is required";
    }
    
    if (!bookingForm.time) {
      newErrors.time = "Time is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form after showing success message
        setTimeout(() => {
          setIsSuccess(false);
          setBookingForm({
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            service: '',
            staff: '',
            date: '',
            time: '',
            notes: ''
          });
        }, 3000);
      }, 1500);
    }
  };
  
  const getServiceById = (id) => {
    return services.find(service => service.id === parseInt(id));
  };
  
  const getStaffById = (id) => {
    return staffMembers.find(staff => staff.id === parseInt(id));
  };
  
  // Filter staff based on selected service
  const filteredStaff = bookingForm.service 
    ? staffMembers.filter(staff => staff.specialties.includes(parseInt(bookingForm.service)))
    : staffMembers;

  return (
    <div className="card overflow-visible">
      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">New Booking</h2>
        <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Create a new reservation for your customers</p>
      </div>
      
      <div className="p-6">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">Booking Confirmed!</h3>
              <p className="text-green-700 dark:text-green-500 mb-4">
                The booking has been successfully created and confirmation has been sent to the customer.
              </p>
              <div className="flex justify-center">
                <button 
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  onClick={() => setIsSuccess(false)}
                >
                  Create Another Booking
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-surface-800 dark:text-surface-200 flex items-center">
                    <Users size={18} className="mr-2" />
                    Customer Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={bookingForm.customerName}
                      onChange={handleInputChange}
                      className={`input-field ${errors.customerName ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="Enter customer name"
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.customerName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={bookingForm.customerEmail}
                      onChange={handleInputChange}
                      className={`input-field ${errors.customerEmail ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="customer@example.com"
                    />
                    {errors.customerEmail && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.customerEmail}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={bookingForm.customerPhone}
                      onChange={handleInputChange}
                      className={`input-field ${errors.customerPhone ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="(123) 456-7890"
                    />
                    {errors.customerPhone && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.customerPhone}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Booking Details */}
                <div className="space-y-4">
                  <h3 className="text-md font-semibold text-surface-800 dark:text-surface-200 flex items-center">
                    <Calendar size={18} className="mr-2" />
                    Booking Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Service
                    </label>
                    <select
                      name="service"
                      value={bookingForm.service}
                      onChange={handleInputChange}
                      className={`input-field ${errors.service ? 'border-red-500 dark:border-red-500' : ''}`}
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} (${service.price} - {service.duration} min)
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.service}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Staff Member
                    </label>
                    <select
                      name="staff"
                      value={bookingForm.staff}
                      onChange={handleInputChange}
                      className={`input-field ${errors.staff ? 'border-red-500 dark:border-red-500' : ''}`}
                      disabled={!bookingForm.service}
                    >
                      <option value="">Select staff member</option>
                      {filteredStaff.map(staff => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name}
                        </option>
                      ))}
                    </select>
                    {errors.staff && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.staff}
                      </p>
                    )}
                    {bookingForm.service && filteredStaff.length === 0 && (
                      <p className="mt-1 text-sm text-amber-600 dark:text-amber-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        No staff available for this service
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`input-field ${errors.date ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.date}
                      </p>
                    )}
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Time
                    </label>
                    <div 
                      className={`input-field flex justify-between items-center cursor-pointer ${errors.time ? 'border-red-500 dark:border-red-500' : ''}`}
                      onClick={() => bookingForm.date && setShowTimeSlots(!showTimeSlots)}
                    >
                      <span className={bookingForm.time ? 'text-surface-900 dark:text-white' : 'text-surface-400'}>
                        {bookingForm.time || 'Select time slot'}
                      </span>
                      {bookingForm.date ? (
                        showTimeSlots ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                      ) : (
                        <Clock size={18} className="text-surface-400" />
                      )}
                    </div>
                    
                    {showTimeSlots && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2 grid grid-cols-3 gap-2">
                          {availableTimeSlots.map((slot, index) => (
                            <button
                              key={index}
                              type="button"
                              disabled={!slot.available}
                              onClick={() => slot.available && selectTimeSlot(slot.time)}
                              className={`p-2 text-center rounded-lg text-sm ${
                                slot.available 
                                  ? 'hover:bg-primary/10 cursor-pointer' 
                                  : 'bg-surface-100 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                              } ${
                                bookingForm.time === slot.time 
                                  ? 'bg-primary text-white hover:bg-primary' 
                                  : ''
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field"
                  placeholder="Any special requests or additional information..."
                ></textarea>
              </div>
              
              {/* Booking Summary */}
              {(bookingForm.service && bookingForm.staff && bookingForm.date && bookingForm.time) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-50 dark:bg-surface-800/50 border border-surface-200 dark:border-surface-700 rounded-lg p-4"
                >
                  <h4 className="font-medium text-surface-900 dark:text-white mb-2">Booking Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Service:</p>
                      <p className="font-medium text-surface-900 dark:text-white">
                        {getServiceById(parseInt(bookingForm.service))?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Staff:</p>
                      <p className="font-medium text-surface-900 dark:text-white flex items-center">
                        <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">
                          {getStaffById(parseInt(bookingForm.staff))?.avatar}
                        </span>
                        {getStaffById(parseInt(bookingForm.staff))?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Date & Time:</p>
                      <p className="font-medium text-surface-900 dark:text-white">
                        {new Date(bookingForm.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} at {bookingForm.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Price:</p>
                      <p className="font-medium text-surface-900 dark:text-white">
                        ${getServiceById(parseInt(bookingForm.service))?.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary px-6 py-3 rounded-xl ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Create Booking'
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeature;