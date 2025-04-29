import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

// Sample data for materials states
const materialsData = [
  { name: "Material A", state1: 4000, state2: 2400 },
  { name: "Material B", state1: 3000, state2: 1398 },
  { name: "Material C", state1: 2000, state2: 9800 },
  { name: "Material D", state1: 2780, state2: 3908 },
  { name: "Material E", state1: 1890, state2: 4800 },
  { name: "Material F", state1: 2390, state2: 3800 },
  { name: "Material G", state1: 3490, state2: 4300 },
];

// Sample data for orders details
const ordersData = [
  { name: "Order A", orders: 4000 },
  { name: "Order B", orders: 3000 },
  { name: "Order C", orders: 2000 },
  { name: "Order D", orders: 2780 },
  { name: "Order E", orders: 1890 },
  { name: "Order F", orders: 2390 },
  { name: "Order G", orders: 3490 },
];

// Settings for the gauge chart
const gaugeSettings = {
  width: 200,
  height: 200,
  value: 60,
};

function AdminCharts() {
  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Materials States</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={materialsData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="state1" fill="#8884d8" />
          <Bar dataKey="state2" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Orders Details</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={ordersData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Customers</h2>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Gauge
          {...gaugeSettings}
          cornerRadius="50%"
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#52b202",
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
          })}
        />
      </div>
    </div>
  );
}

export default AdminCharts;
