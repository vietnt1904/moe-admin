import { useQuery } from "@tanstack/react-query";
import UserService from "../services/UserService";

export const useUsers = (page = 1, limit = 10, name, phone, email, username) => {
    return useQuery({
        queryKey: ["users", page, limit, name, phone, email, username],
        queryFn: () => UserService.getUsers(page, limit, name, phone, email, username),
        keepPreviousData: true
    })
};

export const useUser = (id) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => UserService.getUserById(id),
        keepPreviousData: true
    })
};