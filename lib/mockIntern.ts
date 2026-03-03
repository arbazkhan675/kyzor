export const internStats = [
  { label: "Total Tasks", value: "12" },
  { label: "Pending Tasks", value: "4" },
  { label: "Approved Tasks", value: "6" },
  { label: "Upcoming Deadline", value: "Mar 10" },
];

export const tasks = [
  {
    id: "t1",
    title: "Draft outreach email sequence",
    description: "Write a 5-email sequence for agencies selling automation.",
    deadline: "Mar 06",
    status: "Pending",
  },
  {
    id: "t2",
    title: "Competitor research summary",
    description: "Summarize 5 competitors and positioning in 1 page.",
    deadline: "Mar 08",
    status: "Submitted",
  },
  {
    id: "t3",
    title: "Landing page copy improvements",
    description: "Improve hero + service descriptions for clarity.",
    deadline: "Mar 10",
    status: "Approved",
  },
] as const;

export const materials = [
  { id: "m1", title: "KYZOR onboarding handbook.pdf" },
  { id: "m2", title: "n8n basics checklist.pdf" },
  { id: "m3", title: "Client discovery call script.pdf" },
];

export const announcements = [
  {
    id: "a1",
    title: "Weekly check-in",
    message: "Submit task updates every Friday by 5 PM.",
    expiry: "Mar 31",
  },
  {
    id: "a2",
    title: "New template",
    message: "Use the new proposal template for all client drafts.",
    expiry: "Apr 15",
  },
];