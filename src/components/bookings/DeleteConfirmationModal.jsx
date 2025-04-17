import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, bookingName }) => {
  // Handle clicking outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
            className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <AlertTriangle size={24} className="text-red-600 dark:text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                    Delete Booking
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    Are you sure you want to delete the booking for <span className="font-medium">{bookingName}</span>? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="btn bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;