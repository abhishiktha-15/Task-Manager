import { motion } from 'framer-motion';
import { Edit, Trash2, Clock, CheckCircle2, Circle, Calendar, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  // Update countdown timer every second
  useEffect(() => {
    if (!task.deadline) return;

    const updateTimer = () => {
      const now = new Date();
      const deadline = new Date(task.deadline);
      const diff = deadline - now;

      if (diff < 0) {
        setTimeLeft('Overdue');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [task.deadline]);

  // Calculate if deadline is approaching
  const getDeadlineStatus = () => {
    if (!task.deadline) return null;
    
    const deadline = new Date(task.deadline);
    const now = new Date();
    const hoursLeft = (deadline - now) / (1000 * 60 * 60);
    
    if (hoursLeft < 0) return 'overdue';
    if (hoursLeft < 24) return 'urgent';
    if (hoursLeft < 72) return 'soon';
    return 'normal';
  };

  const deadlineStatus = getDeadlineStatus();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case 'Completed':
        return 'from-green-500 via-emerald-500 to-teal-500';
      case 'In Progress':
        return 'from-blue-500 via-indigo-500 to-purple-500';
      default:
        return 'from-amber-500 via-orange-500 to-red-500';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'In Progress':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <motion.div
        className="group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 dark:border-gray-700 h-full overflow-hidden">
          {/* Gradient glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getStatusGradient(task.status)} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
          
          {/* Status indicator bar */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${getStatusGradient(task.status)}`}></div>
          
          {/* Content */}
          <div className="mt-2 relative z-10">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 pr-2">
                {task.title}
              </h3>
              <div className="flex gap-1">
                <motion.button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                  title="Edit task"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{task.description}</p>

            {/* Priority Badge */}
            {task.priority && (
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  task.priority === 'High' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800' :
                  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                }`}>
                  {task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢'} {task.priority} Priority
                </span>
              </div>
            )}

            {/* Deadline indicator - Priority Display with Countdown */}
            {task.deadline && (
              <motion.div 
                className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3 font-semibold ${
                  deadlineStatus === 'overdue' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md' :
                  deadlineStatus === 'urgent' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' :
                  deadlineStatus === 'soon' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md' :
                  'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                }`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                {deadlineStatus === 'overdue' ? <AlertCircle className="w-4 h-4 animate-pulse" /> : <Clock className="w-4 h-4" />}
                <div className="flex-1">
                  <div className="font-bold">
                    {deadlineStatus === 'overdue' ? '⚠️ OVERDUE' : 
                     deadlineStatus === 'urgent' ? '🔥 URGENT' :
                     deadlineStatus === 'soon' ? '⏰ DUE SOON' : '📅 Deadline'}
                  </div>
                  <div className="text-xs opacity-90 flex items-center gap-2">
                    <span>{new Date(task.deadline).toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    {timeLeft && (
                      <>
                        <span>•</span>
                        <span className="font-bold">{timeLeft}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className={`flex items-center gap-2 text-sm font-medium ${getStatusClass(task.status)}`}>
                {getStatusIcon(task.status)}
                <span>{task.status}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Delete Task?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 btn-danger"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
