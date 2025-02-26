import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// to get all foodItems From backend
export const getFoodItems = async () => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axiosInstance.get("/api/admin/getFoodItems", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFoodItem = async (data) => {
  //console.log(data);
  const token = Cookies.get("accessToken");
  try {
    const response = await axiosInstance.post(
      "/api/admin/updateFoodItem",
      data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addFoodItem = async (data) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axiosInstance.post("/api/admin/addFoodItem", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFoodItem = async (id) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axiosInstance.delete(
      `/api/admin/deleteFoodItem/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
  const token = Cookies.get("accessToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const response = await axiosInstance.get("/api/admin/getUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.log("No token found");
  }
};

export const deleteUser = async (id) => {
  //console.log(id);
  const token = Cookies.get("accessToken");
  try {
    //const decodedToken = jwtDecode(token);
    const response = await axiosInstance.delete(`/api/admin/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (data) => {
  //console.log(data);
  const token = Cookies.get("accessToken");
  try {
    const response = await axiosInstance.post("/api/user/addUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axiosInstance.post(
      "/api/admin/updateUsers",
      data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getorderdetails = async () => {
  const token = Cookies.get("accessToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const response = await axiosInstance.get("/api/admin/orderDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.log("No token found");
  }
};