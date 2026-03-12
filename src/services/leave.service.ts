// src/services/leave.service.ts
import axios from "axios";

export const leaveService = {
  getLeaveTypes: async () => {
    const response = await axios.get("/api/leave-types");
    return response.data;
  },

  getMyBalances: async (employeeId: string) => {
    const response = await axios.get(`/api/leaves/balances/${employeeId}`);
    return response.data;
  },

  getMyLeaves: async (employeeId: string, status?: string) => {
    const params = status ? { status } : {};
    const response = await axios.get(`/api/leaves/employee/${employeeId}`, { params });
    return response.data;
  },

  applyForLeave: async (data: any) => {
    const response = await axios.post("/api/leaves", data);
    return response.data;
  },

  cancelLeave: async (leaveId: string) => {
    const response = await axios.patch(`/api/leaves/${leaveId}/cancel`);
    return response.data;
  },

  getHolidays: async (year: number) => {
    const response = await axios.get(`/api/holidays`, { params: { year } });
    return response.data;
  },
};