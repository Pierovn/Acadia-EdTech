// Íconos SVG inline reutilizables (sin dependencias externas).
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconDashboard = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
)

export const IconProfile = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" /></svg>
)

export const IconCourses = (p) => (
  <svg {...base} {...p}><path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z" /><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z" /></svg>
)

export const IconForum = (p) => (
  <svg {...base} {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5A8 8 0 1 1 21 12z" /></svg>
)

export const IconSettings = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 6.8 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.4H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 5 6.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10.6 5h0A1.6 1.6 0 0 0 12 3.1V3a2 2 0 0 1 4 0v.1A1.6 1.6 0 0 0 18.2 5l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8z" /></svg>
)

export const IconMail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)

export const IconLock = (p) => (
  <svg {...base} {...p}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
)

export const IconStar = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.07 1.1-6.47-4.7-4.58 6.5-.95z" /></svg>
)

export const IconLogout = (p) => (
  <svg {...base} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>
)

export const IconCertificate = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="9" r="6" /><path d="M9 14.5 8 22l4-2 4 2-1-7.5" /></svg>
)

export const IconChevron = (p) => (
  <svg {...base} {...p}><path d="m9 18 6-6-6-6" /></svg>
)

export const IconClock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)

export const IconHome = (p) => (
  <svg {...base} {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" /><path d="M9.5 20v-6h5v6" /></svg>
)

export const IconSearch = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
)

export const IconPlus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
)

export const IconMessage = (p) => (
  <svg {...base} {...p}><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-4.5A8 8 0 1 1 21 11.5z" /></svg>
)

export const IconUsers = (p) => (
  <svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" /><path d="M16 5.5a3.5 3.5 0 0 1 0 5.5" /><path d="M18.5 20c0-2.5-1-4.2-3-5" /></svg>
)

// Corazón — se rellena pasando fill="currentColor" stroke="none"
export const IconHeart = (p) => (
  <svg {...base} {...p}><path d="M12 20.5 4.3 13a4.6 4.6 0 0 1 6.5-6.5l1.2 1.2 1.2-1.2A4.6 4.6 0 0 1 19.7 13z" /></svg>
)

export const IconInbox = (p) => (
  <svg {...base} {...p}><path d="M3 13h4l2 3h6l2-3h4" /><path d="M5 6h14l2 7v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z" /></svg>
)

export const IconPlay = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M10 8.5 16 12l-6 3.5z" fill="currentColor" stroke="none" /></svg>
)

export const IconDoc = (p) => (
  <svg {...base} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></svg>
)

export const IconQuiz = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.2a2.5 2.5 0 0 1 4.5 1.4c0 1.6-2 1.9-2 3.2" /><path d="M12 17h.01" /></svg>
)

export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="m5 12 5 5 9-11" /></svg>
)

export const IconCheckCircle = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.3 2.3L15.5 9.5" /></svg>
)

export const IconCreditCard = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></svg>
)

export const IconSmartphone = (p) => (
  <svg {...base} {...p}><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></svg>
)

export const IconShieldLock = (p) => (
  <svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" /><rect x="9.5" y="11" width="5" height="4" rx="1" /><path d="M10.5 11v-1a1.5 1.5 0 0 1 3 0v1" /></svg>
)

/* ===== Íconos de categoría (para thumbnails de cursos) ===== */
export const IconCode = (p) => (
  <svg {...base} {...p}><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m14 5-4 14" /></svg>
)

export const IconDesign = (p) => (
  <svg {...base} {...p}><circle cx="13.5" cy="6.5" r="1.5" /><circle cx="17.5" cy="10.5" r="1.5" /><circle cx="6.5" cy="12.5" r="1.5" /><path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 2-2 1.5 1.5 0 0 1 1.5-1.5H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z" /></svg>
)

export const IconDatabase = (p) => (
  <svg {...base} {...p}><ellipse cx="12" cy="5.5" rx="7" ry="2.8" /><path d="M5 5.5v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /><path d="M5 11.5v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /></svg>
)

export const IconAI = (p) => (
  <svg {...base} {...p}><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9.5 10v4M14.5 10v4M10.5 9.5h3M10.5 14.5h3" /><path d="M12 6V3M9 3h6M4 9.5H3M4 14.5H3M21 9.5h-1M21 14.5h-1M12 18v3M9 21h6" /></svg>
)

export const IconShield = (p) => (
  <svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
)

export const IconNetwork = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="18" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M12 7.2v4.3M12 11.5 6.5 16M12 11.5 17.5 16" /></svg>
)
