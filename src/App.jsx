import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Map1 from "./Maps/Map1";

import Map2 from "./Maps/Map2";
import Map3 from "./Maps/Map3";
import "./App.css";
let router = createBrowserRouter([
  { path: "", element: <Layout /> },
  { path: "/map1", element: <Map1 /> },
  { path: "/map2", element: <Map2 /> },
  { path: "/map3", element: <Map3 /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
