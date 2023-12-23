import React from "react";

function AppLoader() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: "999",
        backgroundColor: "#fff",
      }}
    >
      <div
        className="spinner-border p-3"
        role="status"
        style={{ top: "45vh", left: "48vw", position: "absolute" }}
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default AppLoader;
