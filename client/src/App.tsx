import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { persistor, store } from "./app/store";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import Signup from "./pages/Signup";
import VerifySignup from "./pages/VerifySignup";
import Login from "./pages/Login";
import VerifyLogin from "./pages/VerifyLogin";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route element={<PrivateRoute />}>
                  <Route index element={<Home />} />
                </Route>
                <Route element={<PublicRoute />}>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signup/verify" element={<VerifySignup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/login/verify" element={<VerifyLogin />} />
                </Route>
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
