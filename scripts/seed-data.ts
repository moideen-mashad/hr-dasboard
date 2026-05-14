import { db } from '../lib/firebase/config';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';

// Sample Data
const projects = [
  { name: "Cloud Migration", progress: 75, status: "In Progress", department: "IT" },
  { name: "Global Hiring Q3", progress: 40, status: "In Progress", department: "HR" },
  { name: "Payroll System Upgrade", progress: 100, status: "Completed", department: "Finance" },
  { name: "Office Expansion", progress: 10, status: "On Hold", department: "Operations" },
  { name: "Security Audit", progress: 90, status: "Delayed", department: "Security" }
];

const performanceTrend = [
  { name: "Jan", performance: 65, order: 1 },
  { name: "Feb", performance: 72, order: 2 },
  { name: "Mar", performance: 68, order: 3 },
  { name: "Apr", performance: 85, order: 4 },
  { name: "May", performance: 82, order: 5 },
  { name: "Jun", performance: 90, order: 6 }
];

const okrs = [
  { title: "Reduce Attrition by 5%", progress: 45, status: "on_track" },
  { title: "Increase Training Hours", progress: 80, status: "on_track" },
  { title: "Revamp Performance Reviews", progress: 100, status: "completed" },
  { title: "Hire 50 Engineers", progress: 20, status: "at_risk" }
];

const skillsAnalysis = [
  { subject: 'React', A: 120, B: 110, fullMark: 150 },
  { subject: 'Node.js', A: 98, B: 130, fullMark: 150 },
  { subject: 'UI/UX', A: 86, B: 130, fullMark: 150 },
  { subject: 'TypeScript', A: 99, B: 100, fullMark: 150 },
  { subject: 'Testing', A: 85, B: 90, fullMark: 150 },
  { subject: 'DevOps', A: 65, B: 85, fullMark: 150 },
];
const dashboardMetrics = {
  totalHeadcount: 1248,
  totalHeadcountDelta: 2.4,
  newHires: 24,
  newHiresDelta: 12,
  attritionRate: 4.2,
  attritionRateDelta: -0.8,
  onLeaveToday: 32
};

export const seedDatabase = async () => {
  console.log("Starting database seeding...");

  try {
    const batch = writeBatch(db);

    // Seed Main Metrics
    console.log("Seeding main metrics...");
    const metricsRef = doc(db, "metrics", "dashboard");
    batch.set(metricsRef, dashboardMetrics);

    // Seed Projects
    console.log("Seeding projects...");
    projects.forEach((proj) => {
      const ref = doc(collection(db, "projects"));
      batch.set(ref, proj);
    });

    // Seed Performance Trend
    console.log("Seeding performance trend...");
    performanceTrend.forEach((trend) => {
      const ref = doc(collection(db, "performanceTrend"));
      batch.set(ref, trend);
    });

    // Seed OKRs
    console.log("Seeding OKRs...");
    okrs.forEach((okr) => {
      const ref = doc(collection(db, "okrs"));
      batch.set(ref, okr);
    });

    // Seed Skills
    console.log("Seeding skills analysis...");
    skillsAnalysis.forEach((skill) => {
      const ref = doc(collection(db, "skillsAnalysis"));
      batch.set(ref, skill);
    });

    await batch.commit();
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};
