import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./components/error/ErrorComponent.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
