import "./App.css";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { useEffect } from "react";
import Navbar from "./components/organisms/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Links } from "./types/constants/Links/Links";
import Profile from "./components/organisms/profile/Profile";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./context/UseContext";
import RegisterForm from "./components/organisms/form/registerForm/RegisterForm";
import LoginForm from "./components/organisms/form/loginForm/LoginForm";
import Report from "./components/molecules/report/Report";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import NotFound from "./components/molecules/notfound/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import CustomErrors, {
  logErrors,
} from "./components/molecules/customerrors/CustomErrors";

function App() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    UIkit.use(Icons);
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path={Links.HOME}
              element={
                <ErrorBoundary
                  fallback={
                    <CustomErrors error={new Error("An error occurred")} />
                  }
                  onError={logErrors}
                >
                  <LoginForm />
                </ErrorBoundary>
              }
            />
            <Route path={Links.REGISTER} element={<RegisterForm />} />

            <Route
              path={Links.PROFILE}
              element={
                <ProtectedRoutes>
                  <ErrorBoundary
                    fallback={
                      <CustomErrors error={new Error("An error occurred")} />
                    }
                    onError={logErrors}
                  >
                    <Profile />
                  </ErrorBoundary>
                </ProtectedRoutes>
              }
            />
            <Route
              path={Links.REPORT}
              element={
                <ErrorBoundary
                  fallback={
                    <CustomErrors error={new Error("An error occurred")} />
                  }
                  onError={logErrors}
                >
                  <ProtectedRoutes>
                    <Report />
                  </ProtectedRoutes>
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
