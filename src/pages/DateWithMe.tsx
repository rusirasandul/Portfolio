import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Lock, Sparkles, MapPin } from 'lucide-react';
import CoffeeBooking from '../components/coffee/CoffeeBooking';
import { COFFEE_AREAS, COFFEE_CONFIG } from '../data/coffeeSpots';

const SESSION_KEY = 'rs_date_unlocked';

// Deterministic floating heart particles so renders stay pure
const FLOATING_HEARTS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${(i * 6.3 + 3) % 96}%`,
  size: 12 + ((i * 7) % 16),
  delay: (i * 0.9) % 8,
  duration: 11 + ((i * 3) % 8),
  drift: ((i % 2 === 0 ? 1 : -1) * (15 + ((i * 5) % 25))),
}));

const DateWithMe = () => {
  const [searchParams] = useSearchParams();
  const inviteParam = searchParams.get('invite') || searchParams.get('code') || searchParams.get('key') || '';
  const invitedName = searchParams.get('for') || searchParams.get('name') || '';

  const expected = COFFEE_CONFIG.dateInviteCode.trim().toLowerCase();
  const validFromUrl = inviteParam.trim().toLowerCase() === expected;

  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (validFromUrl) return true;
    try {
      return sessionStorage.getItem(SESSION_KEY) === expected;
    } catch {
      return false;
    }
  });
  const [passcode, setPasscode] = useState('');
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    if (validFromUrl) {
      try {
        sessionStorage.setItem(SESSION_KEY, expected);
      } catch {
        /* ignore storage restrictions */
      }
    }
  }, [validFromUrl, expected]);

  useEffect(() => {
    const prev = document.title;
    document.title = unlocked ? 'A Date with Rusira 💖' : 'Private Invitation 🔒';
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [unlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === expected) {
      try {
        sessionStorage.setItem(SESSION_KEY, expected);
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const spotCount = COFFEE_AREAS.reduce((n, a) => n + a.spots.length, 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Romantic ambient rose / crimson / magenta glow + floating hearts */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[42rem] w-[42rem] rounded-full bg-rose-500/[0.15] blur-[150px]" />
        <div className="absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full bg-pink-500/[0.13] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/[0.10] blur-[150px]" />
        <div className="absolute top-2/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-red-500/[0.08] blur-[150px]" />

        {FLOATING_HEARTS.map((h) => (
          <motion.span
            key={h.id}
            style={{ left: h.left }}
            initial={{ y: '105vh', opacity: 0, rotate: -12 }}
            animate={{
              y: '-10vh',
              x: [0, h.drift, 0],
              opacity: [0, 0.45, 0.45, 0],
              rotate: [-12, 14, -8],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute text-rose-400/40"
          >
            <Heart size={h.size} className="fill-rose-400/25" />
          </motion.span>
        ))}
      </div>

      <header className="container-width flex items-center justify-between py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/[0.05] px-4 py-2 text-sm text-rose-200 transition hover:border-rose-400/40 hover:text-white"
        >
          <ArrowLeft size={15} /> rusirasandul.online
        </Link>
        {unlocked && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-medium text-rose-200">
            <Sparkles size={13} className="text-rose-400" /> Personal Invitation
          </span>
        )}
      </header>

      <main className="container-width pb-24">
        {!unlocked ? (
          /* ---- Private Invite Gate ---- */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass mx-auto mt-12 max-w-md rounded-3xl border border-rose-500/20 p-8 text-center shadow-[0_20px_60px_-20px_rgba(244,63,94,0.35)]"
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 text-white shadow-[0_10px_35px_-8px_rgba(244,63,94,0.8)]">
              <Lock size={28} />
            </span>
            <h1 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
              By Personal Invitation Only 💌
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              This page is reserved for someone special. Open the private link Rusira shared with you, or enter your secret invite code below.
            </p>

            <form onSubmit={handleUnlock} className="mt-6 space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setCodeError(false);
                }}
                placeholder="Enter secret invite code…"
                className="glass-input text-center tracking-wider"
                required
              />
              {codeError && (
                <p className="text-xs text-rose-400">
                  That code didn&apos;t match. Check the link Rusira sent you 💖
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_28px_-6px_rgba(244,63,94,0.8)] transition"
              >
                <Heart size={16} className="fill-white/80" /> Unlock Invitation
              </motion.button>
            </form>

            <p className="mt-6 text-xs text-zinc-500">
              Looking for a regular coffee chat instead?{' '}
              <Link to="/coffeewithme" className="text-rose-300 underline hover:text-rose-200">
                Go to /coffeewithme ☕
              </Link>
            </p>
          </motion.div>
        ) : (
          /* ---- Romantic Unlocked Experience ---- */
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-10 max-w-2xl text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 text-white shadow-[0_10px_40px_-8px_rgba(244,63,94,0.85)]"
              >
                <Heart size={30} className="fill-white/90" />
              </motion.span>

              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-500/10 px-3.5 py-1 text-xs text-rose-200">
                <Sparkles size={12} className="text-rose-300" />
                {invitedName ? `Made just for you, ${invitedName} 💖` : 'An exclusive invitation, just for you 💖'}
              </div>

              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
                Let&apos;s go on a{' '}
                <span className="bg-gradient-to-r from-rose-300 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                  date
                </span>
                {invitedName ? `, ${invitedName}` : ''} ✨
              </h1>

              <p className="mt-4 text-zinc-300/90">
                If you&apos;re reading this, you have my favourite link on the internet. Pick a cosy spot from{' '}
                {spotCount} places I love, choose a time that works for you, and let&apos;s make a memory together.
              </p>

              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-rose-300/70">
                <MapPin size={12} /> Colombo · Dehiwala · Matara · Mirissa · Weligama
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <CoffeeBooking variant="date" invitedName={invitedName} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DateWithMe;

