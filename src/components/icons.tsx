// Small inline icon set (stroke 1.6, 20px grid). Decorative unless labelled by the caller.
type P = { className?: string };
const base = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const IconCheck = ({ className }: P) => (<svg {...base} className={className}><path d="M4.5 10.5l3.2 3.2 7.8-7.9" /></svg>);
export const IconArrow = ({ className }: P) => (<svg {...base} className={className}><path d="M4 10h11M11 6l4 4-4 4" /></svg>);
export const IconDown = ({ className }: P) => (<svg {...base} className={className}><path d="M6 8l4 4 4-4" /></svg>);
export const IconPlus = ({ className }: P) => (<svg {...base} className={className}><path d="M10 4.5v11M4.5 10h11" /></svg>);
export const IconHand = ({ className }: P) => (<svg {...base} className={className}><path d="M7.5 9.5V4.8a1.3 1.3 0 012.6 0v4.2M10.1 8.6V3.8a1.3 1.3 0 012.6 0v5M12.7 8.8V5.5a1.3 1.3 0 012.6 0v6.3c0 3.2-2.3 5.7-5.4 5.7-2.2 0-3.6-1-4.7-2.8l-2-3.4a1.3 1.3 0 012.2-1.3l1.1 1.6" /></svg>);
export const IconSpark = ({ className }: P) => (<svg {...base} className={className}><path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.3 5.3l2 2M12.7 12.7l2 2M14.7 5.3l-2 2M7.3 12.7l-2 2" /></svg>);
export const IconLock = ({ className }: P) => (<svg {...base} className={className}><rect x="4.5" y="9" width="11" height="8" rx="2" /><path d="M7 9V6.8a3 3 0 016 0V9" /></svg>);
export const IconMail = ({ className }: P) => (<svg {...base} className={className}><rect x="3" y="5" width="14" height="10.5" rx="2" /><path d="M3.5 6l6.5 5 6.5-5" /></svg>);
export const IconUser = ({ className }: P) => (<svg {...base} className={className}><circle cx="10" cy="7" r="3" /><path d="M4 16.5c.9-2.8 3.2-4.3 6-4.3s5.1 1.5 6 4.3" /></svg>);
export const IconDoc = ({ className }: P) => (<svg {...base} className={className}><path d="M6 3h5.5L15 6.5V16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" /><path d="M11 3v4h4M7.5 10.5h5M7.5 13.5h3.5" /></svg>);
export const IconCalendar = ({ className }: P) => (<svg {...base} className={className}><rect x="3.5" y="4.5" width="13" height="12" rx="2" /><path d="M3.5 8.5h13M7 3v3M13 3v3" /></svg>);
export const IconClock = ({ className }: P) => (<svg {...base} className={className}><circle cx="10" cy="10" r="6.5" /><path d="M10 6.5V10l2.5 1.5" /></svg>);
