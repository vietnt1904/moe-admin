import { useQuery } from "@tanstack/react-query";
import BannerService from "../services/BannerService";

export const useAdminBanners = (page = 1, limit = 20) => {
    return useQuery({
        queryKey: ["banners", page, limit],
        queryFn: () => BannerService.getAllBanners(page, limit),
        keepPreviousData: true,
    });
};