import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import Loader from '../components/Loader';
import StatsCard from '../components/StatsCard';
import { Plus, ListTodo, Clock, CheckCircle2, Circle, Search, Filter, ArrowUpDown } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [filter, priorityFilter, searchQuery, sortBy, tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      if (response.success) {
        setTasks(response.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    // Apply status filter
    if (filter !== 'All') {
      filtered = filtered.filter(task => task.status === filter);
    }

    // Apply priority filter
    if (priorityFilter !== 'All') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'deadline') {
        if (!a.deadline && !b.deadline) return new Date(b.createdAt) - new Date(a.createdAt);
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'createdAt') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
        const aPriority = priorityOrder[a.priority] ?? 3;
        const bPriority = priorityOrder[b.priority] ?? 3;
        return aPriority - bPriority;
      }
      return 0;
    });

    setFilteredTasks(filtered);
  };

  const handleEditTask = (task) => {
    navigate('/edit-task', { state: { task } });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await taskAPI.deleteTask(taskId);
      if (response.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const statusFilters = ['All', 'Pending', 'In Progress', 'Completed'];
  const priorityFilters = ['All', 'High', 'Medium', 'Low'];
  const sortOptions = [
    { value: 'deadline', label: 'Deadline' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'priority', label: 'Priority' }
  ];

  const getTaskStats = () => {
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'Pending').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Completed').length
    };
  };

  const stats = getTaskStats();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
                My Tasks
              </h1>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Manage and track your tasks efficiently
              </p>
            </div>

            <motion.button
              onClick={() => navigate('/create-task')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold shadow-lg"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              <span>Create Task</span>
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Tasks"
              value={stats.total}
              icon={ListTodo}
              gradient="from-blue-500 to-blue-600"
              delay={0}
            />
            <StatsCard
              title="Pending"
              value={stats.pending}
              icon={Circle}
              gradient="from-gray-500 to-gray-600"
              delay={0.1}
            />
            <StatsCard
              title="In Progress"
              value={stats.inProgress}
              icon={Clock}
              gradient="from-indigo-500 to-indigo-600"
              delay={0.2}
            />
            <StatsCard
              title="Completed"
              value={stats.completed}
              icon={CheckCircle2}
              gradient="from-green-500 to-green-600"
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-md font-medium"
            />
          </div>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          className="mb-6 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap flex items-center gap-2">
              <span className="text-lg">📊</span> Status:
            </span>
            
            {statusFilters.map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap text-sm shadow-md ${
                  filter === status
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg border border-gray-200 dark:border-gray-600'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {status}
              </motion.button>
            ))}
          </div>

          {/* Priority Filter and Sort */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Priority Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap flex items-center gap-2">
                <Filter className="w-4 h-4" /> Priority:
              </span>
              
              {priorityFilters.map((priority) => (
                <motion.button
                  key={priority}
                  onClick={() => setPriorityFilter(priority)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap text-sm shadow-md ${
                    priorityFilter === priority
                      ? 'bg-gradient-to-r from-pink-600 to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg border border-gray-200 dark:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {priority === 'High' ? '🔴' : priority === 'Medium' ? '🟡' : priority === 'Low' ? '🟢' : ''} {priority}
                </motion.button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" /> Sort By:
              </span>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-semibold text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <motion.div
            className="text-center py-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="text-7xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >📝</motion.div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              No tasks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              {filter === 'All' 
                ? 'Create your first task to get started!' 
                : `No tasks with status "${filter}"`}
            </p>
            <motion.button
              onClick={() => navigate('/create-task')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-2xl transition-all shadow-lg inline-flex items-center gap-3 font-semibold text-lg"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-6 h-6" />
              <span>Create Your First Task</span>
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
