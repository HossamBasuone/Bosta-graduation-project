import { useState } from "react";
import { Calendar } from "lucide-react";
import { Table, Input, Button } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import flag from "./assets/flag (1).png";
import star1 from "./assets/star1.png";
import star2 from "./assets/satr2.png";
import star3 from "./assets/star3.png";

export default function Header() {
  const [dateRange, setDateRange] = useState("2/9/2025");
  const [hub, setHub] = useState("");
  const [star, setStar] = useState("");
  const [showStarArea, setShowStarArea] = useState(true);

  // ✅ Data with unique images
  const dataSource = [
    {
      key: "1",
      name: "Kareem Mohamed",
      img: star3,
      starId: "XyZ987654",
      phone: "+201147576198",
      hub: "Maadi",
      progress: 80,
    },

    {
      key: "2",
      name: "Ahmed Ali",
      img: star2,
      starId: "AbCdEf123456",
      phone: "+201147576197",
      hub: "Maadi",
      progress: 100,
    },
    {
      key: "3",
      name: "Eyad Essam",
      img: star1,
      starId: "UfHC4wa0zwBstVLPzd73L",
      phone: "+201147576196",
      hub: "Maadi",
      progress:"100",
    },
  ];

  // ✅ Columns with avatar + progress bar + unique link
  const columns = [
    {
      title: "Star Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={record.img}
            alt={record.name}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "STAR ID",
      dataIndex: "starId",
      key: "starId",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "HUB",
      dataIndex: "hub",
      key: "hub",
    },
    {
      title: "ORDERS PROGRESS",
      dataIndex: "progress",
      key: "progress",
      render: (value) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, background: "#f0f0f0", borderRadius: 4 }}>
            <div
              style={{
                width: `${value}%`,
                background: "#00b4b4",
                height: 8,
                borderRadius: 4,
              }}
            />
          </div>
          <span>{value}%</span>
        </div>
      ),
    },
    {
      title: "TYPE",
      key: "action",
      render: (_, record) => (
        <Link to={`/map${record.key}`} style={{ color: "#1890ff" }}>
          Live tracking →
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Star Tracking</h1>
          <div className="flex items-center gap-4">
            {/* Country Selector */}
            <div className="flex items-center gap-2 border rounded-md px-3 py-1 bg-white">
              <img src={flag} alt="" />
              <span>Egypt</span>
            </div>

            {/* User Info */}
            <div className="flex flex-col text-right">
              <span className="font-medium">Hossam Basuone</span>
              <span className="text-sm text-gray-500">
                Hossam.basuone@bosta.co
              </span>
            </div>
          </div>
        </div>

        {/* Description & Date Range */}
        <div className="flex justify-between">
          <p className="text-gray-600 mb-4">Manage action logs for stars</p>
          <div className="flex items-center border rounded-md px-3 py-2 w-1/4">
            <Calendar size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              value={dateRange}
              readOnly
              className="outline-none text-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="text-sm text-gray-500">Hub</label>
            <select
              value={hub}
              onChange={(e) => setHub(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="hub1">Maadi </option>
              <option value="hub2">Alex</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm text-gray-500">Star</label>
            <select
              value={star}
              onChange={(e) => setStar(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select</option>
              <option value="star1">Kareem Mohamed</option>
              <option value="star2">Ahmed Ali</option>
              <option value="star2">Eyad Essam</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex  gap-5 items-center mt-6 ">
            <button className="px-4 py-2 border rounded-md">Clear</button>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
              Search
            </button>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2 border-2 border-gray-100 rounded-xl p-3">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showStarArea}
              onChange={() => setShowStarArea(!showStarArea)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-teal-500 relative transition">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </div>
            <span className="ml-2 text-gray-700">Show Star Area</span>
          </label>
        </div>
      </div>

      <div className="p-6 bg-white rounded-xl shadow-sm">
        {/* Table header with search + actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Star Tracking</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="w-64"
            />
            <Button icon={<FilterOutlined />}>Filter</Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
          </div>
        </div>

        {/* ✅ Table with avatars, progress bar & live tracking links */}
        <Table
          rowSelection={{}}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 50,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            position: ["bottomCenter"],
          }}
        />
      </div>
    </>
  );
}
