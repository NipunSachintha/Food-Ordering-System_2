import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';


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

  const token = Cookies.get('accessToken');
  if(token){
    try{
      const decodedToken = jwtDecode(token);
      axiosInstance.get('/api/admin/getUsers',{
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    } catch(error){
      console.log(error);
    }
  } else {
    console.log('No token found');
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

