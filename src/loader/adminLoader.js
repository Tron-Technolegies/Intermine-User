import { redirect } from "react-router-dom";
import api from "../api/api";

export const adminLoader = async () => {
  try {
    const response = await api.get("/user/info");
    const user = response.data;
    if (!user || user.role !== "Client") {
      throw new Error("No Access");
    }
    return user;
  } catch (error) {
    return redirect("/login");
  }
};
