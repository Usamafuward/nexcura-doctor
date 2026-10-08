import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 5,
  onPageChange,
  itemName = "items",
}) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with ellipsis for large page counts
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#1C2436]/80 text-xs">
      {/* Telemetry Count */}
      <div className="text-[#8E99A8] font-mono flex items-center gap-1.5">
        <span>Showing</span>
        <span className="text-white font-bold">{startItem}–{endItem}</span>
        <span>of</span>
        <span className="text-[#D4FF00] font-bold">{totalItems}</span>
        <span>{itemName}</span>
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-1.5 bg-[#0D121D] p-1 rounded-full border border-[#1C2436]">
        {/* Previous Button */}
        <motion.button
          whileHover={currentPage > 1 ? { scale: 1.08 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.92 } : {}}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-colors font-medium ${
            currentPage === 1
              ? "text-slate-600 cursor-not-allowed"
              : "text-[#8E99A8] hover:text-white hover:bg-white/5 cursor-pointer"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </motion.button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-7 h-7 flex items-center justify-center text-slate-500 font-mono"
                >
                  •••
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <motion.button
                key={page}
                whileHover={!isActive ? { scale: 1.1 } : {}}
                whileTap={!isActive ? { scale: 0.9 } : {}}
                onClick={() => onPageChange(page)}
                aria-current={isActive ? "page" : undefined}
                className={`w-7 h-7 rounded-full text-xs font-mono font-bold transition-all flex items-center justify-center ${
                  isActive
                    ? "bg-[#D4FF00] text-black shadow-lime-sm"
                    : "text-[#8E99A8] hover:text-white hover:bg-white/5"
                }`}
              >
                {page}
              </motion.button>
            );
          })}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={currentPage < totalPages ? { scale: 1.08 } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.92 } : {}}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full transition-colors font-medium ${
            currentPage === totalPages
              ? "text-slate-600 cursor-not-allowed"
              : "text-[#8E99A8] hover:text-white hover:bg-white/5 cursor-pointer"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
