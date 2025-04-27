import { instance } from "../lib/axios";

const GenreService = {
  getGenres: () => instance.get("/genre").then(({ data }) => data.genres),
};

export default GenreService;
