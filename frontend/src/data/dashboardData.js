// DO NOT use JSX in data files! Use only plain objects and strings.


export const stats = [
  {
    label: "Active Residents",
    value: 4800,
    icon: "users",
    color: "bg-green-100 text-green-800",
  },
  {
    label: "Inactive Residents",
    value: 440,
    icon: "users",
    color: "bg-red-100 text-red-800",
  },
  {
    label: "Pending Requests",
    value: 32,
    icon: "clipboard-list",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    label: "Upcoming Events",
    value: 5,
    icon: "calendar-plus",
    color: "bg-blue-100 text-blue-800",
  },
];

export const announcements = [
  {
    title: "Barangay Assembly",
    date: "July 17, 2025",
    desc: "Quarterly barangay assembly for all residents at the covered court.",
  },
  {
    title: "Medical Mission",
    date: "July 18, 2025",
    desc: "Free medical checkup and consultation for all residents.",
  },
  {
    title: "Cleanup Drive",
    date: "July 24, 2025",
    desc: "Community cleanup drive. Volunteers are welcome.",
  },
];

export const events = [
  {
    title: "Barangay Assembly",
    date: "2025-07-17",
    time: "9:00 AM",
    color: "#a5d8ff",
  },
  {
    title: "Medical Mission",
    date: "2025-07-18",
    time: "7:00 AM",
    color: "#c3f584",
  },
  {
    title: "Cleanup Drive",
    date: "2025-07-24",
    time: "8:00 AM",
    color: "#ffd6e0",
  },
  {
    title: "Accountant",
    date: "2025-07-24",
    time: "1:45 PM",
    color: "#fff3bf",
  },
  {
    title: "Team Dinner",
    date: "2025-07-30",
    time: "5:30 PM",
    color: "#f1c0e8",
  },
];

export const recentRequests = [
  {
    type: "Barangay Clearance",
    resident: "Juan Santos",
    date: "30 min ago",
    status: "Pending",
  },
  {
    type: "Business Permit",
    resident: "Roberto Gonzales",
    date: "Today, 10:30 AM",
    status: "Processing",
  },
  {
    type: "Complaint",
    resident: "Lorna Dela Peña",
    date: "Yesterday",
    status: "In Review",
  },
  {
    type: "Certificate of Residency",
    resident: "Michael Tan",
    date: "Dec 12, 2023",
    status: "Completed",
  },
  {
    type: "Indigency Certificate",
    resident: "Andrea Reyes",
    date: "Dec 10, 2023",
    status: "Completed",
  },
];
