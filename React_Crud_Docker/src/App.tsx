import "./App.css";
import Navbar from "./components/organisms/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Links } from "./types/constants/Links/Links";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./context/UseContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import NotFound from "./components/molecules/notfound/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import CustomErrors, {
  LogErrors,
} from "./components/molecules/customErrors/CustomErrors";
import RegisterPage from "./components/pages/form/RegisterPage";
import LoginPage from "./components/pages/form/LoginPage";
import ProfilePage from "./components/pages/profile/ProfilePage";
import ReportPage from "./components/pages/report/ReportPage";

function App() {
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
                  onError={LogErrors}
                >
                  <LoginPage />
                </ErrorBoundary>
              }
            />
            <Route path={Links.REGISTER} element={<RegisterPage />} />

            <Route
              path={Links.PROFILE}
              element={
                <ProtectedRoutes>
                  <ErrorBoundary
                    fallback={
                      <CustomErrors error={new Error("An error occurred")} />
                    }
                    onError={LogErrors}
                  >
                    <ProfilePage />
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
                  onError={LogErrors}
                >
                  <ProtectedRoutes>
                    <ReportPage />
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
