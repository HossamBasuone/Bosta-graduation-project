"use client";
import React from "react";
import TrackingMap from "./TrackingMap"; // reusable component

function Map3() {
  // ✅ Main checkpoints
  const mainCheckpoints = [
    { id: 1, name: "Maadi (Start Point)", description: "Start point in Maadi.", position: [29.9626, 31.2769] },
    { id: 2, name: "City Stars Mall", description: "One of the biggest malls in Cairo.", position: [30.0726, 31.3461] },
    { id: 3, name: "Downtown Cairo", description: "The historic and cultural heart of Cairo.", position: [30.0444, 31.2357] },
    { id: 4, name: "Nile Corniche", description: "Scenic area by the Nile River.", position: [30.0459, 31.2243] },
    { id: 5, name: "Cairo Festival City", description: "Modern shopping and business hub.", position: [30.0306, 31.4086] },
  ];

  // ✅ Extra checkpoints (ship doesn’t stop)
  const extraCheckpoints = [
    { id: 6, name: "October War Panorama", description: "Museum commemorating the 1973 war.", position: [30.0724, 31.309] },
    { id: 7, name: "Grand Egyptian Museum", description: "New museum near Giza pyramids.", position: [29.9897, 31.1342] },
  ];

  // ✅ Sidebar info
  const starInfo = {
    name: "Eyad Essam",
    id: "UfHC4wa0zwBstVLPzd73L",
    phone: "+201147576196",
    hub: "FM Alex",
  };

  // ✅ Table data
  const tableData = [
    { key: 2, tn: "#89302144", route: "City Stars Mall", state: "Delivered" },
    { key: 3, tn: "#89302144", route: "Downtown Cairo", state: "Delivered" },
    { key: 4, tn: "#89302144", route: "Nile Corniche", state: "Delivered" },
    { key: 5, tn: "#89302144", route: "Cairo Festival City", state: "Delivered" },
  ];

  return (
    <TrackingMap
      center={[29.9626, 31.2769]} // map center
      checkpoints={mainCheckpoints}
      extraCheckpoints={extraCheckpoints}
      starInfo={starInfo}
      progress={100}
      tableData={tableData}
    />
  );
}

export default Map3;
