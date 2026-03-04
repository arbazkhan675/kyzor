export const adminStats = [
  { label: "Total Bookings", value: "38" },
  { label: "New Bookings", value: "5" },
  { label: "Pending Submissions", value: "7" },
  { label: "Active Tasks", value: "12" },
];

export type BookingStatus = "New" | "Contacted" | "Closed";
export const initialBookings = [
  { id: "b1", name: "Ava Stone", company: "Stone Labs", email: "ava@stone.io", status: "New" as BookingStatus, date: "Mar 03" },
  { id: "b2", name: "Noah Park", company: "Park Agency", email: "noah@park.co", status: "Contacted" as BookingStatus, date: "Mar 01" },
  { id: "b3", name: "Mina Lee", company: "Lee Studio", email: "mina@lee.studio", status: "Closed" as BookingStatus, date: "Feb 28" },
];

export type TaskStatus = "Pending" | "Submitted" | "Approved" | "Rejected";
export const initialAdminTasks = [
  { id: "t1", title: "Draft outreach email sequence", description: "Write a 5-email sequence for agencies.", intern: "Sam", deadline: "Mar 06", status: "Pending" as TaskStatus },
  { id: "t2", title: "Competitor research summary", description: "Summarize 5 competitors and their specific positioning.", intern: "Alex", deadline: "Mar 08", status: "Submitted" as TaskStatus },
];

export const interns = ["Andleeb", "Sam", "Alex", "Taylor", "Jordan"];

export const initialSubmissions = [
  { id: "s1", intern: "Alex", task: "Competitor research summary", date: "Mar 02", status: "Pending" as const },
  { id: "s2", intern: "Taylor", task: "Landing page copy improvements", date: "Feb 27", status: "Approved" as const },
];

export const initialMaterials = [
  { id: "m1", title: "KYZOR onboarding handbook.pdf" },
  { id: "m2", title: "n8n basics checklist.pdf" },
];

export const initialAnnouncements = [
  { id: "a1", title: "Weekly check-in", message: "Submit task updates every Friday by 5 PM.", expiry: "Mar 31" },
];