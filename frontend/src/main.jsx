import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WorkoutsContextProvider } from "./context/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <WorkoutsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WorkoutsContextProvider>
  </AuthContextProvider>
);
