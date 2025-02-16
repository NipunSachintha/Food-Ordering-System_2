import axiosInstance from "../utils/AxiosInstance";



export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("/api/orders/getInCompleteOrders");
    return response.data; // Ensure this is an array
  } catch (error) {
    throw error;
  }
};

export const placeOrder = async (order) => {

  try {
    
    const response = await axiosInstance.post("/api/orders/placeOrder", order);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const completeOrder = async (_id) => {
 
  try {
    const response = await axiosInstance.post("/api/orders/completeOrderByGivenId",{_id});
    return response.data; // Ensure this is an array
  } catch (error) {
    throw error;
  }
};
