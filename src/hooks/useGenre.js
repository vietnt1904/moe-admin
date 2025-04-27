import { useQuery } from "@tanstack/react-query";
import GenreService from "../services/GenreService.js";

export const useGenre = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: () => GenreService.getGenres(),
        keepPreviousData: true
    })
};