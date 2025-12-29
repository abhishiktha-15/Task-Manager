import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <motion.div
        className="flex space-x-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0
          }}
        />
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15
          }}
        />
        <motion.div
          className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
      </motion.div>
    </div>
  );
}
