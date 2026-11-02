import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import CoffeeBooking from './CoffeeBooking';

/** Floating "Coffee with me" button that sits next to the JARVIS assistant. */
const CoffeeFab = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', bounce: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(true)}
        aria-label="Book a coffee meeting with Rusira"
        className="group fixed bottom-5 right-[5.75rem] z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_8px_30px_-6px_rgba(245,158,11,0.7)] ring-1 ring-white/20 sm:bottom-6 sm:right-[6.25rem]"
      >
        {/* steam */}
        <span className="pointer-events-none absolute -top-1 left-1/2 flex -translate-x-1/2 gap-1">
          {[0, 0.4, 0.8].map((d) => (
            <motion.span
              key={d}
              className="h-2.5 w-[2px] rounded-full bg-white/60"
              animate={{ y: [4, -6], opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: d, ease: 'easeOut' }}
            />
          ))}
        </span>
        <Coffee size={24} />
        <span className="pointer-events-none absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900/90 px-3 py-1.5 text-xs font-medium text-zinc-200 opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100">
          ☕ Coffee with me?
        </span>
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Coffee with Rusira"
                className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-950/95 shadow-2xl sm:rounded-3xl"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-gradient-to-r from-amber-500/15 to-orange-600/5 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                      <Coffee size={20} />
                    </span>
                    <div>
                      <div className="font-display text-lg font-semibold text-white">Coffee with Rusira</div>
                      <div className="text-xs text-zinc-400">Pick a spot, a time, and let&apos;s talk.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      to="/coffeewithme"
                      onClick={() => setOpen(false)}
                      className="hidden items-center gap-1 rounded-lg px-3 py-2 text-xs text-zinc-400 hover:bg-white/5 hover:text-white sm:inline-flex"
                    >
                      Full page <ExternalLink size={12} />
                    </Link>
                    <button
                      onClick={() => setOpen(false)}
                      className="grid h-9 w-9 place-items-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white"
                      aria-label="Close"
                    >
                      <X size={19} />
                    </button>
                  </div>
                </div>
                <div className="overflow-y-auto p-4 sm:p-6">
                  <CoffeeBooking compact />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default CoffeeFab;

