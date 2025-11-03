import { instance } from "../lib/axios";

const GenreService = {
  async getGenres() {
    const genres = instance.get("/genre").then(({ data }) => data.genres);
    return genres;
  },

  async getAdminGenres() {
    const genres = instance.get("/admin/genre").then(({ data }) => data.genres);
    return genres;
  },

  async addGenre(data) {
    const genre = instance.post("/genre", data).then(({ data }) => data);
    return genre;
  },

  async updateGenre(id, data) {
    const genre = instance.patch(`/genre/${id}`, data).then(({ data }) => data);
    return genre;
  },
};

export default GenreService;
