"use client";
import React from "react";
import TrackingMap from "./TrackingMap"; // reusable component

function Map2() {
  // ✅ Checkpoints data
  const checkpoints = [
    { id: 1, name: "Maadi (Start Point)", description: "Start point in Maadi.", position: [29.9626, 31.2769] },
    { id: 2, name: "Helwan University", description: "University in Helwan.", position: [29.866721, 31.31559] },
    { id: 3, name: "Cairo Stadium", description: "The famous Cairo Stadium.", position: [30.0690313, 31.3122096] },
    { id: 4, name: "Tahrir Square", description: "The famous Tahrir Square in Cairo.", position: [30.0444, 31.2357] },
    { id: 5, name: "Cairo University", description: "One of the largest universities in Egypt.", position: [30.0275, 31.2076] },
    { id: 6, name: "The Citadel", description: "Historic Islamic-era fortification.", position: [30.0299, 31.2613] },
    { id: 7, name: "Giza Pyramids", description: "The world-famous pyramids of Giza.", position: [29.9792, 31.1342] },
  ];

  // ✅ Sidebar info
  const starInfo = {
    name: "Ahmed Ali",
    id: "AbCdEf123456",
    phone: "+201147576197",
    hub: "Maadi",
  };

  // ✅ Table data
  const tableData = [
    { key: 2, tn: "#89302144", route: "Helwan University", state: "Delivered" },
    { key: 3, tn: "#89302144", route: "Cairo Stadium", state: "Delivered" },
    { key: 4, tn: "#89302144", route: "Tahrir Square", state: "Delivered" },
    { key: 5, tn: "#89302144", route: "Cairo University", state: "Delivered" },
    { key: 6, tn: "#89302144", route: "The Citadel", state: "Delivered" },
    { key: 7, tn: "#89302144", route: "Giza Pyramids", state: "Delivered" },
  ];

  return (
    <TrackingMap
      center={[29.9626, 31.2769]} // map center
      checkpoints={checkpoints}
      starInfo={starInfo}
      progress={100}
      tableData={tableData}
    />
  );
}

export default Map2;
