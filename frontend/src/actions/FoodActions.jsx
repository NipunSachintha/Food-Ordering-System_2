import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getFoodItems = async () => {
  const token = Cookies.get("accessToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const response = await axiosInstance.get("/api/food/getFoodItems", {
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