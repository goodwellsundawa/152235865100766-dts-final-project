import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LoadingPage from "./LoadingPage";
import { useListGamesByParamQuery } from "../services/reqApiRAWG";

function ListCustomePost() {
  const params = useParams();
  const [queryStrings] = useSearchParams();
  const navigate = useNavigate();

  if (["genres", "search"].indexOf(params.type) < 0) {
    console.log(
      `["genres", "search"].indexOf(params.type)`,
      ["genres", "search"].indexOf(params.type)
    );
    //<Navigate to="/404" />;
    navigate("/404");
  }

  if (!queryStrings.get("keyword")) {
    console.log(`queryStrings.get("keyword") :`, queryStrings.get("keyword"));
    //<Navigate to="/404" />;
    navigate("/404");
  }

  const keyword = queryStrings.get("keyword");

  const [page, setPage] = useState(1);
  console.log("page :", page);

  const {
    data: dataGamesByParam,
    error: errorGamesByParam,
    isLoading: isLoadingGamesByParam,
    isUninitialized: isUninitializedGamesByParam,
  } = useListGamesByParamQuery({
    param: params.type,
    paramVal: keyword,
    order: "-updated",
    page: page,
  });

  return (
    <>
      <Container maxWidth="lg">
        <main>
          <Typography component="div" variant="h5" sx={{ margin: "1.5em 0em" }}>
            List Games
          </Typography>
          <Divider sx={{ margin: "1.5em 0em" }} />
          <Grid container spacing={4}>
            {errorGamesByParam ? (
              <>
                Oh no, there was an error : dataGamesByParam
                {console.log("error dataGamesByParam :", errorGamesByParam)}
                {errorGamesByParam.data.detail === "Invalid page."
                  ? setPage(1)
                  : null}
              </>
            ) : isUninitializedGamesByParam ? (
              <>Oh no, it's Uninitialized : dataGamesByParam</>
            ) : isLoadingGamesByParam ? (
              <LoadingPage />
            ) : dataGamesByParam ? (
              <>
                {console.log("list dataGamesByParam :", dataGamesByParam)}
                {dataGamesByParam.results.map((post) => (
                  <Grid item xs={12} md={6} key={post.id}>
                    <CardActionArea component="a" href={`/detail/${post.id}`}>
                      <Card sx={{ display: "flex" }}>
                        <CardContent sx={{ flex: 1 }}>
                          <Typography component="div" variant="h6">
                            {post.name}
                          </Typography>
                          <Typography variant="subtitle1" color="primary">
                            Details...
                          </Typography>
                        </CardContent>
                        <CardMedia
                          component="img"
                          sx={{
                            width: 160,
                            height: 160,
                            display: { xs: "none", sm: "block" },
                          }}
                          image={post.background_image}
                          alt={post.name}
                        />
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
              </>
            ) : null}
          </Grid>
          <Divider sx={{ margin: "1.5em 0em" }} />
          {errorGamesByParam ? (
            <>Oh no, there was an error : dataGamesByParam</>
          ) : isUninitializedGamesByParam ? (
            <>Oh no, it's Uninitialized : dataGamesByParam</>
          ) : isLoadingGamesByParam ? (
            <LoadingPage />
          ) : dataGamesByParam ? (
            <>
              {console.log("paging dataGamesByParam :", dataGamesByParam)}
              <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination
                  count={
                    Math.ceil(dataGamesByParam.count / 10) > 1000
                      ? 1000
                      : Math.ceil(dataGamesByParam.count / 10)
                  }
                  variant="outlined"
                  page={page}
                  onChange={(e, val) => {
                    setPage(val);
                  }}
                />
              </Stack>
            </>
          ) : null}
          <Divider sx={{ margin: "1.5em 0em" }} />
        </main>
      </Container>
    </>
  );
}

export default ListCustomePost;
