import axios from "axios";
export const register = async (name, email, password) => {
  try {
    const { data } = await axios.post("/api/users/", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
}
