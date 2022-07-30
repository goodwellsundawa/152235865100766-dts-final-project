import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reqMasakApaHariIniAPI = createApi({
  reducerPath: "reqMasakApaHariIniAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://masak-apa.tomorisakura.vercel.app",
  }),
  endpoints: (builder) => ({
    newRecipes: builder.query({
      query: () => "/api/recipes",
    }),
    newRecipesByPage: builder.query({
      query: (page) => `/api/recipes/${page}`,
    }),
    newRecipesLimit: builder.query({
      query: (size) => `/api/recipes-length/?limit=${size}`,
    }),
    recipesByCategory: builder.query({
      query: (key) => `/api/category/recipes/${key}`,
    }),
    recipesCategory: builder.query({
      query: () => "/api/category/recipes",
    }),
    recipeDetail: builder.query({
      query: (key) => `/api/recipe/${key}`,
    }),
    searchRecipes: builder.query({
      query: (parameter) => `/api/search/?q=${parameter}`,
    }),
    articleCategorys: builder.query({
      query: () => "/api/category/article",
    }),
    articleByCategory: builder.query({
      query: (key) => `/api/category/article/${key}`,
    }),
    article: builder.query({
      query: () => "/api/articles/new",
    }),
    articleDetail: builder.query({
      query: (tag, key) => `/api/article/${tag}/${key}`,
    }),
  }),
});

export const {
  useNewRecipesQuery,
  useNewRecipesByPageQuery,
  useNewRecipesLimitQuery,
  useRecipesByCategoryQuery,
  useRecipesCategoryQuery,
  useRecipeDetailQuery,
  useSearchRecipesQuery,
  useArticleCategorysQuery,
  useArticleByCategoryQuery,
  useArticleQuery,
  useArticleDetailQuery,
} = reqMasakApaHariIniAPI;
