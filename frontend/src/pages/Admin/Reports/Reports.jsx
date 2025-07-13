import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { ArrowUpRight } from "lucide-react";

const Reports = () => {
  // Barangay data
  const populationData = [
    { name: "Jan", Population: 5200 },
    { name: "Feb", Population: 5230 },
    { name: "Mar", Population: 5250 },
    { name: "Apr", Population: 5275 },
    { name: "May", Population: 5300 },
    { name: "Jun", Population: 5320 },
    { name: "Jul", Population: 5340 },
  ];

  const requestData = [
    {
      name: "Jan",
      Clearance: 120,
      Certificate: 80,
      Permit: 40,
      Complaint: 15,
    },
    {
      name: "Feb",
      Clearance: 130,
      Certificate: 85,
      Permit: 42,
      Complaint: 18,
    },
    {
      name: "Mar",
      Clearance: 110,
      Certificate: 90,
      Permit: 38,
      Complaint: 12,
    },
    {
      name: "Apr",
      Clearance: 140,
      Certificate: 95,
      Permit: 45,
      Complaint: 20,
    },
    {
      name: "May",
      Clearance: 135,
      Certificate: 100,
      Permit: 50,
      Complaint: 17,
    },
    {
      name: "Jun",
      Clearance: 145,
      Certificate: 105,
      Permit: 48,
      Complaint: 19,
    },
    {
      name: "Jul",
      Clearance: 150,
      Certificate: 110,
      Permit: 52,
      Complaint: 21,
    },
  ];

  const pieData = [
    { name: "Barangay Clearance", value: 38, color: "#A5D8FF" },
    { name: "Certificate of Residency", value: 27, color: "#C3F584" },
    { name: "Business Permit", value: 18, color: "#FFD6E0" },
    { name: "Complaint", value: 17, color: "#FFF3BF" },
  ];

  const budgetData = [
    { name: "Jan", Budget: 200000, Expenses: 180000 },
    { name: "Feb", Budget: 210000, Expenses: 185000 },
    { name: "Mar", Budget: 220000, Expenses: 190000 },
    { name: "Apr", Budget: 230000, Expenses: 200000 },
    { name: "May", Budget: 240000, Expenses: 210000 },
    { name: "Jun", Budget: 250000, Expenses: 220000 },
    { name: "Jul", Budget: 260000, Expenses: 230000 },
  ];

  const purokData = [
    { purok: "Purok 1", residents: 900 },
    { purok: "Purok 2", residents: 1100 },
    { purok: "Purok 3", residents: 800 },
    { purok: "Purok 4", residents: 1200 },
    { purok: "Purok 5", residents: 1240 },
  ];

  const COLORS = ["#A5D8FF", "#C3F584", "#FFD6E0", "#FFF3BF", "#B197FC"];

  // Card style helpers
  const cardClass =
    "bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between";
  const pastelCard = (bg) =>
    `rounded-2xl shadow-sm p-6 flex flex-col justify-between ${bg}`;

  return (
    <div className="min-h-screen bg-white rounded-lg shadow-md p-6 mt-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-5 ">Barangay Reports</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Population Card */}
        <div className={cardClass}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg font-semibold text-black">Population</div>
              <div className="text-xs text-gray-500 mb-2">
                Growth (Jan-Jul 2024)
              </div>
              <div className="text-2xl font-bold text-black">5,340</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <ArrowUpRight size={14} />
                +2.7% this year
              </div>
            </div>
            <button className="bg-[#f1f5fd] text-xs px-3 py-1 rounded-lg font-medium text-black hover:bg-[#e3fafc]">
              View Report
            </button>
          </div>
          <div className="h-28 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={populationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#222"
                  tick={{ fill: "#222", fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Population"
                  stroke="#A5D8FF"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Requests Pie */}
        <div className={cardClass + " col-span-1"}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg font-semibold text-black">
                Request Types
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Distribution (Jul 2024)
              </div>
            </div>
            <button className="bg-[#f1f5fd] text-xs px-3 py-1 rounded-lg font-medium text-black hover:bg-[#e3fafc]">
              View Report
            </button>
          </div>
          <div className="flex flex-col items-center mt-2">
            <div className="h-32 w-full flex items-center justify-center">
              <ResponsiveContainer width="80%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs">
              {pieData.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ background: d.color }}
                  ></span>
                  <span className="text-black">{d.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Budget Card */}
        <div className={pastelCard("bg-[#f1f5fd] col-span-1")}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold text-black">Budget</div>
              <div className="text-xs text-gray-500 mb-2">
                Allocation (Jan-Jul 2024)
              </div>
              <div className="text-2xl font-bold text-black">₱260,000</div>
              <div className="text-xs text-gray-500">of ₱300,000</div>
            </div>
            <button className="bg-white text-xs px-3 py-1 rounded-lg font-medium text-black border hover:bg-[#f8fafc]">
              View Report
            </button>
          </div>
          {/* Progress bar */}
          <div className="mt-6 flex items-center justify-center">
            <div className="w-full h-3 bg-[#e3fafc] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#A5D8FF] rounded-full"
                style={{ width: "87%" }}
              ></div>
            </div>
            <span className="ml-2 text-xs text-black font-bold">87%</span>
          </div>
        </div>

        {/* Certificates Card */}
        <div className={pastelCard("bg-[#fff3bf] col-span-1")}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold text-black">
                Certificates
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Issued (Jul 2024)
              </div>
              <div className="text-2xl font-bold text-black">110</div>
              <span className="text-xs text-gray-500">of 150 requests</span>
            </div>
            <button className="bg-white text-xs px-3 py-1 rounded-lg font-medium text-black border hover:bg-[#f8fafc]">
              View Report
            </button>
          </div>
          {/* Progress bar */}
          <div className="mt-6 w-full">
            <div className="w-full h-2 bg-[#ffe7b2] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFD6E0] rounded-full"
                style={{ width: "73%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Requests by Month */}
        <div className={cardClass + " col-span-2"}>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold text-black">
                Requests by Month
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Breakdown (Jan-Jul 2024)
              </div>
            </div>
            <button className="bg-[#f1f5fd] text-xs px-3 py-1 rounded-lg font-medium text-black hover:bg-[#e3fafc]">
              View Report
            </button>
          </div>
          <div className="h-36 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#222"
                  tick={{ fill: "#222", fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip />
                <Bar
                  dataKey="Clearance"
                  stackId="a"
                  fill="#A5D8FF"
                  barSize={14}
                />
                <Bar
                  dataKey="Certificate"
                  stackId="a"
                  fill="#C3F584"
                  barSize={14}
                />
                <Bar dataKey="Permit" stackId="a" fill="#FFD6E0" barSize={14} />
                <Bar
                  dataKey="Complaint"
                  stackId="a"
                  fill="#FFF3BF"
                  barSize={14}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Purok Distribution */}
        <div
          className={pastelCard(
            "bg-[#e3fafc] flex-row items-center justify-between col-span-2"
          )}
        >
          <div className="w-full">
            <div className="text-lg font-semibold text-black mb-2">
              Purok Distribution
            </div>
            <div className="flex flex-col gap-2">
              {purokData.map((purok, idx) => (
                <div key={purok.purok} className="flex items-center gap-2">
                  <span className="w-24 text-xs text-black">{purok.purok}</span>
                  <div className="flex-1 h-2 bg-[#e6fcf5] rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(purok.residents / 1240) * 100}%`,
                        background: COLORS[idx % COLORS.length],
                      }}
                    ></div>
                  </div>
                  <span className="w-12 text-xs text-black text-right">
                    {purok.residents}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example goal cards */}
        <div
          className={pastelCard(
            "bg-[#f1f5fd] flex-row items-center justify-between col-span-1"
          )}
        >
          <div>
            <div className="text-xs text-black">Barangay Project Fund</div>
            <div className="text-sm font-bold text-black">
              ₱125,000 of ₱250,000
            </div>
            <div className="w-full h-2 bg-[#e3fafc] rounded-full mt-2">
              <div
                className="h-full bg-[#A5D8FF] rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className={pastelCard(
            "bg-[#fff3bf] flex-row items-center justify-between col-span-1"
          )}
        >
          <div>
            <div className="text-xs text-black">Scholarship Fund</div>
            <div className="text-sm font-bold text-black">
              ₱60,000 of ₱100,000
            </div>
            <div className="w-full h-2 bg-[#ffe7b2] rounded-full mt-2">
              <div
                className="h-full bg-[#FFD6E0] rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className={pastelCard(
            "bg-[#f1c0e8] flex-row items-center justify-between col-span-1"
          )}
        >
          <div>
            <div className="text-xs text-black">Health Program</div>
            <div className="text-sm font-bold text-black">
              ₱40,000 of ₱80,000
            </div>
            <div className="w-full h-2 bg-[#f8e1f4] rounded-full mt-2">
              <div
                className="h-full bg-[#B197FC] rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className={pastelCard(
            "bg-[#e3fafc] flex-row items-center justify-between col-span-1"
          )}
        >
          <div>
            <div className="text-xs text-black">Infrastructure</div>
            <div className="text-sm font-bold text-black">
              ₱90,000 of ₱200,000
            </div>
            <div className="w-full h-2 bg-[#e3fafc] rounded-full mt-2">
              <div
                className="h-full bg-[#C3F584] rounded-full"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
