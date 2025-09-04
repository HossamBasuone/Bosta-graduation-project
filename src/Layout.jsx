import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
      </div>
    </div>
  );
}
