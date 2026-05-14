# 🔥 Firebase Data Management Guide

This guide explains how to add and manage genuine data in Firestore for every module in the HR Dashboard.

---

## 1. Dashboard KPI Metrics (Top Cards)
These are the high-level numbers at the top of your overview page.

*   **Location**: Collection `metrics`, Document `dashboard`
*   **Fields**:
    *   `totalHeadcount`: (Number) e.g., `1248`
    *   `totalHeadcountDelta`: (Number) e.g., `2.4` (percentage change)
    *   `newHires`: (Number) e.g., `24`
    *   `newHiresDelta`: (Number) e.g., `12`
    *   `attritionRate`: (Number) e.g., `4.2`
    *   `attritionRateDelta`: (Number) e.g., `-0.8`
    *   `onLeaveToday`: (Number) e.g., `32`

---

## 2. Performance Trends (Main Area Chart)
This data powers the "Workforce Performance Trend" chart.

*   **Collection**: `performanceTrend`
*   **Fields**:
    *   `month`: (String) e.g., `"Jan"`, `"Feb"`
    *   `performance`: (Number) 0-100 score
    *   `order`: (Number) e.g., `1`, `2`, `3` (used to sort months chronologically)

---

## 3. OKRs (Progress Bars)
Powers the "Key Performance OKRs" section.

*   **Collection**: `okrs`
*   **Fields**:
    *   `title`: (String) e.g., `"Employee Retention"`
    *   `progress`: (Number) 0-100
    *   `status`: (String) `"on_track"`, `"at_risk"`, or `"completed"`

---

## 4. Skills Analysis (Radar Chart)
Powers the "Skills Distribution" radar chart.

*   **Collection**: `skillsAnalysis`
*   **Fields**:
    *   `subject`: (String) e.g., `"React"`, `"UI/UX"`, `"DevOps"`
    *   `A`: (Number) Score for Top Performers
    *   `B`: (Number) Score for Company Average
    *   `fullMark`: (Number) Usually `150`

---

## 5. Projects (Roadmap Chart & List)
Powers the "Project Roadmap" and can be managed via Excel.

*   **Collection**: `projects`
*   **Fields**:
    *   `name`: (String) Project title
    *   `progress`: (Number) 0-100
    *   `status`: (String) `"In Progress"`, `"On Hold"`, `"Completed"`
    *   `department`: (String) e.g., `"Engineering"`
    *   `teamLead`: (String) Manager name
    *   `startDate`: (String) YYYY-MM-DD
    *   `endDate`: (String) YYYY-MM-DD (Optional)

---

## 6. Employees (Directory & Table)
Your main workforce data.

*   **Collection**: `employees`
*   **Fields**:
    *   `name`: (String) Full name
    *   `email`: (String) Work email
    *   `dept`: (String) e.g., `"Engineering"`, `"HR"`, `"Sales"`
    *   `role`: (String) Job title
    *   `status`: (String) `"active"`, `"on_leave"`, `"terminated"`
    *   `joinDate`: (String) YYYY-MM-DD

---

## 🚀 Easy Ways to Add Data

### A. The Excel Tool (Recommended)
The easiest way to add bulk data for **Employees** or **Projects**:
1.  Go to the **Employees** page.
2.  In the Excel bar, select your collection (e.g., "Users" or "Projects").
3.  Click **Download Template**.
4.  Fill the Excel file with your genuine data.
5.  Click **Import Excel** to upload everything to Firestore instantly.

### B. Bulk Seeding Script
If you want to reset your database with sample genuine data:
1.  Open `scripts/seed-data.ts`.
2.  Update the arrays with your data.
3.  Run the seed function (usually triggered via a hidden dev button or CLI).

## 🛡️ Data Validation (Zod)
The system now uses enterprise-grade validation via **Zod**. Every entry must follow these rules:

| Field | Validation Rule |
| :--- | :--- |
| **Email** | Must be a valid email format. |
| **Status** | Must be `active`, `on_leave`, or `terminated`. |
| **Dates** | Must be in `YYYY-MM-DD` format. |
| **Progress** | Must be a number between `0` and `100`. |

---

## ⚡ Real-Time Streaming
You no longer need to refresh the page. The dashboard uses **Firestore onSnapshot** (WebSocket equivalent):
*   **Instant Updates**: Changes in the database are pushed to all connected users in milliseconds.
*   **Memory Safe**: All listeners are automatically cleaned up when navigating to prevent leaks.
