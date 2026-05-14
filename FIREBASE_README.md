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
4.  Start in **Test mode** for initial development (remember to update rules for production).
5.  Click **Enable**.

## How to use in the project

The Firebase setup is located in `lib/firebase/`.

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

```typescript
import { employeesCollection } from '@/lib/firebase/collections';
import { getDocs } from 'firebase/firestore';

// Example: Fetching all employees
const snapshot = await getDocs(employeesCollection);
const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```
