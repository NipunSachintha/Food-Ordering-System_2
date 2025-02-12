import axiosInstance from "../utils/AxiosInstance";


// to get all the users instead of admin users 
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/getUsers");
    return response.data; 
  } catch (error) {
    throw error;
  }
};


// to get all foodItems From backend
export const getFoodItems = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/getFoodItems");
      return response.data; 
    } catch (error) {
      throw error;
    }
  };
  
