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

// ✅ Icons
const bostaIcon = new L.Icon({
  iconUrl: `${import.meta.env.BASE_URL}Bosta Logo.svg`,
  iconSize: [60, 60],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const checkpointIcon = new L.Icon({
  iconUrl: `${import.meta.env.BASE_URL}free-location-icon-2952-thumb.png`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// ✅ Fly camera helper
function FlyToLocation({ position }) {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 2 });
    }
  }, [position, map]);
  return null;
}

// ✅ Sidebar
function StarTrackingDetails({ setFlyTo, starInfo, progress, tableData, routeMap }) {
  const columns = [
    { title: "TN/PICKUP", dataIndex: "tn", key: "tn" },
    { title: "ROUTE", dataIndex: "route", key: "route" },
    {
      title: "ORDERS STATE",
      dataIndex: "state",
      key: "state",
      render: (state) =>
        state === "Delivered" ? (
          <Tag className="w-2/3" color="green">{state}</Tag>
        ) : (
          <Tag className="w-2/3" color="red">{state}</Tag>
        ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full h-full overflow-y-auto relative">
      <Link to="/">
        <button className="top-2 right-2 bg-red-500 opacity-90 px-4 py-1 cursor-pointer rounded-[20px] absolute">
          🔙
        </button>
      </Link>

      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-cyan-600 font-semibold text-lg">Star Tracking Details</h2>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Star Name :</span>
          <span className="text-gray-700">{starInfo.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Star ID :</span>
          <span className="text-gray-700">{starInfo.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Phone :</span>
          <span className="text-gray-700">{starInfo.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Hub :</span>
          <span className="text-gray-700">{starInfo.hub}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200">
        <span className="font-medium text-sm">Route Progress :</span>
        <div className="flex items-center gap-2 mt-2">
          <Progress percent={progress} showInfo={false} strokeColor="#00b4b4" />
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-sm mb-2">Star Route</h3>
        <Table
          columns={columns}
          dataSource={tableData}
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
          rowClassName={() => "cursor-pointer hover:bg-gray-100"}
        />
      </div>
    </div>
  );
}

// ✅ Reusable TrackingMap
function TrackingMap({ center, checkpoints, extraCheckpoints = [], starInfo, progress, tableData }) {
  const [flyTo, setFlyTo] = useState(null);

  const routeMap = Object.fromEntries(
    [...checkpoints, ...extraCheckpoints].map((cp) => [cp.name, cp.position])
  );

  return (
    <div className="flex h-screen w-screen">
      {/* Map */}
      <div className="flex-1">
        <MapContainer center={center} zoom={12} className="h-full w-full">
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {checkpoints.map((cp, index) => (
            <Marker
              key={cp.id}
              position={cp.position}
              icon={index === 0 ? bostaIcon : checkpointIcon}
            >
              <Popup>{cp.name}</Popup>
            </Marker>
          ))}

          {extraCheckpoints.map((cp) => (
            <Marker key={cp.id} position={cp.position} icon={checkpointIcon}>
              <Popup>{cp.name}</Popup>
            </Marker>
          ))}

          <Polyline positions={checkpoints.map((cp) => cp.position)} color="blue" />

          <FlyToLocation position={flyTo} />
        </MapContainer>
      </div>

      {/* Sidebar */}
      <div className="w-96 relative">
        <StarTrackingDetails
          setFlyTo={setFlyTo}
          starInfo={starInfo}
          progress={progress}
          tableData={tableData}
          routeMap={routeMap}
        />
      </div>
    </div>
  );
}

export default TrackingMap;
