import axios from "axios";

const initAPI = axios.create({
  baseURL: "https://api.rawg.io/api",
});

initAPI.interceptors.request.use((config) => {
  config.params = {
    // add your default params
    key: "bda281be14f1457c974da1e78f3cc6d5",
    // spread the request's params
    ...config.params,
  };
  return config;
});

const getListGenres = async () => {
  try {
    const resp = await initAPI.get("/genres", {
      params: {
        ordering: "name",
      },
    });

    return resp;
  } catch (err) {
    console.log("error getListGenres", err);
  }
};

const getDetailsGenre = async (id) => {
  try {
    const resp = await initAPI.get(`/genres/${id}`);

    return resp;
  } catch (err) {
    console.log("error getDetailsGenre", err);
  }
};

const getListGamesByGenre = async (genre, order, page) => {
  try {
    const resp = await initAPI.get("/games", {
      params: {
        genres: genre,
        ordering: order,
        page: page,
      },
    });

    return resp;
  } catch (err) {
    console.log("error getListGamesByGenre", err);
  }
};

const getListGamesBySearch = async (keyword, order, page) => {
  try {
    const resp = await initAPI.get("/games", {
      params: {
        search: keyword,
        ordering: order,
        page: page,
      },
    });

    return resp;
  } catch (err) {
    console.log("error getListGamesBySearch", err);
  }
};

const getDetailsGame = async (id) => {
  try {
    const resp = await initAPI.get(`/games/${id}`);

    return resp;
  } catch (err) {
    console.log("error getDetailsGame", err);
  }
};

const getScreenshotsGame = async (id) => {
  try {
    const resp = await initAPI.get(`/games/${id}/screenshots`);

    return resp;
  } catch (err) {
    console.log("error getScreenshotsGame", err);
  }
};

const getTrailersGame = async (id) => {
  try {
    const resp = await initAPI.get(`/games/${id}/movies`);

    return resp;
  } catch (err) {
    console.log("error getTrailersGame", err);
  }
};

export {
  getListGenres,
  getDetailsGenre,
  getListGamesByGenre,
  getListGamesBySearch,
  getDetailsGame,
  getScreenshotsGame,
  getTrailersGame,
};
