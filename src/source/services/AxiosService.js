import axiosConfig from "../utils/AxiosConfig";

export class AxiosService {
  async registerUser(userData) {
    const result = await axiosConfig.post("/register", userData);

    return result;
  }

  async authenticateUser(userData) {
    const result = await axiosConfig.post("/login", userData);

    return result;
  }

  async logOutUser() {
    await axiosConfig.post("/logout");
  }

  async fetchUserList(page = 1, per_page = 6) {
    const result = await axiosConfig.get(
      `/users?page=${page}&per_page=${per_page}`
    );
    return result;
  }
}
