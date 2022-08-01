import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import * as Pages from "./Pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
