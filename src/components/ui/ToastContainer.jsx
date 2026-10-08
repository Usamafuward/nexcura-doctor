import { useApp } from "@/context/SidebarContext";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ToastContainer = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="pointer-events-auto p-4 rounded-2xl shadow-2xl bg-[#121722]/95 text-white border border-[#1C2436] backdrop-blur-md flex items-start gap-3"
          >
            {toast.type === "emergency" ? (
              <AlertCircle className="w-5 h-5 text-[#FF6384] shrink-0 mt-0.5 stroke-[2.5]" />
            ) : toast.type === "info" ? (
              <Info className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5 stroke-[2.5]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#D4FF00] shrink-0 mt-0.5 stroke-[2.5]" />
            )}
            <div className="flex-1 text-xs">
              <div className="font-bold text-white">System Notification</div>
              <div className="text-[#8E99A8] text-[11px] mt-0.5 leading-snug">{toast.message}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
