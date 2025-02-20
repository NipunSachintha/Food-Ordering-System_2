import axiosInstance from "../utils/AxiosInstance";

// to get all foodItems From backend
export const getFoodItems = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/getFoodItems");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFoodItem = async (data) => {
  //console.log(data);
  try {
    const response = await axiosInstance.post(
      "/api/admin/updateFoodItem",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addFoodItem = async (data) => {
  try {
    const response = await axiosInstance.post("/api/admin/addFoodItem", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFoodItem = async (id) => {
  console.log(id);
  try {
    const response = await axiosInstance.delete(
      `/api/admin/deleteFoodItem/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};



// to get all the users instead of admin users
// Admin Actions for Users

// to get all the users instead of admin users
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/getUsers");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (data) => {
  console.log(data);
  try{
    const response = await axiosInstance.post("/api/user/addUser", data);
    return response.data;
  }
  catch(error){
    throw error;
  }
};

export const deleteUser = async (id) => {
  console.log(id);
  try{
    const response = await axiosInstance.delete(`/api/admin/deleteUser/${id}`);
    return response.data;
  }
  catch(error){
    throw error;
  }
};
