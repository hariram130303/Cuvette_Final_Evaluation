//mockApi.js
import { seedAll } from "../data/seedData";

if (!localStorage.getItem("seeded")) {
  seedAll();
  localStorage.setItem("seeded", "true");
}


const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const api = {
  // ---------- MENU ----------
  async getMenu(category) {
    await delay(200);
    const items = JSON.parse(localStorage.getItem("menu") || "[]");
    return category ? items.filter((i) => i.category === category) : items;
  },

  async createMenuItem(item) {
    await delay(200);
    const items = JSON.parse(localStorage.getItem("menu") || "[]");
    items.push(item);
    localStorage.setItem("menu", JSON.stringify(items));
    return item;
  },

  // ---------- ORDERS ----------
  async getOrders(status, type) {
    await delay(150);
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    let filtered = orders;
    if (status) filtered = filtered.filter((o) => o.status === status);
    if (type) filtered = filtered.filter((o) => o.type === type);
    return filtered;
  },

  async createOrder(order) {
    await delay(200);
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const randomId = Math.floor(Math.random() * 401) + 100;
    const randomTable = Math.floor(Math.random() * 30) + 1;
    const newOrder = {
      ...order,
      id: randomId,
      tableId: order.tableId || randomTable,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    return newOrder;
  },

  async updateOrder(id, patch) {
    await delay(100);
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const idx = orders.findIndex((o) => o.id === id);
    if (idx >= 0) {
      orders[idx] = { ...orders[idx], ...patch };
      localStorage.setItem("orders", JSON.stringify(orders));
      return orders[idx];
    }
    return null;
  },

  // ---------- TABLES ----------
  async getTables(searchTerm) {
    await delay(100);
    const tables = JSON.parse(localStorage.getItem("tables") || "[]");
    if (!searchTerm) return tables;
    return tables.filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  async addTable(table) {
    await delay(120);
    const tables = JSON.parse(localStorage.getItem("tables") || "[]");
    tables.push(table);
    localStorage.setItem("tables", JSON.stringify(tables));
    return table;
  },

  async updateTable(id, patch) {
    await delay(100);
    const tables = JSON.parse(localStorage.getItem("tables") || "[]");
    const idx = tables.findIndex((t) => t.id === id);
    if (idx >= 0) {
      tables[idx] = { ...tables[idx], ...patch };
      localStorage.setItem("tables", JSON.stringify(tables));
      return tables[idx];
    }
    return null;
  },

  // ---------- CHEFS ----------
  async getChefs() {
    await delay(100);
    return JSON.parse(localStorage.getItem("chefs") || "[]");
  },

  async updateChef(id, patch) {
    await delay(100);
    const chefs = JSON.parse(localStorage.getItem("chefs") || "[]");
    const idx = chefs.findIndex((c) => c.id === id);
    if (idx >= 0) {
      chefs[idx] = { ...chefs[idx], ...patch };
      localStorage.setItem("chefs", JSON.stringify(chefs));
      return chefs[idx];
    }
    return null;
  },

  // ---------- ANALYTICS ----------
  async analytics() {
    await delay(100);
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const chefs = JSON.parse(localStorage.getItem("chefs") || "[]");
    const revenue = orders.reduce(
      (sum, o) => sum + (o.items?.reduce((a, b) => a + (b.price * b.qty || 0), 0) || 0),
      0
    );

    const dineIn = orders.filter((o) => o.type === "DINE_IN").length;
    const takeAway = orders.filter((o) => o.type === "TAKE_AWAY").length;
    const served = orders.filter((o) => o.status === "DONE").length;

    // Simulate daily revenue for charts
    const dailyRevenue = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
      day: d,
      revenue: Math.floor(Math.random() * 3000) + 1000,
    }));

    return {
      totalChefs: chefs.length,
      totalRevenue: `₹${(revenue / 1000).toFixed(1)}K`,
      totalOrders: orders.length,
      totalClients: 65,
      dailyRevenue,
      orderSummary: {
        dineIn,
        takeAway,
        served,
      },
    };
  },
};
