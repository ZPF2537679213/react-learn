import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Timer from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Timer width={300} height={200} />
  </React.StrictMode>
);
