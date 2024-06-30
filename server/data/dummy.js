const adminData = {
  totalUsers: 150,
  activeUsers: 120,
  inactiveUsers: 30,
  reportsGenerated: 45,
  systemAlerts: [
    { id: 1, message: "System update required", severity: "high" },
    { id: 2, message: "New user registrations disabled", severity: "medium" },
  ],
};

// Dummy data for Viewer Dashboard
const viewerData = {
  recentViews: [
    { id: 1, title: "Annual Sales Report", viewedOn: "2023-04-10" },
    { id: 2, title: "Monthly Performance Analysis", viewedOn: "2023-04-07" },
  ],
  favorites: [
    { id: 1, title: "Product Trends 2023" },
    { id: 2, title: "Competitor Analysis Q1" },
  ],
};

// Dummy data for Editor Dashboard
const editorData = {
  drafts: [
    { id: 1, title: "Draft 1: Market Overview", lastEdited: "2023-04-05" },
    {
      id: 2,
      title: "Draft 2: Investment Opportunities",
      lastEdited: "2023-04-03",
    },
  ],
  published: [
    { id: 1, title: "2023 Industry Predictions", publishedOn: "2023-03-20" },
    { id: 2, title: "Q1 Earnings Report", publishedOn: "2023-03-15" },
  ],
};

export { adminData, viewerData, editorData };
