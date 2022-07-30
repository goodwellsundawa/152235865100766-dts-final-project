import axios from "axios";

const initAPI = axios.create({
  baseURL: "https://masak-apa.tomorisakura.vercel.app",
});

initAPI.interceptors.request.use((config) => {
  config.params = {
    // add your default params
    //api_key: "",
    // spread the request's params
    ...config.params,
  };
  return config;
});

const getNewRecipes = async () => {
  try {
    const resp = await initAPI.get("/api/recipes");

    return resp.results;
  } catch (err) {
    console.log("error getNewRecipes", err);
  }
};

const getNewRecipesByPage = async (page) => {
  try {
    const resp = await initAPI.get(`/api/recipes/${page}`);

    return resp.results;
  } catch (err) {
    console.log("error getNewRecipesByPage", err);
  }
};

const getNewRecipesLimit = async (size) => {
  try {
    const resp = await initAPI.get("/api/recipes-length", {
      params: {
        limit: size,
      },
    });

    return resp.results;
  } catch (err) {
    console.log("error getNewRecipesLimit", err);
  }
};

const getRecipesByCategory = async (key) => {
  try {
    const resp = await initAPI.get(`/api/category/recipes/${key}`);

    return resp.results;
  } catch (err) {
    console.log("error getRecipesByCategory", err);
  }
};

const getRecipesCategory = async () => {
  try {
    const resp = await initAPI.get("/api/category/recipes");

    return resp.results;
  } catch (err) {
    console.log("error getRecipesCategory", err);
  }
};

const getRecipeDetail = async (key) => {
  try {
    const resp = await initAPI.get(`/api/recipe/${key}`);

    return resp.results;
  } catch (err) {
    console.log("error getRecipeDetail", err);
  }
};

const getSearchRecipes = async (parameter) => {
  try {
    const resp = await initAPI.get("/api/search", {
      params: {
        q: parameter,
      },
    });

    return resp.results;
  } catch (err) {
    console.log("error getSearchRecipes", err);
  }
};

const getArticleCategorys = async () => {
  try {
    const resp = await initAPI.get("/api/category/article");

    return resp.results;
  } catch (err) {
    console.log("error getArticleCategorys", err);
  }
};

const getArticleByCategory = async (key) => {
  try {
    const resp = await initAPI.get(`/api/category/article/${key}`);

    return resp.results;
  } catch (err) {
    console.log("error getArticleByCategory", err);
  }
};

const getArticle = async () => {
  try {
    const resp = await initAPI.get("/api/articles/new");

    return resp.results;
  } catch (err) {
    console.log("error getArticle", err);
  }
};

const getArticleDetail = async (tag, key) => {
  try {
    const resp = await initAPI.get(`/api/article/${tag}/${key}`);

    return resp.results;
  } catch (err) {
    console.log("error getArticleDetail", err);
  }
};

export {
  getNewRecipes,
  getNewRecipesByPage,
  getNewRecipesLimit,
  getRecipesByCategory,
  getRecipesCategory,
  getRecipeDetail,
  getSearchRecipes,
  getArticleCategorys,
  getArticleByCategory,
  getArticle,
  getArticleDetail,
};
