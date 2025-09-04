import { useState } from "react";
import { ChevronDown, ChevronRight, Package, Truck, BarChart3, Users } from "lucide-react"; // example icons
import logo from "../public/Bosta Logo.svg"
import Admin from '../public/Businesses Stars Del.png'
export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState("fleet");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-white border-r flex flex-col  h-dvh ">
      {/* Header */}
      <div className="flex items-center gap-x-1    p-4 ">
<img src={logo} alt="" />  
|    
  <img src={Admin} />
      </div>

      {/* Create Button */}
      <div className="px-4 mb-4">
        <button className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700">
          Create <span className="text-lg font-bold">+</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto text-sm ">
        <ul className="space-y-1">
          <li className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            <BarChart3 size={16} />
            Businesses
          </li>
          <li className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            <BarChart3 size={16} />
            Hub Analytics
          </li>

          {/* Fleet Dropdown */}
          <li>
            <button
              onClick={() => toggleMenu("fleet")}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-md ${
                openMenu === "fleet" ? "bg-red-50 text-red-600 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <Truck size={16} />
                Fleet
              </span>
              {openMenu === "fleet" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {openMenu === "fleet" && (
              <ul className="pl-10 pr-2 py-1 space-y-1 text-gray-600">
                <li className="hover:text-red-600 cursor-pointer">Stars</li>
                <li className="hover:text-red-600 cursor-pointer">Star Salary</li>
                <li className="hover:text-red-600 cursor-pointer">Bonus & Deduction</li>
                <li className="text-red-600 font-medium">Star Tracking</li>
                <li className="hover:text-red-600 cursor-pointer">Vendors</li>
              </ul>
            )}
          </li>

          <li className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            <Package size={16} />
            Packaging
          </li>
          <li className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            <Users size={16} />
            Cashier
          </li>
          <li className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            <Truck size={16} />
            Deliveries
          </li>
        </ul>
      </nav>
    </aside>
  );
}
