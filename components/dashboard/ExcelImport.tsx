"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2, ChevronDown, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmployeeSchema, ProjectSchema } from "@/lib/validation/schemas";
import { getDocs, query } from "firebase/firestore";

type ImportType = "employees" | "projects";

export const ExcelImport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importType, setImportType] = useState<ImportType>("employees");

  const processImport = async (jsonData: any[]) => {
    const batch = writeBatch(db);
    let successCount = 0;
    let errorCount = 0;

    jsonData.forEach((row, index) => {
      try {
        const schema = importType === "employees" ? EmployeeSchema : ProjectSchema;
        // Basic data normalization before validation
        const normalizedRow = {
          ...row,
          progress: row.progress ? Number(row.progress) : undefined,
          status: row.status?.toLowerCase() || (importType === "employees" ? "active" : "In Progress"),
        };

        const validatedData = schema.parse(normalizedRow);
        const docRef = doc(collection(db, importType));
        batch.set(docRef, validatedData);
        successCount++;
      } catch (err) {
        console.error(`Validation error at row ${index + 2}:`, err);
        errorCount++;
      }
    });

    if (successCount > 0) {
      await batch.commit();
      toast.success(`Successfully imported ${successCount} ${importType}`);
    }
    
    if (errorCount > 0) {
      toast.error(`Skipped ${errorCount} rows due to validation errors. Check console.`);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

        if (jsonData.length === 0) {
          toast.error("The file is empty");
          return;
        }

        await processImport(jsonData);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.error("Import error:", error);
        toast.error(`Import failed. Please check the file format.`);
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleExport = async () => {
    try {
      setIsProcessing(true);
      const snapshot = await getDocs(query(collection(db, importType)));
      const liveData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (liveData.length === 0) {
        toast.error(`No data found in ${importType} to export.`);
        return;
      }

      const ws = XLSX.utils.json_to_sheet(liveData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, importType.toUpperCase());
      XLSX.writeFile(wb, `${importType}_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success(`Exported ${liveData.length} records`);
    } catch (error) {
      toast.error("Export failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const template = importType === "employees" 
      ? [{ name: "Full Name", email: "email@example.com", dept: "Engineering", role: "Developer", status: "active", joinDate: "2024-01-01" }]
      : [{ name: "Project Name", progress: 0, status: "In Progress", department: "IT", teamLead: "Lead Name", startDate: "2024-01-01" }];
    
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, `${importType}_template.xlsx`);
  };

  return (
    <div className="flex gap-2">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".xlsx,.xls,.csv" className="hidden" />
      
      <div className="flex bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" className="h-10 rounded-none border-r border-border gap-1 px-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {importType === "employees" ? "Users" : "Projects"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          } />
          <DropdownMenuContent align="start" className="rounded-xl min-w-[180px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs px-3">Collection</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setImportType("employees")}>Employees (Users)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setImportType("projects")}>Projects</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs px-3">Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={downloadTemplate} className="gap-2">
                <Download className="h-4 w-4" /> Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport} className="gap-2 text-primary">
                <FileUp className="h-4 w-4 rotate-180" /> Export Live
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="ghost"
          onClick={() => fileInputRef.current?.click()} 
          disabled={isProcessing}
          className="h-10 rounded-none px-4 gap-2 border-l border-border"
        >
          {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
          <span className="font-medium text-sm">Import</span>
        </Button>
      </div>
    </div>
  );
};
