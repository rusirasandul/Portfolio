// Coffee-meeting configuration: availability, contact and curated meeting spots.

export const COFFEE_CONFIG = {
  ownerName: 'Rusira Sandul',
  ownerEmail: 'rusirasandulhw@gmail.com',
  /** WhatsApp number in international format (digits only, no '+') for instant booking messages */
  ownerWhatsApp: '94705170403',
  /** Public direct-access page */
  pageUrl: 'https://rusirasandul.online/coffeewithme',
  /** Private romantic date page — only viewable with `?invite=<dateInviteCode>` */
  datePageUrl: 'https://rusirasandul.online/datewithme',
  /**
   * Secret invite code required to view `/datewithme`.
   * Share the full link: https://rusirasandul.online/datewithme?invite=rusira-xoxo
   * (You can change this code anytime, or add `?for=HerName` to personalise the greeting!)
   */
  dateInviteCode: 'rusira-xoxo',
  /**
   * Email relay used to deliver requests (no backend needed).
   * The very first submission sends an activation email to ownerEmail — click it once.
   */
  formEndpoint: 'https://formsubmit.co/ajax/rusirasandulhw@gmail.com',
  /**
   * Booking API (server/coffee.js on the JARVIS backend). Stores reserved slots
   * so two people can never book overlapping times.
   * Uses localhost:5000 automatically during `npm run dev`, and Vercel in production.
   */
  bookingApi: import.meta.env.DEV
    ? 'http://localhost:5000/api/coffee'
    : 'https://portfolio-ffqi.vercel.app/api/coffee',
  /**
   * Optional: paste a Google Calendar "Appointment schedule" / Calendly link here
   * and a "Book on my calendar" button will appear.
   */
  bookingCalendarUrl: '',
  timeZone: 'Asia/Colombo',
  /** How many days ahead visitors can book */
  bookingWindowDays: 30,
} as const;

/** Availability in Sri Lanka time, minutes from midnight. */
export const AVAILABILITY = {
  weekday: { start: 17 * 60 + 30, end: 22 * 60, label: 'Mon – Fri · 5:30 PM – 10:00 PM' },
  weekend: { start: 10 * 60, end: 16 * 60, label: 'Sat – Sun · 10:00 AM – 4:00 PM' },
} as const;

export interface CoffeeSpot {
  id: string;
  name: string;
  address: string;
  vibe: string;
  /** Text used for the Google Maps lookup */
  query: string;
}

export interface CoffeeArea {
  id: string;
  name: string;
  region: 'Colombo' | 'South Coast';
  spots: CoffeeSpot[];
}

const spot = (id: string, name: string, address: string, vibe: string): CoffeeSpot => ({
  id,
  name,
  address,
  vibe,
  query: `${name}, ${address}, Sri Lanka`,
});

export const COFFEE_AREAS: CoffeeArea[] = [
  {
    id: 'dehiwala',
    name: 'Dehiwala / Mt. Lavinia',
    region: 'Colombo',
    spots: [
      spot('nook-cafe', 'Nook Cafe', 'Mount Lavinia', 'Minimal, plant-filled, specialty coffee'),
      spot('java-mt-lavinia', 'Java Lounge', 'Galle Road, Mount Lavinia', 'Spacious, A/C, open late'),
      spot('barista-dehiwala', 'Barista', 'Hill Street, Dehiwala', 'Quiet corners, quick meetings'),
      spot('sandpit-cafe', 'Sandpit Cafe', 'Mount Lavinia', 'Playful, outdoor seating'),
      spot('lia-cafe', 'Lia Cafe', 'De Saram Road, Dehiwala', 'Cozy neighbourhood favourite'),
      spot('templers-cafe', 'The Templers Cafe', 'Templers Road, Mount Lavinia', 'Relaxed, away from traffic'),
    ],
  },
  {
    id: 'bambalapitiya',
    name: 'Bambalapitiya',
    region: 'Colombo',
    spots: [
      spot('cafe-kinross', 'Café Kinross', '6 Kinross Avenue, Colombo 4', 'Boho, tropical brunch spot'),
      spot('java-bambalapitiya', 'Java Lounge', 'Lauries Road, Bambalapitiya', 'Wi-Fi, plugs, work-friendly'),
      spot('barista-bambalapitiya', 'Barista', 'Station Road, Bambalapitiya', 'Modern, casual catch-ups'),
    ],
  },
  {
    id: 'kollupitiya',
    name: 'Kollupitiya',
    region: 'Colombo',
    spots: [
      spot('brown-sugar', 'Brown Sugar Café & Dessert Bar', 'Kollupitiya, Colombo 3', 'Aesthetic, great desserts'),
      spot('cafe-on-the-5th', 'Café on the 5th', '5th Lane, Colombo 3', 'Colombo classic, long hours'),
      spot('monkey-bean', 'Monkey Bean Cafe', 'Sellamuttu Avenue, Colombo 3', 'Hidden gem, train views'),
      spot('barista-kollupitiya', 'Barista', 'Galle Road, Kollupitiya', 'Reliable, central'),
      spot('whight-co', 'Whight & Co', 'Kollupitiya, Colombo 3', 'Seaside specialty coffee'),
    ],
  },
  {
    id: 'matara',
    name: 'Matara',
    region: 'South Coast',
    spots: [
      spot('meraki-madiha', 'Meraki Café', 'Madiha, Matara', 'Aesthetic, laptop-friendly'),
      spot('mellow-madiha', 'Mellow', 'Madiha, Matara', 'Beachy, smoothie bowls'),
      spot('juice-life-matara', 'Juice Life Urban Eatery', 'Matara', 'Modern, healthy menu'),
      spot('dutchmans-street', "The Dutchman's Street", 'Dutch Fort, Matara', 'Heritage setting by the fort'),
      spot('barista-matara', 'Barista', 'Matara', 'A/C, dependable'),
    ],
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    region: 'South Coast',
    spots: [
      spot('shady-lane', 'Shady Lane', 'Mirissa', 'Airy two-storey surf café'),
      spot('o-mirissa', 'O Mirissa Cafe and Bistro', 'Mirissa', 'Retro tunes, opposite the beach'),
      spot('lost-paradise', 'Lost Paradise', 'Mirissa South', 'Shady garden, nomad favourite'),
      spot('capybara-cafe', 'Capybara Cafe', 'Mirissa', 'Breezy palm garden'),
      spot('koral-cafe', 'Koral Cafe', 'Mirissa', 'Pour-overs & smoothie bowls'),
      spot('shiru-cafe', 'Shiru Cafe', 'Mirissa', 'Specialty coffee & breakfast'),
    ],
  },
  {
    id: 'weligama',
    name: 'Weligama',
    region: 'South Coast',
    spots: [
      spot('nomad-cafe', 'Nomad Café', 'Weligama', 'Stylish, buzzing, top flat whites'),
      spot('plan-b', 'Plan B', 'Weligama', 'Laid-back surfer vibe'),
      spot('java-weligama', 'Java Lounge', 'Weligama', 'A/C, strong Wi-Fi'),
      spot('layback-rooftop', 'Layback Rooftop Café', 'Weligama', 'Rooftop views, post-surf'),
    ],
  },
];

export const mapEmbedUrl = (query: string, zoom = 16) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

export const mapLinkUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

