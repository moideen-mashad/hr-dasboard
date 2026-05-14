# 🏢 HR Management Dashboard
### Next.js 14 · TypeScript · Tailwind CSS · Firebase · WebSocket

> Senior-grade system design guide. Performance-first. Production-ready.

---

## 📌 Project Overview

Full-stack HR Management Dashboard with real-time data, role-based access, dark/light mode, and aggressive performance optimization. Built for scale.

### 📖 Documentation Links
- **[Firebase Setup Guide](./FIREBASE_README.md)**: How to connect your Firebase account.
- **[Data Management Guide](./FIREBASE_DATA_GUIDE.md)**: How to add data for every module (KPIs, Charts, Employees).
- **[Excel Import/Export Guide](./EXCEL_IMPORT_GUIDE.md)**: Bulk data management via spreadsheets.

**Stack:**
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Auth:** Firebase Authentication (Google, Email/Password, SSO)
- **Excel Support:** Bulk import/export with [Excel/CSV](./EXCEL_IMPORT_GUIDE.md)
- **Database:** Firebase Firestore
- **Real-time:** Firebase WebSocket (Firestore `onSnapshot`) + custom WS layer
- **Cache:** In-memory (React Query) + Browser Cache API + localStorage TTL cache
- **State:** Redux Toolkit (slices, typed hooks)
- **UI Components:** shadcn/ui (owned, copy-paste components)
- **Charts:** Recharts (lazy-loaded)

---

## 📊 Dashboard Modules & Metrics

### 1. 👥 Employee Overview
| Metric | Type | Update |
|---|---|---|
| Total headcount | KPI card | Real-time |
| New hires (this month) | KPI card | Daily |
| Attrition rate (%) | Trend chart | Weekly |
| Dept. breakdown | Donut chart | On filter |
| Active vs On Leave | Status badge | Real-time |

### 2. 📅 Attendance & Leaves
| Metric | Type |
|---|---|
| Check-in/Check-out live feed | WebSocket table |
| Absent today | Real-time counter |
| Leave requests pending | Badge + list |
| Leave utilization by team | Bar chart |
| Monthly attendance heatmap | Grid heatmap |

### 3. 💰 Payroll & Compensation
| Metric | Type |
|---|---|
| Monthly payroll total | KPI |
| Salary band distribution | Histogram |
| Pending payroll approvals | Action list |
| Cost per department | Stacked bar |
| Overtime hours | Line chart |

### 4. 🎯 Performance & OKRs
| Metric | Type |
|---|---|
| Average performance score | Gauge |
| OKR completion % | Progress bars |
| Top performers | Leaderboard |
| Review cycle status | Status pipeline |
| 360° feedback response rate | Ring chart |

### 5. 🔔 Notifications & Activity Feed
- Real-time via Firestore `onSnapshot`
- Leave approvals, new hires, payroll alerts
- WebSocket push for urgent events

---

## 🗂️ Folder Structure

```
hr-dashboard/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Sidebar + Topbar shell
│   │   ├── page.tsx              # Overview
│   │   ├── employees/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── attendance/page.tsx
│   │   ├── payroll/page.tsx
│   │   ├── performance/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   └── ws/route.ts           # WebSocket API route
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── ui/                       # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Table/
│   │   │   ├── Table.tsx
│   │   │   ├── TableRow.tsx
│   │   │   └── useTableSort.ts   # Sort hook
│   │   ├── Chart/
│   │   │   ├── LazyChart.tsx     # Suspense-wrapped lazy chart
│   │   │   └── ChartSkeleton.tsx
│   │   └── Skeleton.tsx
│   │
│   ├── dashboard/                # Feature components
│   │   ├── KPICard.tsx
│   │   ├── AttendanceFeed.tsx    # WebSocket consumer
│   │   ├── EmployeeTable.tsx
│   │   ├── LeaveCalendar.tsx
│   │   └── PayrollChart.tsx
│   │
│   └── layout/
│       ├── Sidebar.tsx
│       ├── Topbar.tsx
│       └── ThemeToggle.tsx
│
├── hooks/
│   ├── useDebounce.ts            # Debounce input
│   ├── useFirestoreQuery.ts      # Firestore + React Query wrapper
│   ├── useWebSocket.ts           # WS connection manager
│   ├── useIntersectionObserver.ts # Viewport mount
│   ├── useAppSelector.ts         # Typed Redux selector
│   └── useAppDispatch.ts         # Typed Redux dispatch
│
├── lib/
│   ├── firebase/
│   │   ├── config.ts             # Firebase init
│   │   ├── auth.ts               # Auth helpers
│   │   ├── firestore.ts          # Firestore helpers
│   │   └── collections.ts        # Collection refs
│   ├── cache/
│   │   ├── localCache.ts         # TTL-based localStorage cache
│   │   └── queryClient.ts        # React Query client config
│   └── utils/
│       ├── formatters.ts
│       └── debounce.ts
│
├── store/
│   ├── index.ts                  # configureStore root
│   ├── authSlice.ts              # Auth state + Firebase user
│   ├── filterSlice.ts            # Global filters (dept, search, sort)
│   └── themeSlice.ts             # Dark/light + localStorage persist
│
├── types/
│   ├── employee.ts
│   ├── attendance.ts
│   ├── payroll.ts
│   └── firebase.ts
│
└── config/
    ├── firebase.ts               # Env var guard
    └── routes.ts                 # Route constants
```

