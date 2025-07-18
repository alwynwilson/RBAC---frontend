import SERVERURL from "./serverurl";
import commonAPI from "./commonAPI";

const token = localStorage.getItem("token");
const header = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};

//auth
export const registerAdminAPI = async (reqBody) => {
  return await commonAPI(
    "POST",
    `${SERVERURL}/api/auth/register-superadmin`,
    reqBody
  );
};

export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${SERVERURL}/api/auth/login`, reqBody);
};

//student
export const createStudentAPI = async (data) => {
  return await commonAPI("POST", `${SERVERURL}/api/students`, data, header);
};

export const updateStudentAPI = async (id, data) => {
  return await commonAPI("PUT", `${SERVERURL}/api/students/${id}`, data, header);
};

export const deleteStudentAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVERURL}/api/students/${id}`,undefined,header);
};

export const getAllStudentsAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/api/students`,"",header);
};

//staff
export const createStaffAPI = async (data) => {
  return await commonAPI("POST", `${SERVERURL}/api/staff`, data, header);
};

export const updateStaffAPI = async (id, data) => {
  return await commonAPI("PUT", `${SERVERURL}/api/staff/${id}`, data, header);
};

export const deleteStaffAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVERURL}/api/staff/${id}`, undefined, header);
};

export const getAllStaffAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/api/staff`, "", header);
};