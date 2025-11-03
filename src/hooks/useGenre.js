import { useQuery } from "@tanstack/react-query";
import GenreService from "../services/GenreService.js";

export const useGenre = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: () => GenreService.getGenres(),
        keepPreviousData: true
    })
};

export const useAdminGenres = () => {
    return useQuery({
        queryKey: ["adminGenres"],
        queryFn: () => GenreService.getAdminGenres(),
        keepPreviousData: true
    })
};