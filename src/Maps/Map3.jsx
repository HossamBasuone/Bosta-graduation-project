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
  iconUrl: "/Bosta Logo.svg",
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// ✅ أيقونة باقي النقاط
const checkpointIcon = new L.Icon({
  iconUrl: "/free-location-icon-2952-thumb.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// ✅ النقاط الرئيسية (Ship stop = old route)
const mainCheckpoints = [
  {
    id: 1,
    name: "Maadi (Start Point)",
    description: "Start point in Maadi.",
    position: [29.9626, 31.2769], // المعادي
  },
  {
    id: 2,
    name: "City Stars Mall",
    description: "One of the biggest malls in Cairo.",
    position: [30.0726, 31.3461],
  },
  {
    id: 3,
    name: "Downtown Cairo",
    description: "The historic and cultural heart of Cairo.",
    position: [30.0444, 31.2357],
  },
  {
    id: 4,
    name: "Nile Corniche",
    description: "Scenic area by the Nile River.",
    position: [30.0459, 31.2243],
  },
  {
    id: 5,
    name: "Cairo Festival City",
    description: "Modern shopping and business hub.",
    position: [30.0306, 31.4086],
  },
];

// ✅ نقاط إضافية (Ship doesn’t stop)
const extraCheckpoints = [
  {
    id: 6,
    name: "October War Panorama",
    description: "Museum commemorating the 1973 war.",
    position: [30.0724, 31.309],
  },
  {
    id: 7,
    name: "Grand Egyptian Museum",
    description: "New museum near Giza pyramids.",
    position: [29.9897, 31.1342],
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

// ✅ مكون Star Tracking Details (يعرض نفس route بتاع الخريطة)
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
          <Tag color="green">{state}</Tag>
        ) : (
          <Tag color="red">{state}</Tag>
        ),
    },
  ];

  // ✅ Fake data linked to Cairo route
  const data = [
    { key: 2, tn: "#89302144", route: "City Stars Mall", state: "Delivered" },
    { key: 3, tn: "#89302144", route: "Downtown Cairo", state: "Delivered" },
    { key: 4, tn: "#89302144", route: "Nile Corniche", state: "Delivered" },
    { key: 5, tn: "#89302144", route: "Cairo Festival City", state: "Delivered" },
  ];

  // ✅ خريطة تربط اسم الـ Route بالإحداثيات
  const routeMap = Object.fromEntries(
    mainCheckpoints.map((cp) => [cp.name, cp.position])
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
          <span className="text-gray-700">Eyad Essam</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Star ID :</span>
          <span className="text-gray-700">UfHC4wa0zwBstVLPzd73L</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Phone :</span>
          <span className="text-gray-700">+201147576196</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Hub :</span>
          <span className="text-gray-700">FM Alex</span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200">
        <span className="font-medium text-sm">Route Progress :</span>
        <div className="flex items-center gap-2 mt-2">
          <Progress percent={100} showInfo={false} strokeColor="#00b4b4" />
          <span className="text-sm text-gray-600">100%</span>
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
          rowClassName="cursor-pointer hover:bg-gray-100"
          
        />
      </div>
    </div>
  );
};

function Map3() {
  const [flyTo, setFlyTo] = useState(null);

  return (
    <div className="flex h-screen w-screen">
      {/* 🗺️ الخريطة */}
      <div className="flex-1">
        <MapContainer
          center={[29.9626, 31.2769]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ✅ النقاط الرئيسية */}
          {mainCheckpoints.map((cp, index) => (
            <Marker
              key={cp.id}
              position={cp.position}
              icon={index === 0 ? bostaIcon : checkpointIcon}
            >
              <Popup>{cp.name}</Popup>
            </Marker>
          ))}

          {/* ✅ خط المسار */}
          <Polyline
            positions={mainCheckpoints.map((cp) => cp.position)}
            color="blue"
          />

          <FlyToLocation position={flyTo} />
        </MapContainer>
      </div>

      {/* 📌 الشريط الجانبي الجديد */}
      <div className="w-96 relative">
        <StarTrackingDetails setFlyTo={setFlyTo} />
      </div>
    </div>
  );
}

export default Map3;
