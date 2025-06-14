import { instance } from "../lib/axios";

const UserService = {
    async getUsers(page = 1, limit = 10, name, phone, email, username) {
        const users = await instance
            .get("/admin/user/allusers", {
                params: {
                    page: page,
                    limit: limit,
                    name: name,
                    phone: phone,
                    email: email,
                    username: username
                },
            })
            .then(({ data }) => data?.data);
        return users;
    },

    async getUserById(id) {
        const user = await instance
            .get(`/admin/user/allusers/${id}`)
            .then(({ data }) => data);
        return user;
    },

    async updateUser(id, data) {
        const user = await instance
            .patch(`/admin/user/allusers/${id}`, data)
            .then(({ data }) => data?.data);
        return user;
    },
};

export default UserService;