import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee,
  Heart,
  MapPin,
  CalendarDays,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  ExternalLink,
  Send,
  Loader2,
  CalendarPlus,
  Link2,
  Mail,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import {
  AVAILABILITY,
  COFFEE_AREAS,
  COFFEE_CONFIG,
  mapEmbedUrl,
  mapLinkUrl,
  type CoffeeSpot,
} from '../../data/coffeeSpots';
import {
  bookableDays,
  colomboNow,
  formatDayLong,
  formatTime,
  googleCalendarUrl,
  makeDay,
  parseKey,
  slotsFor,
  type BusyMap,
} from '../../lib/coffeeSchedule';

const DURATIONS = [30, 60, 90];
const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type Status = 'idle' | 'sending' | 'sent' | 'sent-no-email' | 'error';

interface Confirmed {
  when: string;
  where: string;
  calendarLink: string;
  mailto: string;
  whatsappLink: string;
}

interface CoffeeBookingProps {
  /** Tighter layout for the floating modal */
  compact?: boolean;
  /** 'coffee' (default) or 'date' for the romantic `/datewithme` page */
  variant?: 'coffee' | 'date';
  /** Optional guest name pre-filled from `?for=Name` on the invite link */
  invitedName?: string;
}

const CoffeeBooking = ({ compact = false, variant = 'coffee', invitedName = '' }: CoffeeBookingProps) => {
  const isDate = variant === 'date';
  const [areaId, setAreaId] = useState(COFFEE_AREAS[0].id);
  const [spot, setSpot] = useState<CoffeeSpot | null>(null);
  const [duration, setDuration] = useState(isDate ? 90 : 60);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [pickedTime, setPickedTime] = useState<number | null>(null);
  const [form, setForm] = useState({ name: invitedName, email: '', phone: '', topic: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<BusyMap>({});
  const [busyLoaded, setBusyLoaded] = useState(false);
  const [cancelUrl, setCancelUrl] = useState('');
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  const area = COFFEE_AREAS.find((a) => a.id === areaId)!;

  // Theme tokens for coffee vs romantic date mode
  const theme = isDate
    ? {
        badgeBg: 'bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 shadow-[0_0_22px_-4px_rgba(244,63,94,0.75)]',
        iconColor: 'text-rose-400',
        chip: '!border-rose-400/35 !bg-rose-500/10 !text-rose-200',
        pillActive: 'border-rose-400/60 bg-rose-500/20 text-rose-100 shadow-[0_0_20px_-6px_rgba(244,63,94,0.5)]',
        cardActive: 'border-rose-400/70 bg-rose-500/[0.10] shadow-[0_0_32px_-10px_rgba(244,63,94,0.65)]',
        checkBadge: 'bg-rose-500',
        mapBorder: 'border-rose-400/35',
        mapBarBg: 'bg-rose-500/[0.08]',
        accentText: 'text-rose-300',
        accentLink: 'text-rose-300 hover:text-rose-200',
        dayActive: 'bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 font-semibold text-white shadow-[0_0_22px_-5px_rgba(244,63,94,0.85)]',
        dayHover: 'text-zinc-200 hover:bg-rose-500/15',
        weekdayDot: 'bg-rose-400',
        weekendDot: 'bg-pink-300',
        slotActive: 'border-rose-400 bg-rose-500/25 font-semibold text-rose-100 shadow-[0_0_18px_-6px_rgba(244,63,94,0.6)]',
        slotHover: 'border-white/10 bg-white/[0.02] text-zinc-300 hover:border-rose-400/40',
        summaryBox: 'border-rose-400/25 bg-rose-500/[0.07]',
        submitBtn: 'bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 hover:shadow-[0_0_34px_-6px_rgba(244,63,94,0.85)]',
        calBtnHover: 'hover:border-rose-400/40',
        cardShell: 'glass rounded-3xl border border-rose-500/15',
      }
    : {
        badgeBg: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-[0_0_18px_-4px_rgba(245,158,11,0.6)]',
        iconColor: 'text-amber-400',
        chip: '!border-amber-500/30 !bg-amber-500/10 !text-amber-200',
        pillActive: 'border-amber-400/50 bg-amber-500/15 text-amber-100',
        cardActive: 'border-amber-400/60 bg-amber-500/[0.08] shadow-[0_0_30px_-10px_rgba(245,158,11,0.6)]',
        checkBadge: 'bg-amber-500',
        mapBorder: 'border-amber-400/30',
        mapBarBg: 'bg-amber-500/[0.06]',
        accentText: 'text-amber-300',
        accentLink: 'text-amber-300 hover:text-amber-200',
        dayActive: 'bg-gradient-to-br from-amber-500 to-orange-600 font-semibold text-white shadow-[0_0_20px_-6px_rgba(245,158,11,0.8)]',
        dayHover: 'text-zinc-200 hover:bg-amber-500/15',
        weekdayDot: 'bg-amber-400',
        weekendDot: 'bg-sky-400',
        slotActive: 'border-amber-400 bg-amber-500/20 font-semibold text-amber-100',
        slotHover: 'border-white/10 bg-white/[0.02] text-zinc-300 hover:border-amber-400/40',
        summaryBox: 'border-amber-400/20 bg-amber-500/[0.05]',
        submitBtn: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-[0_0_30px_-8px_rgba(245,158,11,0.8)]',
        calBtnHover: 'hover:border-amber-400/40',
        cardShell: 'glass rounded-3xl',
      };

  // ---- Existing bookings (shared between /coffeewithme and /datewithme) ----
  const loadBusy = useCallback(async (): Promise<BusyMap | null> => {
    try {
      const res = await fetch(`${COFFEE_CONFIG.bookingApi}/bookings`, { cache: 'no-store' });
      if (!res.ok) throw new Error();
      const data: { busy: { date: string; start: number; end: number }[] } = await res.json();
      const map: BusyMap = {};
      data.busy.forEach(({ date, start, end }) => {
        (map[date] ||= []).push({ start, end });
      });
      setBusy(map);
      setBusyLoaded(true);
      return map;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    // Initial load + refresh every minute while the form is open
    void loadBusy();
    const id = setInterval(loadBusy, 60000);
    return () => clearInterval(id);
  }, [loadBusy]);

  // ---- Calendar ----
  const days = useMemo(() => bookableDays(), []);
  const bookable = useMemo(() => {
    const map = new Map<string, number>();
    days.forEach((d) => map.set(d.key, slotsFor(d, duration, busy[d.key]).length));
    return map;
  }, [days, duration, busy]);

  const today = colomboNow();
  const [view, setView] = useState({ year: today.year, month: today.month });
  const firstDay = days[0];
  const lastDay = days[days.length - 1];
  const canPrev = view.year > firstDay.year || view.month > firstDay.month;
  const canNext = view.year < lastDay.year || view.month < lastDay.month;

  const monthCells = useMemo(() => {
    const first = makeDay(view.year, view.month, 1);
    const daysInMonth = new Date(Date.UTC(view.year, view.month + 1, 0)).getUTCDate();
    const cells: (ReturnType<typeof makeDay> | null)[] = Array(first.weekday).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(makeDay(view.year, view.month, d));
    return cells;
  }, [view]);

  const shiftMonth = (delta: number) =>
    setView(({ year, month }) => {
      const d = new Date(Date.UTC(year, month + delta, 1));
      return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
    });

  const selectedDay = dateKey ? parseKey(dateKey) : null;
  const slots = selectedDay ? slotsFor(selectedDay, duration, busy[selectedDay.key]) : [];
  // If the picked time became unavailable (e.g. someone else booked it), treat it as unselected
  const time = pickedTime !== null && slots.includes(pickedTime) ? pickedTime : null;
  const setTime = setPickedTime;

  const changeDuration = (d: number) => setDuration(d);

  // ---- Submission ----
  const ready = Boolean(spot && selectedDay && time !== null);
  const locationText = spot ? `${spot.name}, ${spot.address}` : '';
  const whenText =
    selectedDay && time !== null
      ? `${formatDayLong(selectedDay)} · ${formatTime(time)} – ${formatTime(time + duration)} (Sri Lanka time)`
      : '';

  const eventTitle = isDate
    ? `💖 Date with ${COFFEE_CONFIG.ownerName}${form.name ? ` & ${form.name}` : ''}`
    : `Coffee with ${COFFEE_CONFIG.ownerName}${form.name ? ` & ${form.name}` : ''}`;

  const calendarLink =
    ready && selectedDay && time !== null && spot
      ? googleCalendarUrl({
          day: selectedDay,
          start: time,
          duration,
          title: eventTitle,
          details: [
            form.topic && `${isDate ? 'Sweet note / vibe' : 'Topic'}: ${form.topic}`,
            form.message,
            `Map: ${mapLinkUrl(spot.query)}`,
            isDate ? 'Booked via secret /datewithme invite 💖' : `Booked via ${COFFEE_CONFIG.pageUrl}`,
          ]
            .filter(Boolean)
            .join('\n\n'),
          location: locationText,
        })
      : '';

  const mailtoLink = `mailto:${COFFEE_CONFIG.ownerEmail}?subject=${encodeURIComponent(
    isDate ? `💖 Our date – ${form.name}` : `Coffee meeting request – ${form.name}`
  )}&body=${encodeURIComponent(
    `Hi Rusira,\n\n${
      isDate ? "I'd love to go on this date with you! 💖" : "I'd love to meet for coffee."
    }\n\nWhen: ${whenText}\nWhere: ${locationText}\n${isDate ? 'Vibe / cravings' : 'Topic'}: ${form.topic}\n\n${form.message}\n\n${form.name}\n${form.email}\n${form.phone}`
  )}`;

  const whatsappText = [
    isDate ? `Hi Rusira! 💖 It's a date!` : `Hi Rusira! ☕ I'd love to meet for coffee.`,
    ``,
    `👤 *Name:* ${form.name}`,
    `📅 *When:* ${whenText}`,
    `📍 *Where:* ${locationText}`,
    spot ? `🗺️ *Map:* ${mapLinkUrl(spot.query)}` : '',
    `✨ *${isDate ? 'Cravings / Vibe' : 'Topic'}:* ${form.topic}`,
    form.message ? `💬 *Note:* ${form.message}` : '',
    `📧 *Email:* ${form.email}`,
    form.phone ? `📱 *Phone:* ${form.phone}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappLink = `https://wa.me/${COFFEE_CONFIG.ownerWhatsApp}?text=${encodeURIComponent(whatsappText)}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || !selectedDay || time === null || !spot) {
      setError(`Please pick a ${isDate ? 'date spot' : 'coffee spot'}, a date and a time first.`);
      return;
    }
    setError('');
    setStatus('sending');

    // 1) Reserve the slot so nobody else (on /coffeewithme OR /datewithme) can book an overlapping time.
    let reserved = false;
    let cancel = '';
    try {
      const res = await fetch(`${COFFEE_CONFIG.bookingApi}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDay.key,
          start: time,
          duration,
          name: form.name,
          email: form.email,
          phone: form.phone,
          topic: isDate ? `[DATE 💖] ${form.topic}` : form.topic,
          message: form.message,
          spotId: spot.id,
          location: locationText,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409 || res.status === 400) {
        setError(data.error || 'That time is no longer available. Please choose another slot.');
        setStatus('idle');
        void loadBusy();
        return;
      }
      if (res.ok) {
        reserved = true;
        cancel = data.cancelUrl || '';
      }
    } catch {
      // Booking API unreachable — fall through and still send the request by email.
    }

    // Snapshot details now: once busy slots refresh, the booked time disappears from the picker.
    setConfirmed({ when: whenText, where: locationText, calendarLink, mailto: mailtoLink, whatsappLink });
    setCancelUrl(cancel);

    // 2) Open WhatsApp automatically so Rusira (+94705170403) gets an instant WhatsApp message
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');

    // 3) Also notify Rusira by email in the background.
    try {
      const res = await fetch(COFFEE_CONFIG.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: isDate
            ? `💖 It's a DATE with ${form.name}! – ${formatDayLong(selectedDay)}`
            : `☕ Coffee request from ${form.name} – ${formatDayLong(selectedDay)}`,
          _template: 'table',
          _replyto: form.email,
          Type: isDate ? '💖 Romantic Date (/datewithme)' : '☕ Coffee Meeting (/coffeewithme)',
          Name: form.name,
          Email: form.email,
          Phone: form.phone || '—',
          [isDate ? 'Cravings / Vibe' : 'Topic']: form.topic || '—',
          When: whenText,
          Where: locationText,
          Map: mapLinkUrl(spot.query),
          Message: form.message || '—',
          'Slot reserved': reserved ? 'Yes – synced & blocked across Coffee + Date pages' : '⚠ No – booking API unavailable, check for clashes',
          'Add to calendar': calendarLink,
          ...(cancel ? { 'Cancel / free this slot': cancel } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error();
      setStatus('sent');
    } catch {
      // Even if FormSubmit hasn't been activated yet, WhatsApp has opened & the confirmation screen has both buttons.
      setStatus('sent-no-email');
    }
    if (reserved) void loadBusy();
  };

  const reset = () => {
    setStatus('idle');
    setSpot(null);
    setDateKey(null);
    setTime(null);
    setConfirmed(null);
    setCancelUrl('');
    setForm({ name: invitedName, email: '', phone: '', topic: '', message: '' });
  };

  // ---- Success screen ----
  if ((status === 'sent' || status === 'sent-no-email') && confirmed) {
    const { when, where, calendarLink: confirmedCalendar, mailto, whatsappLink: confirmedWhatsApp } = confirmed;
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${theme.cardShell} mx-auto max-w-xl p-8 text-center`}
      >
        <span
          className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${
            isDate ? 'bg-rose-500/20 text-rose-400 shadow-[0_0_30px_-5px_rgba(244,63,94,0.7)]' : 'bg-emerald-500/15 text-emerald-400'
          }`}
        >
          {isDate ? <Heart size={30} className="fill-rose-400/30" /> : <Check size={30} />}
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-white">
          {isDate ? "It's a date! 💖" : cancelUrl ? 'Slot reserved!' : 'Request ready!'}
        </h3>
        <p className="mt-2 text-zinc-400">
          {isDate ? (
            <>
              Can&apos;t wait to see you, {form.name.split(' ')[0]}!{' '}
              {cancelUrl ? 'Our time is locked in — ' : ''}send the WhatsApp message that just opened to confirm ✨
            </>
          ) : (
            <>
              Thanks {form.name.split(' ')[0]} — {cancelUrl ? 'this time is now held for you. ' : ''}tap send in WhatsApp or email to confirm.
            </>
          )}
        </p>
        <div className="mt-6 space-y-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-left text-sm text-zinc-300">
          <p className="flex gap-2">
            <CalendarDays size={16} className={`mt-0.5 shrink-0 ${isDate ? 'text-rose-400' : 'text-accent-light'}`} />
            {when}
          </p>
          <p className="flex gap-2">
            <MapPin size={16} className={`mt-0.5 shrink-0 ${isDate ? 'text-rose-400' : 'text-accent-light'}`} />
            {where}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={confirmedWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)] transition hover:bg-emerald-500"
          >
            <MessageCircle size={17} /> Send on WhatsApp
          </a>
          <a
            href={confirmedCalendar}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition ${
              isDate ? theme.submitBtn : 'btn-primary'
            }`}
          >
            <CalendarPlus size={17} /> Add to Google Calendar
          </a>
          {status === 'sent-no-email' && (
            <a href={mailto} className="btn-ghost justify-center">
              <Mail size={16} /> Send via Email
            </a>
          )}
          <button onClick={reset} className="btn-ghost justify-center">
            {isDate ? 'Pick another date' : 'Book another'}
          </button>
        </div>
        {cancelUrl && (
          <p className="mt-5 text-xs text-zinc-500">
            Plans changed?{' '}
            <a href={cancelUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 underline hover:text-white">
              {isDate ? 'Reschedule / cancel' : 'Cancel this booking'}
            </a>{' '}
            to free the slot.
          </p>
        )}
      </motion.div>
    );
  }

  const sectionTitle = (n: number, title: string, Icon: typeof Coffee) => (
    <div className="mb-4 flex items-center gap-3">
      <span className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold text-white ${theme.badgeBg}`}>
        {n}
      </span>
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
        <Icon size={18} className={theme.iconColor} /> {title}
      </h3>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Availability banner */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`chip ${theme.chip}`}>
          <Clock size={13} /> {AVAILABILITY.weekday.label}
        </span>
        <span className={`chip ${theme.chip}`}>
          <Clock size={13} /> {AVAILABILITY.weekend.label}
        </span>
        <span className="text-zinc-500">All times in Sri Lanka time (GMT+5:30)</span>
      </div>

      {/* 1. Place */}
      <section className={`${theme.cardShell} ${compact ? 'p-5' : 'p-6 sm:p-8'}`}>
        {sectionTitle(1, isDate ? 'Pick our date spot' : 'Pick a coffee spot', isDate ? Heart : Coffee)}

        <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1">
          {COFFEE_AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAreaId(a.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all ${
                a.id === areaId
                  ? theme.pillActive
                  : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {a.name}
              <span className="ml-1.5 text-[11px] text-zinc-500">{a.spots.length}</span>
            </button>
          ))}
        </div>

        <div className={`grid gap-4 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
          {area.spots.map((s) => {
            const active = spot?.id === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSpot(s)}
                className={`group overflow-hidden rounded-2xl border text-left transition-all ${
                  active ? theme.cardActive : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="relative h-32 overflow-hidden bg-ink-800">
                  <iframe
                    title={`Map of ${s.name}`}
                    src={mapEmbedUrl(s.query, 15)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    className="pointer-events-none h-[calc(100%+60px)] w-full -translate-y-[30px] border-0 opacity-90 grayscale-[30%] transition group-hover:grayscale-0"
                  />
                  {active && (
                    <span className={`absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-white shadow ${theme.checkBadge}`}>
                      {isDate ? <Heart size={14} className="fill-white" /> : <Check size={15} />}
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <div className="font-medium text-white">{s.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin size={11} /> {s.address}
                  </div>
                  <div className="mt-1.5 text-xs text-zinc-400">{s.vibe}</div>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {spot && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className={`mt-5 overflow-hidden rounded-2xl border ${theme.mapBorder}`}>
                <iframe
                  key={spot.id}
                  title={`Selected: ${spot.name}`}
                  src={mapEmbedUrl(spot.query, 16)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                  allowFullScreen
                />
                <div className={`flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm ${theme.mapBarBg}`}>
                  <span className="text-zinc-200">
                    <span className={theme.accentText}>{isDate ? 'Our spot:' : 'Selected:'}</span> {spot.name}, {spot.address}
                  </span>
                  <a
                    href={mapLinkUrl(spot.query)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 ${theme.accentLink}`}
                  >
                    Open in Google Maps <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. Date & time */}
      <section className={`${theme.cardShell} ${compact ? 'p-5' : 'p-6 sm:p-8'}`}>
        {sectionTitle(2, isDate ? 'When shall we meet?' : 'Choose a date & time', CalendarDays)}

        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-zinc-400">Duration:</span>
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => changeDuration(d)}
              className={`rounded-lg border px-3 py-1.5 transition ${
                d === duration ? theme.pillActive : 'border-white/10 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {d} min
            </button>
          ))}
        </div>

        <div className={`grid gap-6 ${compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[1.1fr_1fr]'}`}>
          {/* Month grid */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => shiftMonth(-1)}
                className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                aria-label="Previous month"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-display font-semibold text-white">
                {MONTHS[view.month]} {view.year}
              </span>
              <button
                type="button"
                disabled={!canNext}
                onClick={() => shiftMonth(1)}
                className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                aria-label="Next month"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-zinc-500">
              {WEEKDAY_LABELS.map((w) => (
                <div key={w} className="py-1">{w}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthCells.map((cell, i) => {
                if (!cell) return <div key={`e${i}`} />;
                const count = bookable.get(cell.key) ?? 0;
                const enabled = count > 0;
                const active = cell.key === dateKey;
                return (
                  <button
                    key={cell.key}
                    type="button"
                    disabled={!enabled}
                    onClick={() => {
                      setDateKey(cell.key);
                      setTime(null);
                    }}
                    className={`relative aspect-square rounded-xl text-sm transition ${
                      active ? theme.dayActive : enabled ? theme.dayHover : 'cursor-not-allowed text-zinc-700'
                    }`}
                  >
                    {cell.day}
                    {enabled && !active && (
                      <span
                        className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                          cell.isWeekend ? theme.weekendDot : theme.weekdayDot
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex gap-4 text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${theme.weekdayDot}`} /> Weekday evening</span>
              <span className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${theme.weekendDot}`} /> Weekend daytime</span>
            </div>
            {busyLoaded && (
              <p className="mt-2 text-[11px] text-zinc-500">
                {isDate ? 'Synced live with my schedule — busy times are hidden.' : 'Times already booked by others are hidden.'}
              </p>
            )}
          </div>

          {/* Slots */}
          <div>
            {selectedDay ? (
              <>
                <div className="mb-3 text-sm text-zinc-300">{formatDayLong(selectedDay)}</div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded-xl border px-2 py-2.5 text-sm transition ${
                        t === time ? theme.slotActive : theme.slotHover
                      }`}
                    >
                      {formatTime(t)}
                    </button>
                  ))}
                </div>
                {time !== null && (
                  <p className={`mt-4 text-sm ${theme.accentText}`}>
                    {formatTime(time)} – {formatTime(time + duration)}
                  </p>
                )}
              </>
            ) : (
              <div className="grid h-full min-h-[10rem] place-items-center rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-500">
                Select a highlighted day to see open time slots.
              </div>
            )}
          </div>
        </div>

        {COFFEE_CONFIG.bookingCalendarUrl && (
          <a
            href={COFFEE_CONFIG.bookingCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-flex items-center gap-2 text-sm ${theme.accentLink}`}
          >
            <CalendarDays size={15} /> Prefer my booking calendar? Open it here <ExternalLink size={13} />
          </a>
        )}
      </section>

      {/* 3. Details */}
      <section className={`${theme.cardShell} ${compact ? 'p-5' : 'p-6 sm:p-8'}`}>
        {sectionTitle(3, isDate ? 'A little note from you' : 'Your details', isDate ? Sparkles : Mail)}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Your name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Email (for calendar invite)" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Phone / WhatsApp (optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          <Input
            label={isDate ? 'Favourite drink or sweet treat? ✨' : 'What would you like to chat about?'}
            name="topic"
            value={form.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="coffee-message" className="mb-2 block text-sm font-medium text-zinc-300">
            {isDate ? 'Leave me a sweet note (optional) 💌' : 'Anything else? (optional)'}
          </label>
          <textarea
            id="coffee-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder={isDate ? 'Tell me what you are in the mood for…' : 'A bit of context helps me prepare…'}
            className="glass-input resize-none"
          />
        </div>

        {ready && (
          <div className={`mt-5 space-y-1.5 rounded-2xl border p-4 text-sm text-zinc-300 ${theme.summaryBox}`}>
            <p className="flex gap-2"><CalendarDays size={15} className={`mt-0.5 shrink-0 ${theme.iconColor}`} />{whenText}</p>
            <p className="flex gap-2"><MapPin size={15} className={`mt-0.5 shrink-0 ${theme.iconColor}`} />{locationText}</p>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}
        {status === 'error' && (
          <p className="mt-4 text-sm text-rose-400">
            Couldn&apos;t send automatically.{' '}
            <a href={mailtoLink} className="underline hover:text-rose-300">Send it by email instead</a>.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={status === 'sending'}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition disabled:opacity-70 ${theme.submitBtn}`}
          >
            {status === 'sending' ? (
              <Loader2 size={17} className="animate-spin" />
            ) : isDate ? (
              <Heart size={17} className="fill-white/80" />
            ) : (
              <Send size={17} />
            )}
            {status === 'sending' ? 'Sending…' : isDate ? "It's a date! Lock it in 💖" : 'Request coffee meeting'}
          </motion.button>
          {ready && (
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-zinc-200 transition ${theme.calBtnHover}`}
            >
              <CalendarPlus size={17} /> Google Calendar invite
            </a>
          )}
        </div>
      </section>

      {!isDate && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-zinc-500">
          <Link2 size={12} /> Direct link:{' '}
          <a href="/coffeewithme" className="text-amber-300/80 hover:text-amber-200">
            rusirasandul.online/coffeewithme
          </a>
        </p>
      )}
    </form>
  );
};

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, type = 'text', value, required, onChange }: InputProps) => (
  <div>
    <label htmlFor={`coffee-${name}`} className="mb-2 block text-sm font-medium text-zinc-300">
      {label}
    </label>
    <input
      id={`coffee-${name}`}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="glass-input"
    />
  </div>
);

export default CoffeeBooking;
