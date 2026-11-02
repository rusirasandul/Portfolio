import { AVAILABILITY, COFFEE_CONFIG } from '../data/coffeeSpots';

/** Sri Lanka has a fixed UTC+05:30 offset (no DST). */
const COLOMBO_OFFSET_MIN = 330;
const SLOT_STEP_MIN = 30;
/** Minimum notice before a same-day slot, in minutes. */
const MIN_NOTICE_MIN = 60;

export interface DayInfo {
  key: string; // YYYY-MM-DD
  year: number;
  month: number; // 0-11
  day: number;
  weekday: number; // 0 = Sun
  isWeekend: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

export const colomboNow = () => {
  const d = new Date(Date.now() + COLOMBO_OFFSET_MIN * 60000);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth(),
    day: d.getUTCDate(),
    minutes: d.getUTCHours() * 60 + d.getUTCMinutes(),
  };
};

export const makeDay = (year: number, month: number, day: number): DayInfo => {
  const d = new Date(Date.UTC(year, month, day));
  const weekday = d.getUTCDay();
  return {
    key: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
    year: d.getUTCFullYear(),
    month: d.getUTCMonth(),
    day: d.getUTCDate(),
    weekday,
    isWeekend: weekday === 0 || weekday === 6,
  };
};

export const parseKey = (key: string): DayInfo => {
  const [y, m, d] = key.split('-').map(Number);
  return makeDay(y, m - 1, d);
};

/** Bookable window, starting today (Sri Lanka time). */
export const bookableDays = (): DayInfo[] => {
  const now = colomboNow();
  return Array.from({ length: COFFEE_CONFIG.bookingWindowDays }, (_, i) =>
    makeDay(now.year, now.month, now.day + i)
  );
};

export interface BusyInterval {
  start: number;
  end: number;
}

/** Busy intervals grouped by date key. */
export type BusyMap = Record<string, BusyInterval[]>;

/** Start times (minutes from midnight, Sri Lanka time) for a day and meeting length. */
export const slotsFor = (day: DayInfo, durationMin: number, busy: BusyInterval[] = []): number[] => {
  const { start, end } = day.isWeekend ? AVAILABILITY.weekend : AVAILABILITY.weekday;
  const now = colomboNow();
  const isToday = makeDay(now.year, now.month, now.day).key === day.key;
  const slots: number[] = [];
  for (let t = start; t + durationMin <= end; t += SLOT_STEP_MIN) {
    if (isToday && t < now.minutes + MIN_NOTICE_MIN) continue;
    // Skip any slot that overlaps an existing booking
    if (busy.some((b) => t < b.end && t + durationMin > b.start)) continue;
    slots.push(t);
  }
  return slots;
};

export const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${pad(m)} ${suffix}`;
};

export const formatDayLong = (day: DayInfo) =>
  new Date(Date.UTC(day.year, day.month, day.day)).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** UTC stamp (YYYYMMDDTHHMMSSZ) for a Sri Lanka local date + minutes. */
const utcStamp = (day: DayInfo, minutes: number) => {
  const ms =
    Date.UTC(day.year, day.month, day.day, 0, minutes) - COLOMBO_OFFSET_MIN * 60000;
  return new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
};

export interface InviteDetails {
  day: DayInfo;
  start: number;
  duration: number;
  title: string;
  details: string;
  location: string;
}

/** Pre-filled Google Calendar invite with Rusira added as a guest. */
export const googleCalendarUrl = ({ day, start, duration, title, details, location }: InviteDetails) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${utcStamp(day, start)}/${utcStamp(day, start + duration)}`,
    details,
    location,
    ctz: COFFEE_CONFIG.timeZone,
    add: COFFEE_CONFIG.ownerEmail,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

