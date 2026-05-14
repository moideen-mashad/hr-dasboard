# 📊 Firestore Data Management

This guide explains how to manage your dashboard data, including manual entries and bulk uploads.

## 1. Manual Data Entry (Firebase Console)

The easiest way to add a few items is directly through the Firebase Console.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Select your project and go to **Firestore Database**.
3.  Click **Start collection** or select an existing collection (e.g., `projects`).
4.  Click **Add document**.
5.  Set **Document ID** to "Auto-ID".
6.  Add fields according to the schema (see `FIREBASE_README.md` for exact field names and types).

> [!NOTE]
> Ensure types are correct (e.g., `progress` must be a **Number**, not a String).

---

## 2. Bulk Upload (JSON/Script)

If you have a lot of data, manual entry is tedious. You have two main options:

### Option A: Using the Seed Script
I have included a seeding utility in `scripts/seed-data.ts`. You can use this as a template to upload your own data.

To use it, you can create a temporary page or a button in your app that calls `seedDatabase()`, or run it via a terminal if you have a Node environment set up to handle TypeScript.

**Example usage in a React component:**
```typescript
import { seedDatabase } from '@/scripts/seed-data';

// ... inside a component or button handler
<button onClick={() => seedDatabase()}>
  Seed Database with Sample Data
</button>
```

### Option B: Import via Third-Party Tools
Firebase Console does not natively support JSON/CSV imports for Firestore (it only does for Realtime Database). However, you can use these popular tools:

1.  **[Firefoo](https://firefoo.app/)**: A powerful GUI for Firestore that supports CSV/JSON import/export.
2.  **[Firebase Import/Export (NPM)](https://www.npmjs.com/package/node-firestore-import-export)**: A command-line tool.
3.  **Google Cloud Console**: If you use BigQuery or Cloud Storage, you can import data into Firestore via the Google Cloud CLI.

---

## 3. Data Schema Quick Reference

Make sure your data matches these schemas for the charts to display correctly:

### Dashboard KPI Metrics
*   **Collection**: `metrics`
*   **Document ID**: `dashboard`
*   **Fields**:
    *   `totalHeadcount` (number)
    *   `totalHeadcountDelta` (number)
    *   `newHires` (number)
    *   `newHiresDelta` (number)
    *   `attritionRate` (number)
    *   `attritionRateDelta` (number)
    *   `onLeaveToday` (number)

### Projects
*   **Collection**: `projects`
*   **Fields**:
    *   `name` (string)
    *   `progress` (number, 0-100)
    *   `status` (string: "In Progress", "Completed", "On Hold", "Delayed")
    *   `department` (string)

### Performance Trend
*   **Collection**: `performanceTrend`
*   **Fields**:
    *   `name` (string: "Jan", "Feb", etc.)
    *   `performance` (number)
    *   `order` (number: 1, 2, 3... for sorting)

### OKRs
*   **Collection**: `okrs`
*   **Fields**:
    *   `title` (string)
    *   `progress` (number, 0-100)
    *   `status` (string: "on_track", "at_risk", "completed")

### Skills Analysis
*   **Collection**: `skillsAnalysis`
*   **Fields**:
    *   `subject` (string: "React", "DevOps", etc.)
    *   `A` (number: Top Performers score)
    *   `B` (number: Company Average score)
    *   `fullMark` (number: usually 150)
