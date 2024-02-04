import { proxy } from "valtio";

import { EMPLOYEE_FORM_STEPPERS } from "@/_utils/enums";

const addEmployeeState = proxy({
  step: EMPLOYEE_FORM_STEPPERS.USER,
});

export default addEmployeeState;
