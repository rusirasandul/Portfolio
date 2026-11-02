import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, MapPin } from 'lucide-react';
import CoffeeBooking from '../components/coffee/CoffeeBooking';
import { COFFEE_AREAS } from '../data/coffeeSpots';

const CoffeeWithMe = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Coffee with Rusira Sandul ☕';
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, []);

  const spotCount = COFFEE_AREAS.reduce((n, a) => n + a.spots.length, 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[40rem] w-[40rem] rounded-full bg-amber-500/[0.10] blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[34rem] w-[34rem] rounded-full bg-accent/[0.10] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[32rem] w-[32rem] rounded-full bg-orange-600/[0.08] blur-[150px]" />
      </div>

      <header className="container-width flex items-center justify-between py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white"
        >
          <ArrowLeft size={15} /> rusirasandul.online
        </Link>
      </header>

      <main className="container-width pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-[0_10px_40px_-10px_rgba(245,158,11,0.8)]">
            <Coffee size={30} />
          </span>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Let&apos;s grab a <span className="bg-gradient-to-r from-amber-300 to-orange-500 bg-clip-text text-transparent">coffee</span>
          </h1>
          <p className="mt-4 text-zinc-400">
            Want to talk tech, projects, collaborations or just say hi? Pick one of {spotCount} hand-picked
            cafés, choose a time that works, and I&apos;ll confirm by email.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-500">
            <MapPin size={12} /> Colombo · Dehiwala · Matara · Mirissa · Weligama
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <CoffeeBooking />
        </div>
      </main>
    </div>
  );
};

export default CoffeeWithMe;

