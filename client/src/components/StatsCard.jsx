import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon: Icon, gradient, delay = 0 }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, type: "spring" }}
      whileHover={{ y: -6, scale: 1.05 }}
    >
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/50 dark:border-gray-700 relative overflow-hidden">
        {/* Gradient glow on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <motion.div 
            className={`p-4 bg-gradient-to-br ${gradient} rounded-xl shadow-md`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h3 
            className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.1 }}
          >
            {value}
          </motion.h3>
        </div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 relative z-10">{title}</p>
      </div>
    </motion.div>
  );
}
