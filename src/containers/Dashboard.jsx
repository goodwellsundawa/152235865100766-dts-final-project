import React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MainFeaturedPost from "../components/MainFeaturedPost";
import LoadingPage from "../components/LoadingPage";
import { useListAllGamesByOrderQuery } from "../services/reqApiRAWG";

export default function Dashboard() {
  const {
    data: dataListAllGames,
    error: errorListAllGames,
    isLoading: isLoadingListAllGames,
    isUninitialized: isUninitializedListAllGames,
  } = useListAllGamesByOrderQuery({ order: "-updated", page: 1 });

  return (
    <>
      <Container maxWidth="lg">
        <main>
          <Divider sx={{ margin: "1.5em 0em" }} />
          {errorListAllGames ? (
            <>Oh no, there was an error : dataListAllGames</>
          ) : isUninitializedListAllGames ? (
            <>Oh no, it's Uninitialized : dataListAllGames</>
          ) : isLoadingListAllGames ? (
            <LoadingPage />
          ) : dataListAllGames ? (
            <>
              {console.log("dataListAllGames :", dataListAllGames)}
              <MainFeaturedPost posts={dataListAllGames.results} />
            </>
          ) : null}
          <Divider sx={{ margin: "1.5em 0em" }} />
        </main>
      </Container>
    </>
  );
}
