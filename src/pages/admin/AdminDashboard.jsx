//Admin Dashboard Page
import React, { useEffect, useState } from "react";
import { seedAll } from "../../data/seedData";
import styles from "../../styles/AdminDashboard.module.css";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ComposedChart,
  Bar,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Users, IndianRupee, ClipboardList, Soup } from "lucide-react";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    chefs: [],
    orders: [],
    clients: [],
    revenue: 0,
    tables: [],
  });

  const [orderPeriod, setOrderPeriod] = useState("Daily");
  const [revenuePeriod, setRevenuePeriod] = useState("Daily");

  // ✅ Fetch data and compute totals from seedData.js
useEffect(() => {
  async function fetchData() {
    try {
      // 🧩 Import seeded data directly
      const storedChefs = JSON.parse(localStorage.getItem("chefs"));
      const storedOrders = JSON.parse(localStorage.getItem("orders"));
      const storedTables = JSON.parse(localStorage.getItem("tables"));
      const storedMenu = JSON.parse(localStorage.getItem("menu")) || [];

      // 🧠 If data doesn’t exist in localStorage, seed it
      if (!storedChefs || !storedOrders || !storedTables) {
        seedAll();
      }

      const chefs = storedChefs || JSON.parse(localStorage.getItem("chefs"));
      const orders = storedOrders || JSON.parse(localStorage.getItem("orders"));
      const tables = storedTables || JSON.parse(localStorage.getItem("tables"));

      // 💰 Total revenue from all orders (simulate based on random menu items)
      const totalRevenue = orders.reduce((sum, order) => {
        const orderValue =
          order.items?.reduce((itemSum, item) => {
            const menuItem = storedMenu.find((m) => m.name === item.name);
            return itemSum + (menuItem?.price || 0) * (item.qty || 1);
          }, 0) || 0;
        return sum + orderValue;
      }, 0);

      // ☎️ Fake unique clients (for UI consistency)
      const fakeClients = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        phone: `99999${1000 + i}`,
      }));

      setDashboardData({
        chefs,
        orders,
        clients: fakeClients,
        tables,
        revenue: totalRevenue,
      });
    } catch (err) {
      console.error("Error fetching dashboard data from seedData:", err);
    }
  }

  fetchData();
}, []);

  // 🥧 Static demo order summary (could be dynamic)
  const orderSummarySets = {
    Daily: [
      { name: "Take Away", value: 6 },
      { name: "Served", value: 9 },
      { name: "Dine In", value: 5 },
    ],
    Weekly: [
      { name: "Take Away", value: 36 },
      { name: "Served", value: 52 },
      { name: "Dine In", value: 41 },
    ],
    Monthly: [
      { name: "Take Away", value: 150 },
      { name: "Served", value: 200 },
      { name: "Dine In", value: 170 },
    ],
  };

  const COLORS = ["#5B5B5B", "#828282", "#2C2C2C"];

  const revenueSets = {
    Daily: [
      { day: "Mon", value: 3000 },
      { day: "Tue", value: 5000 },
      { day: "Wed", value: 4000 },
      { day: "Thu", value: 6000 },
      { day: "Fri", value: 8000 },
      { day: "Sat", value: 7000 },
      { day: "Sun", value: 9000 },
    ],
    Weekly: [
      { day: "Week 1", value: 35000 },
      { day: "Week 2", value: 42000 },
      { day: "Week 3", value: 39000 },
      { day: "Week 4", value: 46000 },
    ],
    Monthly: [
      { day: "Jan", value: 150000 },
      { day: "Feb", value: 180000 },
      { day: "Mar", value: 170000 },
      { day: "Apr", value: 200000 },
      { day: "May", value: 220000 },
      { day: "Jun", value: 210000 },
    ],
  };

  const tables = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    reserved: [5, 6, 9, 12, 17, 20, 21, 22, 26, 29, 30].includes(i + 1),
  }));

  return (
      <div className={styles.dashboard}>
      {/* 🔍 Filter Bar */}
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Filter..."
          className={styles.filterInput}
        />
      </div>

      <div className={styles.section}>
              {/* 📦 Analytics Summary */}
      <h2 className={styles.sectionTitle}>Analytics</h2>
      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Soup size={22} />
          </div>
          <div>
            <h3>{dashboardData.chefs.length}</h3>
            <p className={styles.cardLabel}>Total Chef</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <IndianRupee size={22} />
          </div>
          <div>
            <h3>{dashboardData.revenue.toLocaleString()}</h3>
            <p className={styles.cardLabel}>Total Revenue</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <ClipboardList size={22} />
          </div>
          <div>
            <h3>{dashboardData.orders.length}</h3>
            <p className={styles.cardLabel}>Total Orders</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Users size={22} />
          </div>
          <div>
            <h3>{dashboardData.clients.length}</h3>
            <p className={styles.cardLabel}>Total Clients</p>
          </div>
        </div>
      </div>

      {/* 📊 Analytics Charts */}
      <div className={styles.analyticsGrid}>
        {/* 🍕 Order Summary */}
      <div className={styles.chartCard}>
        <div className={styles.cardHeader}>
          <div>
            <h4 className={styles.orderTitle}>Order Summary</h4>
            <p className={styles.orderSubtitle}>hijokplrngntop[gtgkoikokyhikoy[phokphnoy</p>
          </div>
          <select
            className={styles.dropdown}
            value={orderPeriod}
            onChange={(e) => setOrderPeriod(e.target.value)}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        {/* Top order stats */}
        <div className={styles.summaryStats}>
          {orderSummarySets[orderPeriod].map((item, i) => (
            <div key={i} className={styles.summaryBox}>
              <h3>{item.value.toString().padStart(2, "0")}</h3>
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        {/* Donut chart and progress bars */}
        <div className={styles.summaryContent}>
          <div className={styles.pieChartWrap}>
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie
                  data={orderSummarySets[orderPeriod]}
                  dataKey="value"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                >
                  {orderSummarySets[orderPeriod].map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.progressWrap}>
            {orderSummarySets[orderPeriod].map((item, i) => {
              const total = orderSummarySets[orderPeriod].reduce((s, v) => s + v.value, 0);
              const percent = Math.round((item.value / total) * 100);
              return (
                <div key={i} className={styles.progressItem}>
                  <div className={styles.progressLabel}>
                    <span>{item.name}</span>
                    <span>({percent}%)</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${percent}%`, backgroundColor: COLORS[i % COLORS.length] }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


        {/* 📈 Revenue */}
<div className={styles.chartCard}>
  <div className={styles.cardHeader}>
    <h4 className={styles.chartTitle}>Revenue</h4>
    <select
      className={styles.dropdown}
      value={revenuePeriod}
      onChange={(e) => setRevenuePeriod(e.target.value)}
    >
      <option>Daily</option>
      <option>Weekly</option>
      <option>Monthly</option>
    </select>
  </div>

  {/* White inner chart box */}
  <div className={styles.chartInnerBox}>
    <ResponsiveContainer width="100%" height={200}>
      <ComposedChart
        data={revenueSets[revenuePeriod]}
        margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="#f1f5f9"
        />
        <Bar dataKey="value" barSize={35} fill="#e5e7eb" radius={[8, 8, 0, 0]} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#000"
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
        <XAxis
          dataKey="day"
          stroke="#9ca3af"
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
</div>




        {/* 🪑 Tables */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h4>Tables</h4>
            <div className={styles.legend}>
              <span>
                <span className={styles.dotGreen}></span> Reserved
              </span>
              <span>
                <span className={styles.dotGray}></span> Available
              </span>
            </div>
          </div>
          <div className={styles.tablesGrid}>
            {tables.map((t) => (
              <div
                key={t.id}
                className={`${styles.tableCard} ${
                  t.reserved ? styles.reserved : styles.available
                }`}
              >
                Table <strong>{t.id.toString().padStart(2, "0")}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 👨‍🍳 Chef Orders */}
      <div className={styles.tableSection}>
        <h4>Chef Orders</h4>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Chef Name</th>
              <th>Orders Taken</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.chefs.map((chef, index) => (
              <tr key={index}>
                <td>{chef.name}</td>
                <td>{chef.ordersTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
    
  );
};

export default AdminDashboard;
