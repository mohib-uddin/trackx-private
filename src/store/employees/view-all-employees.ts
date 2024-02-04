import { proxy } from "valtio";

const viewAllEmployeesState = proxy({
  page: 1,
  searchQuery: "",
});

export default viewAllEmployeesState;
