"use client";
import React from "react";
import TrackingMap from "./TrackingMap"; // 👈 import reusable component

function Map1() {
  // ✅ Main checkpoints (ship stops)
  const mainCheckpoints = [
    {
      id: 1,
      name: "Maadi (Start Point)",
      description: "Start point in Maadi.",
      position: [29.9626, 31.2769],
    },
    {
      id: 2,
      name: "Cairo University",
      description: "One of the largest universities in Egypt.",
      position: [30.0275, 31.2076],
    },
    {
      id: 3,
      name: "The Citadel",
      description: "Historic Islamic-era fortification.",
      position: [30.0299, 31.2613],
    },
    {
      id: 4,
      name: "Giza Pyramids",
      description: "The world-famous pyramids of Giza.",
      position: [29.9792, 31.1342],
    },
  ];

  // ✅ Extra checkpoints (ship doesn’t stop)
  const extraCheckpoints = [
    {
      id: 5,
      name: "Al-Azhar Park",
      description: "Beautiful park in Cairo.",
      position: [30.0417, 31.2626],
    },
    {
      id: 6,
      name: "Egyptian Museum",
      description: "Famous museum with ancient artifacts.",
      position: [30.0478, 31.2336],
    },
  ];

  // ✅ Sidebar star info
  const starInfo = {
    name: "Kareem Mohamed",
    id: "XyZ987654",
    phone: "+201147576198",
    hub: "Maadi",
  };

  // ✅ Table data
  const tableData = [
    // Ship stop = Delivered
    { key: 2, tn: "#89302144", route: "Cairo University", state: "Delivered" },
    { key: 3, tn: "#89302144", route: "The Citadel", state: "Delivered" },
    { key: 4, tn: "#89302144", route: "Giza Pyramids", state: "Delivered" },

    // Ship doesn’t stop = Failed
    { key: 5, tn: "#89302144", route: "Al-Azhar Park", state: "Failed" },
    { key: 6, tn: "#89302144", route: "Egyptian Museum", state: "Failed" },
  ];

  return (
    <TrackingMap
      center={[30.0444, 31.2357]} // initial Cairo center
      checkpoints={mainCheckpoints}
      extraCheckpoints={extraCheckpoints}
      starInfo={starInfo}
      progress={80}
      tableData={tableData}
    />
  );
}

export default Map1;
