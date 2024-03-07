export interface employeeHierarchyType {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  reportsTo: number | null;
  superior: number | null;
  subordinates: employeeHierarchyType[];
}
