import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import ScrollToTop from "./templates/ScrollToTop";
import Dashboard from "./containers/Dashboard";
import NotFoundPage from "./containers/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListCustomePost from "./components/ListCustomePost";
import DetailPost from "./components/DetailPost";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import LoadingPage from "./components/LoadingPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import { useListGenresQuery } from "./services/reqApiRAWG";

function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  return loading ? null : user ? children : <Navigate to="/login" />;
}

function ProtectLoginRegister({ children }) {
  const [user, loading] = useAuthState(auth);
  return loading ? null : !user ? children : <Navigate to="/" />;
}

function App() {
  const {
    data: dataListGenres,
    error: errorListGenres,
    isLoading: isLoadingListGenres,
    isUninitialized: isUninitializedListGenres,
  } = useListGenresQuery();

  function UseHeaderAndFooter({ children }) {
    return (
      <>
        {errorListGenres ? (
          <>Oh no, there was an error : dataListGenres</>
        ) : isUninitializedListGenres ? (
          <>Oh no, it's Uninitialized : dataListGenres</>
        ) : isLoadingListGenres ? (
          <LoadingPage />
        ) : dataListGenres ? (
          <>
            {console.log("dataListGenres :", dataListGenres)}
            <Container maxWidth="lg">
              <Header
                title="GAMES DATABASE"
                sections={dataListGenres.results}
              />
            </Container>
            {children}
            <Footer title="" description="Video Game Discovery Service" />
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <UseHeaderAndFooter>
                <Dashboard />
              </UseHeaderAndFooter>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectLoginRegister>
                <LoginPage />
              </ProtectLoginRegister>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectLoginRegister>
                <RegisterPage />
              </ProtectLoginRegister>
            }
          />
          <Route
            path="/list/:type"
            element={
              <UseHeaderAndFooter>
                <ListCustomePost />
              </UseHeaderAndFooter>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <PrivateRoute>
                <UseHeaderAndFooter>
                  <DetailPost />
                </UseHeaderAndFooter>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
