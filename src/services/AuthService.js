import { jwtDecode } from "jwt-decode";
import { authInstance } from "../lib/axios";

const AuthService = {
  async login(email, password) {
    const res = await authInstance
      .post("/adminauth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        console.log("data login", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return data;
      });
    return res;
  },

  async getSession() {
    const payload = authInstance.get("/adminauth/session").then(({ data }) => {
      return data;
    });
    return payload;
  },

  async signup(data) {
    console.log("data", data);
    const res = await authInstance
      .post("/adminauth/signup", data)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return data?.user;
      });
    return res;
  },

  async logout() {
    localStorage.removeItem("token");
  },

  async changePassword(userId, password, newPassword) {
    const data = authInstance
      .post("/users/changePassword/operator")
      .then(({ data }) => {
        return data;
      });
    return data;
  },

  async getAccountInfo() {
    const user = localStorage.getItem("user");
    const { id } = JSON.parse(user);
    const accontInfo = authInstance
      .get(`/admin/accountinfor/${id}`)
      .then(({ data }) => {
        return data?.user;
      });
    return accontInfo;
  },
  async resetPassword(email, role) {
    const data = authInstance
      .post("/auth/reset-password", {
        email,
        role,
      })
      .then(({ data }) => {
        return data;
      });
    return data;
  },
};

export default AuthService;
