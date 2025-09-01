import axiosInstance from "../services/axiosInstance";

export const getAllMembers = async () => {
  const res = await axiosInstance.get("/api/admin/members");
  return res;
};

export const updateMember = async (id, data) => {
  const res = await axiosInstance.put(`/api/admin/members/${id}`, data);
  return res;
};

export const deleteMember = async (id) => {
  const res = axiosInstance.delete(`/api/admin/members/${id}`);
  return res;
};

// Function to fetch a single member by ID
export const getSingleMember = async (id) => {
  try {
    const res = await axiosInstance.get(`/api/admin/members/${id}`);
    return res;
  } catch (error) {
    console.error("Error fetching member:", error);
    throw error; // rethrow for handling in the component
  }
};
