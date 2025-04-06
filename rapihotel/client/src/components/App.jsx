import { useEffect, useContext, lazy, Suspense } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import style from "./styles/App.module.css";

import { loginContext } from "../context/loginContext";

// Carga bajo demanda de componentes
const Logger = lazy(() => import("./modules//log/Logger"));
const ResetPasswordForm = lazy(() => import("./modules/log/ResetPasswordForm"));
const PasswordRecoveryForm = lazy(() => import("./modules/log/PasswordRecoveryForm"));
const Nav = lazy(() => import("./modules/Nav/NavHeroUi"));
const Home = lazy(() => import("./modules/Home/Home"));
const Profile = lazy(() => import("./modules/Dashboards/userProfile/index"));
const AddHotelForm = lazy(() => import("./modules/forms/add/AddHotelForm"));
const Favourites = lazy(() => import("./modules/Dashboards/Favourites"));
const Hotel = lazy(() => import("./modules/Hoteles/Hotel"));
const Blank = lazy(() => import("./modules/Dashboards/userProfile"));
const Maquetas = lazy(() => import("./modules/Home/SliderCardsHotel"));

function App() {
  const { isLogin, setIsLogin, token, showMapContainer, allHotels } =
    useContext(loginContext);
  const location = useLocation();

  useEffect(() => {
    if (token) setIsLogin(true);
  }, [token, setIsLogin]);

  return (
    <div className={style.App}>
      {/* Renderiza Nav solo si no estamos en la ruta de perfil */}
      {location.pathname !== "/profile" && location.pathname && !showMapContainer && (
        <Suspense fallback={<div>Cargando navegación...</div>}>
          <Nav />
        </Suspense>
      )}
      <div className={`${style.body} bg-background`}>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hoteles">
              <Route path="" element={<Home />} />
              <Route path=":id" element={<Hotel allHotels={allHotels} />} />
              <Route path="hotel" element={<Hotel />} />
            </Route>

            <Route
              path="/login"
              element={!isLogin ? <Logger /> : <Navigate to="/profile" />}
            />
            <Route path="/auth">
              <Route path="forgot" element={<PasswordRecoveryForm />} />
              <Route path="reset" element={<ResetPasswordForm />} />
            </Route>
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordForm />}
            />
            <Route
              path="/password-recovery"
              element={<PasswordRecoveryForm />}
            />
            <Route
              path="/profile"
              element={isLogin ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/hoteles/post"
              element={isLogin ? <AddHotelForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/favorites"
              element={isLogin ? <Favourites /> : <Navigate to="/login" />}
            />
            <Route path="/blank" element={<Blank hotel={allHotels?.[2]} />} />
            <Route path="/maquetas" element={<Maquetas />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