---

## ⚙️ Firebase Setup

> [!TIP]
> For a more detailed step-by-step guide on connecting Firebase, see [FIREBASE_README.md](./FIREBASE_README.md).

### 1. Create Firebase Project
```
1. Go to https://console.firebase.google.com
2. New Project → "hr-dashboard-prod"
3. Enable: Authentication, Firestore, Hosting
```

### 2. Environment Variables
```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

### 3. Firebase Config (`lib/firebase/config.ts`)
```typescript
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

// Prevent duplicate init in dev hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
```

### 4. Firestore Collections Schema
```
/employees/{id}
  name, email, dept, role, status, joinDate, salary, managerId

/attendance/{id}
  employeeId, date, checkIn, checkOut, status

/leaves/{id}
  employeeId, type, startDate, endDate, status, approvedBy

/payroll/{id}
  employeeId, month, baseSalary, bonus, deductions, status

/performance/{id}
  employeeId, cycle, score, goals[], feedback
```

### 5. Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /employees/{id} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.role == 'admin';
    }
    match /attendance/{id} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == resource.data.employeeId
                   || request.auth.token.role == 'admin';
    }
  }
}
```

---

## 🗃️ Redux Store Setup

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import filterSlice from './filterSlice'
import themeSlice from './themeSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    filters: filterSlice.reducer,
    theme: themeSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

```typescript
// hooks/useAppSelector.ts + useAppDispatch.ts
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
```

```typescript
// store/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  dept: string
  search: string
  sortKey: string
  sortDir: 'asc' | 'desc'
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState: { dept: 'all', search: '', sortKey: 'name', sortDir: 'asc' } as FilterState,
  reducers: {
    setDept: (state, action: PayloadAction<string>) => { state.dept = action.payload },
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload },
    setSort: (state, action: PayloadAction<{ key: string; dir: 'asc' | 'desc' }>) => {
      state.sortKey = action.payload.key
      state.sortDir = action.payload.dir
    },
  },
})

export const { setDept, setSearch, setSort } = filterSlice.actions
export default filterSlice
```



### 1. Code Splitting
```typescript
// Lazy-load heavy charts — never in initial bundle
const PayrollChart = dynamic(() => import('@/components/dashboard/PayrollChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // Charts are client-only
})

const EmployeeTable = dynamic(() => import('@/components/dashboard/EmployeeTable'), {
  loading: () => <Skeleton rows={10} />,
})
```

### 2. Viewport Mount (Intersection Observer)
Only mount component when visible. Critical for below-fold charts.
```typescript
// hooks/useIntersectionObserver.ts
export function useIntersectionObserver(ref: RefObject<Element>, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isVisible
}

// Usage in component
const chartRef = useRef<HTMLDivElement>(null)
const isVisible = useIntersectionObserver(chartRef)

return (
  <div ref={chartRef}>
    {isVisible ? <HeavyChart data={data} /> : <ChartSkeleton />}
  </div>
)
```

### 3. Debouncing (Search & Filters)
```typescript
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// EmployeeSearch.tsx
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 400)

useEffect(() => {
  if (debouncedSearch.length > 2) fetchEmployees(debouncedSearch)
}, [debouncedSearch])
```

### 4. WebSocket — Firestore Real-time
```typescript
// hooks/useWebSocket.ts
export function useRealtimeAttendance() {
  const [feed, setFeed] = useState<Attendance[]>([])

  useEffect(() => {
    const q = query(
      collection(db, 'attendance'),
      where('date', '==', today()),
      orderBy('checkIn', 'desc'),
      limit(50)
    )

    // Firestore onSnapshot = WebSocket under hood
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setFeed(data as Attendance[])
    })

    return unsub // Cleanup on unmount
  }, [])

  return feed
}
```

### 5. Dark / Light Mode
```typescript
// store/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const stored = typeof window !== 'undefined'
  ? (localStorage.getItem('hr-theme') as 'dark' | 'light') ?? 'dark'
  : 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { value: stored } as { value: 'dark' | 'light' },
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'dark' ? 'light' : 'dark'
      localStorage.setItem('hr-theme', state.value)
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice

// ThemeToggle.tsx
const theme = useAppSelector(s => s.theme.value)
const dispatch = useAppDispatch()
// <html className={theme}> in layout.tsx via useEffect
```

### 6. Sorting & Filtering (Performant)
```typescript
// Pull from Redux — no prop drilling
const { dept, search, sortKey, sortDir } = useAppSelector(s => s.filters)
const debouncedSearch = useDebounce(search, 400)

// Memoize — never recompute on unrelated renders
const filteredEmployees = useMemo(() => {
  return employees
    .filter(e =>
      (dept === 'all' || e.dept === dept) &&
      e.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDir === 'asc') return a[sortKey] > b[sortKey] ? 1 : -1
      return a[sortKey] < b[sortKey] ? 1 : -1
    })
}, [employees, dept, debouncedSearch, sortKey, sortDir])
```

