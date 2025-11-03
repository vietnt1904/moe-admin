import { instance } from "../lib/axios";

const BannerService = {
    async getAllBanners(page = 1, limit = 20) {
        const banners = await instance
            .get("/admin/banner/all", {
                params: {
                    page: page,
                    limit: limit,
                },
            })
            .then(({ data }) => data?.data);
        return banners;
    },

    async addBanner(data) {
        const banner = instance.post("/admin/banner", data).then(({ data }) => data);
        return banner;
    },

    async updateBannerStatus (id, status) {
        const banner = instance
            .patch(`/admin/banner/${id}`, { status: status })
            .then(({ data }) => data);
        return banner;
    },

    async updateAdminBanner (id, data) {
        const banner = instance
            .put(`/admin/banner/${id}`, data)
            .then(({ data }) => data);
        return banner;
    },

    async stopAllBanners () {
        const banner = instance
            .post("/admin/banner/stopall")
            .then(({ data }) => data);
        return banner;
    },
}

export default BannerService;