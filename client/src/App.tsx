import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyLogin from "./pages/VerifyLogin";
import VerifySignup from "./pages/VerifySignup";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route element={<PublicRoute />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/verify" element={<VerifySignup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/verify" element={<VerifyLogin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
