"use client";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { Progress, Tag, Table } from "antd";


// ✅ أيقونة بوسطة لأول نقطة
const bostaIcon = new L.Icon({
  iconUrl: `${import.meta.env.BASE_URL}Bosta Logo.svg`,
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// ✅ أيقونة باقي النقاط
const checkpointIcon = new L.Icon({
  iconUrl: `${import.meta.env.BASE_URL}free-location-icon-2952-thumb.png`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// ✅ النقاط الرئيسية (Ship stop = route)
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

// ✅ نقاط إضافية (Ship doesn’t stop)
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

// ✅ حركة الكاميرا
function FlyToLocation({ position }) {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 2 });
    }
  }, [position, map]);
  return null;
}

// ✅ Sidebar جديد (AntD)
const StarTrackingDetails = ({ setFlyTo }) => {
  const columns = [
    { title: "TN/PICKUP", dataIndex: "tn", key: "tn" },
    { title: "ROUTE", dataIndex: "route", key: "route" },
    {
      title: "ORDERS STATE",
      dataIndex: "state",
      key: "state",

      render: (state) =>
        state === "Delivered" ? (
          <Tag className="w-2/3  " color="green">
            {state}
          </Tag>
        ) : (
          <Tag className="w-2/3" color="red">
            {state}
          </Tag>
        ),
    },
  ];

  // ✅ دمج النقاط الأساسية مع الإضافية
  const data = [
    // ✅ Ship stop = Delivered
    { key: 2, tn: "#89302144", route: "Cairo University", state: "Delivered" },
    { key: 3, tn: "#89302144", route: "The Citadel", state: "Delivered" },
    { key: 4, tn: "#89302144", route: "Giza Pyramids", state: "Delivered" },

    // ❌ Ship doesn’t stop = Failed
    { key: 5, tn: "#89302144", route: "Al-Azhar Park", state: "Failed" },
    { key: 6, tn: "#89302144", route: "Egyptian Museum", state: "Failed" },
  ];

  // ✅ ربط route → position
  const routeMap = Object.fromEntries(
    [...mainCheckpoints, ...extraCheckpoints].map((cp) => [
      cp.name,
      cp.position,
    ])
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full h-full overflow-y-auto relative">
      <Link to="/">
        <button className="top-2 right-2 bg-red-500 opacity-90 px-4 py-1 cursor-pointer rounded-[20px] absolute">
          🔙
        </button>
      </Link>

      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-cyan-600 font-semibold text-lg">
          Star Tracking Details
        </h2>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Star Name :</span>
          <span className="text-gray-700">Kareem Mohamed</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Star ID :</span>
          <span className="text-gray-700">XyZ987654</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Phone :</span>
          <span className="text-gray-700">+201147576198</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Hub :</span>
          <span className="text-gray-700">Maadi</span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200">
        <span className="font-medium text-sm">Route Progress :</span>
        <div className="flex items-center gap-2 mt-2">
          <Progress percent={80} showInfo={false} strokeColor="#00b4b4" />
          <span className="text-sm text-gray-600">80%</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-sm mb-2">Star Route</h3>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered={false}
          size="small"
          className="border border-gray-200 rounded-lg"
          onRow={(record) => ({
            onClick: () => {
              const position = routeMap[record.route];
              if (position) setFlyTo(position);
            },
          })}
          rowClassName={(record) => "cursor-pointer hover:bg-gray-100"}
        />
      </div>
    </div>
  );
};

function Map1() {
  const [flyTo, setFlyTo] = useState(null);

  return (
    <div className="flex h-screen w-screen">
      {/* 🗺️ Map */}
      <div className="flex-1">
        <MapContainer
          center={[30.0444, 31.2357]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ✅ النقاط الأساسية */}
          {mainCheckpoints.map((cp, index) => (
            <Marker
              key={cp.id}
              position={cp.position}
              icon={index === 0 ? bostaIcon : checkpointIcon}
            >
              <Popup>{cp.name}</Popup>
            </Marker>
          ))}

          {/* ✅ النقاط الإضافية */}
          {extraCheckpoints.map((cp) => (
            <Marker key={cp.id} position={cp.position} icon={checkpointIcon}>
              <Popup>{cp.name}</Popup>
            </Marker>
          ))}

          {/* ✅ Polyline */}
          <Polyline
            positions={mainCheckpoints.map((cp) => cp.position)}
            color="blue"
          />

          <FlyToLocation position={flyTo} />
        </MapContainer>
      </div>

      {/* 📌 Sidebar الجديد */}
      <div className="w-96 relative">
        <StarTrackingDetails setFlyTo={setFlyTo} />
      </div>
    </div>
  );
}

export default Map1;
