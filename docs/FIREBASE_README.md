# Firebase Connection Guide

This project uses Firebase for Authentication and Firestore as its database. Follow these steps to connect your project to Firebase.

## 1. Setup Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **Add Project** and follow the setup wizard.
3.  Once the project is created, click the **Web icon (</>)** to register a new web app.
4.  Enter an app nickname and click **Register app**.
5.  You will see a `firebaseConfig` object. Keep this open, as you will need these values for your environment variables.

## 2. Configure Environment Variables

Create a file named `.env.local` in the root of your project and add the following variables using the values from your Firebase project settings:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> [!IMPORTANT]
> Never commit your `.env.local` file to version control. It is already included in `.gitignore`.

## 3. Enable Authentication (Google)

1.  In the Firebase Console, go to **Build > Authentication**.
2.  Click **Get Started**.
3.  In the **Sign-in method** tab, click **Add new provider** and select **Google**.
4.  Enable it, select a project support email, and click **Save**.

## 4. Enable Firestore Database

1.  In the Firebase Console, go to **Build > Firestore Database**.
2.  Click **Create database**.
3.  Select a location and click **Next**.
4.  Start in **Test mode** for initial development.
5.  Click **Enable**.

## 5. Firestore Data Schema & Bulk Upload

> [!TIP]
> For instructions on how to add data manually via the console or perform bulk uploads (seeding), see **[DATA_MANAGEMENT.md](./DATA_MANAGEMENT.md)**.

To see the dashboard charts populated, manually add these collections and documents in the Firebase Console:

### `projects` (Collection)
| Field | Type | Example |
| :--- | :--- | :--- |
| `name` | string | "Cloud Migration" |
| `progress` | number | 75 |
| `status` | string | "In Progress", "Completed", "On Hold", "Delayed" |
| `department`| string | "IT" |

### `performanceTrend` (Collection)
| Field | Type | Example |
| :--- | :--- | :--- |
| `name` | string | "Jan", "Feb", etc. |
| `performance`| number | 85 |
| `order` | number | 1, 2, 3 (to keep months in order) |

### `okrs` (Collection)
| Field | Type | Example |
| :--- | :--- | :--- |
| `title` | string | "Increase Revenue" |
| `progress` | number | 60 |
| `status` | string | "on_track", "at_risk", "completed" |

### `skillsAnalysis` (Collection)
| Field | Type | Example |
| :--- | :--- | :--- |
| `subject` | string | "React", "Node.js", etc. |
| `A` | number | 120 (Top Performers) |
| `B` | number | 80 (Company Avg) |

---

## How to use in the project

### Configuration
`lib/firebase/config.ts` initializes the Firebase app and exports the `auth` and `db` (Firestore) instances.

### Authentication
You can use the helper functions in `lib/firebase/auth.ts`:

```typescript
import { signInWithGoogle, signOutUser } from '@/lib/firebase/auth';

// Sign in
const user = await signInWithGoogle();

// Sign out
await signOutUser();
```

### Firestore Collections
Common collections are defined in `lib/firebase/collections.ts`. This ensures type safety when interacting with Firestore.

import { employeesCollection } from '@/lib/firebase/collections';
import { onSnapshot } from 'firebase/firestore';

// Example: Real-time listener for employees
const unsubscribe = onSnapshot(employeesCollection, (snapshot) => {
  const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Real-time data:", employees);
});

// Always unsubscribe when cleaning up
// unsubscribe();