---

## 🗄️ Caching Strategy

### ❓ Redis — Is it possible?

**Short answer:** Redis on Firebase stack = overkill + extra infra.

**Redis** is a server-side in-memory cache. Works for Node.js APIs. Firebase is serverless — no persistent server to run Redis on. You *can* spin up Redis on Railway/Upstash/Render alongside Firebase, but that adds:
- Extra cost
- Extra latency hop
- Extra infra to manage

**Better options for this stack:**

| Strategy | Where | Best For |
|---|---|---|
| **React Query** | Client memory | Server state, auto-refetch, stale-while-revalidate |
| **Redux store** | Client memory | UI state, filters, theme, auth session |
| **localStorage TTL Cache** | Browser | Cross-session data (dept list, config) |
| **Firestore offline cache** | IndexedDB (auto) | Firestore auto-caches locally |
| **Next.js `fetch` cache** | Server/CDN | Static or ISR data |
| **Upstash Redis** (optional) | Edge | If you add API Routes needing shared cache |

### React Query Config (Best Choice)
```typescript
// lib/cache/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // Fresh 5 min
      gcTime: 1000 * 60 * 30,        // Keep in memory 30 min
      refetchOnWindowFocus: false,    // Don't spam Firestore
      retry: 2,
    },
  },
})
```

### localStorage TTL Cache (Cross-session)
```typescript
// lib/cache/localCache.ts
export function setCache<T>(key: string, data: T, ttlMs: number) {
  localStorage.setItem(key, JSON.stringify({
    data,
    expires: Date.now() + ttlMs,
  }))
}

export function getCache<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  const { data, expires } = JSON.parse(raw)
  if (Date.now() > expires) {
    localStorage.removeItem(key)
    return null
  }
  return data as T
}

// Use for dept list, roles, static config — rarely changes
const depts = getCache<Dept[]>('departments') 
  ?? await fetchAndCache('departments', fetchDepts, 1000 * 60 * 60)
```

---

## 🧩 Reusable Component Pattern

```typescript
// components/ui/KPICard.tsx — Typed, composable, theme-aware
interface KPICardProps {
  title: string
  value: string | number
  delta?: number       // % change
  icon: React.ReactNode
  loading?: boolean
  variant?: 'default' | 'success' | 'danger' | 'warning'
}

export function KPICard({ title, value, delta, icon, loading, variant = 'default' }: KPICardProps) {
  if (loading) return <Skeleton className="h-28 rounded-2xl" />

  return (
    <div className={cn(
      'rounded-2xl p-5 border transition-all',
      'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800',
      variantStyles[variant]
    )}>
      <div className="flex justify-between items-start">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
        {icon}
      </div>
      <p className="text-3xl font-bold mt-2 dark:text-white">{value}</p>
      {delta !== undefined && (
        <p className={cn('text-xs mt-1', delta >= 0 ? 'text-emerald-500' : 'text-red-500')}>
          {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}% vs last month
        </p>
      )}
    </div>
  )
}
```

---

## 🚀 Getting Started

```bash
# 1. Clone & install
git clone https://github.com/your-org/hr-dashboard
cd hr-dashboard
npm install

# 2. Set env vars
cp .env.example .env.local
# Fill Firebase values

# 3. Run dev
npm run dev

# 4. Build prod
npm run build && npm start
```

### Dependencies
```bash
# Core
npm install firebase @reduxjs/toolkit react-redux @tanstack/react-query recharts
npm install tailwind-merge clsx date-fns react-hot-toast
npm install -D tailwindcss postcss autoprefixer @types/node

# shadcn/ui — init then add components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge input table dialog skeleton
```

---

## 📋 Performance Checklist (Senior Dev)

- [ ] All charts behind `dynamic()` with `ssr: false`
- [ ] Intersection Observer on below-fold components
- [ ] `useMemo` on all filter/sort computations
- [ ] Debounce on all search inputs (≥400ms)
- [ ] React Query staleTime set per collection
- [ ] Firestore queries use `limit()` — never full scan
- [ ] `onSnapshot` unsubscribed in `useEffect` cleanup
- [ ] Images use `next/image` with `priority` on above-fold only
- [ ] Bundle analyzed with `@next/bundle-analyzer`
- [ ] Tailwind `content` paths tight — no unused CSS in prod
- [ ] Dark mode via class strategy, persisted in localStorage
- [ ] Role guards on routes via middleware.ts

---

## 🔐 Auth & Role Guard

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebase-auth-token')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
```

---

## 📦 Key Libraries

| Package | Purpose |
|---|---|
| `firebase` | Auth + Firestore + Realtime |
| `@reduxjs/toolkit` + `react-redux` | Client state management |
| `@tanstack/react-query` | Server state + caching |
| `shadcn/ui` | Owned UI component library |
| `recharts` | Charts (lazy-loaded) |
| `tailwind-merge` + `clsx` | Class merging utility |
| `date-fns` | Date formatting |
| `react-hot-toast` | Notifications |

---

*Built by Moideen Mashad · MFX Labs*
