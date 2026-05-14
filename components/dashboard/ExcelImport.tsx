"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2, Download, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import { collection, writeBatch, doc, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ImportType = "employees" | "projects";

export const ExcelImport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importType, setImportType] = useState<ImportType>("employees");

  const handleExport = async () => {
    try {
      setIsImporting(true);
      const q = query(collection(db, importType));
      const snapshot = await getDocs(q);
      const liveData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (liveData.length === 0) {
        toast.error(`No genuine data found in ${importType} to export.`);
        return;
      }

      const ws = XLSX.utils.json_to_sheet(liveData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, importType.toUpperCase());
      XLSX.writeFile(wb, `${importType}_genuine_data_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast.success(`Exported ${liveData.length} records from ${importType}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export genuine data.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length === 0) {
          toast.error("The file is empty");
          return;
        }

        const batch = writeBatch(db);
        
        jsonData.forEach((row: any) => {
          const docRef = doc(collection(db, importType));
          
          if (importType === "employees") {
            batch.set(docRef, {
              name: row.name || "Unknown",
              email: row.email || "",
              dept: row.dept || "Unassigned",
              role: row.role || "Employee",
              status: row.status?.toLowerCase() || "active",
              joinDate: row.joinDate || new Date().toISOString().split('T')[0],
            });
          } else if (importType === "projects") {
            batch.set(docRef, {
              name: row.name || "Untitled Project",
              progress: Number(row.progress) || 0,
              status: row.status || "In Progress",
              department: row.department || "General",
              teamLead: row.teamLead || "Unassigned",
              startDate: row.startDate || new Date().toISOString().split('T')[0],
              endDate: row.endDate || "",
            });
          }
        });

        await batch.commit();
        toast.success(`Successfully imported ${jsonData.length} ${importType}`);
        
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Import error:", error);
        toast.error(`Failed to import ${importType}. Check console for details.`);
      } finally {
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read file");
      setIsImporting(false);
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    let templateData = [];
    let filename = "";

    if (importType === "employees") {
      templateData = [
        { name: "Full Name", email: "email@example.com", dept: "Engineering", role: "Developer", status: "active", joinDate: "YYYY-MM-DD" }
      ];
      filename = "employee_import_template.xlsx";
    } else {
      templateData = [
        { name: "Project Name", progress: 0, status: "In Progress", department: "IT", teamLead: "Lead Name", startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD" }
      ];
      filename = "project_import_template.xlsx";
    }

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="flex gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx, .xls, .csv"
        className="hidden"
      />
      
      <div className="flex bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" className="h-10 rounded-none border-r border-border gap-1 px-3 hover:bg-muted/50">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {importType === "employees" ? "Users" : "Projects"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          } />
          <DropdownMenuContent align="start" className="rounded-xl border-border bg-popover shadow-xl min-w-[180px]">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground px-3">Collection</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setImportType("employees")} className="cursor-pointer rounded-lg mx-1 my-0.5">
                Employees (Users)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setImportType("projects")} className="cursor-pointer rounded-lg mx-1 my-0.5">
                Projects
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground px-3">Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={downloadTemplate} className="cursor-pointer rounded-lg mx-1 my-0.5 gap-2">
                <Download className="h-4 w-4" /> Download Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExport} className="cursor-pointer rounded-lg mx-1 my-0.5 gap-2 text-primary focus:text-primary">
                <FileUp className="h-4 w-4 rotate-180" /> Export Live Data
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="ghost"
          onClick={() => fileInputRef.current?.click()} 
          disabled={isImporting}
          className="h-10 rounded-none px-4 gap-2 hover:bg-primary/5 hover:text-primary transition-colors border-l border-border"
        >
          {isImporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileUp className="h-4 w-4" />
          )}
          <span className="font-medium">Import Excel</span>
        </Button>
      </div>
    </div>
  );
};
