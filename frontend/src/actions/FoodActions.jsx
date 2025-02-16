import axiosInstance from "../utils/AxiosInstance";

export const getFoodItems = async () => {
    try {
      const response = await axiosInstance.get("/api/food/getFoodItems");
      return response.data; // Ensure this is an array
    } catch (error) {
      throw error;
    }
  };
  