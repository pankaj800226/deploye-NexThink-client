import { motion } from "framer-motion";
import logo from '../assets/logo.png';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      <div className="flex flex-col items-center">
        
        {/* Logo Animation - Subtle Scale & Fade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative"
        >
          <img 
            src={logo} 
            alt="Nexthinks Logo" 
            className="w-20 h-20 md:w-24 md:h-24 object-contain mb-6 grayscale hover:grayscale-0 transition-all duration-500" 
          />
          
          {/* Subtle Glow behind logo */}
          <div className="absolute inset-0 bg-indigo-400/10 blur-3xl rounded-full -z-10" />
        </motion.div>

        {/* Brand Name */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-black text-slate-900 tracking-tighter mb-8"
        >
          Nex<span className="text-indigo-600">Thinks</span>
        </motion.h2>

        {/* Sleek Loader Bar */}
        <div className="w-48 h-[3px] bg-slate-100 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
          />
        </div>

        {/* Loading Text */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-6"
        >
          Syncing Workspace
        </motion.p>
      </div>

      {/* Footer Branding (Optional) */}
      <div className="absolute bottom-10">
        <p className="text-xs text-gray-300 font-medium">Powered by ApnaAI</p>
      </div>
    </div>
  );
};

export default Loading;