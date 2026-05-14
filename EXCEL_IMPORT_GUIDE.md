# 📊 Excel Import & Table Features Guide

This guide explains how to use the new Excel Import feature and the enhanced Employee Table features.

## 1. Excel / CSV Import

You can now bulk-import employees using Excel (`.xlsx`, `.xls`) or CSV files.

### How to Import:
1.  Navigate to the **Employees** page.
2.  Click the **Download Template** button (the arrow-down icon next to "Import Excel").
3.  Fill the Excel template with your employee data.
    *   **Required Columns**: `name`, `email`, `dept`, `role`, `status`, `joinDate`.
    *   **Date Format**: YYYY-MM-DD.
    *   **Status Options**: `active`, `on_leave`, `terminated`.
4.  Click the **Import Excel** button and select your file.
5.  The system will process the file and upload the data to Firestore in batches.

### Implementation Details:
*   **Library**: Uses `xlsx` for parsing.
*   **Firestore**: Uses `writeBatch` for efficient bulk writes.
*   **Component**: Located at `components/dashboard/ExcelImport.tsx`.

---

## 2. Advanced Table Features

The Employee Table has been upgraded with real-time filtering and multi-column sorting.

### Interactive Sorting:
*   Click on any column header (**Name**, **Department**, **Role**, **Status**, or **Join Date**) to sort the table by that field.
*   Click again to toggle between **Ascending** and **Descending** order.
*   Visual indicators (arrows) show the current active sort column and direction.

### Real-time Filtering:
*   **Search**: Type in the search box to filter by employee name.
*   **Department Filter**: Use the dropdown to show employees only from a specific department.

### Implementation Details:
*   **State Management**: Filters and sort state are persisted in Redux (`store/filterSlice.ts`).
*   **Performance**: Filtering and sorting are handled via `useMemo` in the `EmployeeTable` component for smooth UI updates.

---

## 3. Developer Notes

### Adding new sortable columns:
To make a new column sortable:
1.  Ensure the field exists in the `Employee` type.
2.  Update the `TableHead` in `EmployeeTable.tsx` to include the `onClick={() => toggleSort('yourField')}` handler.
3.  Add the `<SortIcon column="yourField" />` component to the header.

### Customizing the Import Schema:
If you need to change which fields are imported, update the `jsonData.forEach` loop in `components/dashboard/ExcelImport.tsx`.
