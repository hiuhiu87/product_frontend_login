import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TableProduct from "./components/TableProduct";
import ModifyComponent from "./components/ModifyComponent";
import LoginComponent from "./components/LoginComponent";
import ProtectedRoute from "./authentication/ProtectedRoute";
import { AuthProvider } from "./authentication/AuthCustome";

const App = () => {
  return (
    <div className="container">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/product_frontend" />} />
            <Route
              exact
              path="/product_frontend"
              element={
                <ProtectedRoute>
                  <TableProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search-product/:searchData"
              element={
                <ProtectedRoute>
                  <TableProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <ModifyComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  <ModifyComponent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detail-product/:id"
              element={
                <ProtectedRoute>
                  <ModifyComponent />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
