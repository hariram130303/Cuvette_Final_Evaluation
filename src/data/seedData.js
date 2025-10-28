// seedData.js
import { v4 as uuid } from "uuid";

// --- MENU ---
const menu = [
  // 🍕 Pizzas
  { id: uuid(), name: "Capricciosa", description: "Classic cheese pizza", price: 199, averagePreparationTime: 15, category: "Pizza", stock: 12, imageUrl: "/assets/pizza/capricciosa.jpg", rating: 4.5 },
  { id: uuid(), name: "Pepperoni", description: "Spicy pepperoni & mozzarella", price: 249, averagePreparationTime: 18, category: "Pizza", stock: 8, imageUrl: "/assets/pizza/pepperoni.jpg", rating: 4.7 },
  { id: uuid(), name: "Sicilian", description: "Loaded with fresh veggies", price: 229, averagePreparationTime: 14, category: "Pizza", stock: 10, imageUrl: "/assets/pizza/sicilian.jpg", rating: 4.4 },
  { id: uuid(), name: "Neopolitan", description: "Tomato, basil & mozzarella", price: 179, averagePreparationTime: 12, category: "Pizza", stock: 20, imageUrl: "/assets/pizza/neopolitan.jpg", rating: 4.6 },
  { id: uuid(), name: "Marinara", description: "Fresh tomatoes & basil", price: 159, averagePreparationTime: 10, category: "Pizza", stock: 18, imageUrl: "/assets/pizza/marinara.jpg", rating: 4.3 },

  // 🍔 Burgers
  { id: uuid(), name: "Classic Burger", description: "Juicy grilled burger", price: 149, averagePreparationTime: 10, category: "Burger", stock: 15, imageUrl: "/assets/burger/angus.jpg", rating: 4.3 },
  { id: uuid(), name: "Double Cheeseburger", description: "Double patty, extra cheese", price: 199, averagePreparationTime: 12, category: "Burger", stock: 8, imageUrl: "/assets/burger/rice.jpg", rating: 4.6 },
  { id: uuid(), name: "Spicy Zinger", description: "Crispy & spicy chicken burger", price: 179, averagePreparationTime: 12, category: "Burger", stock: 10, imageUrl: "/assets/burger/luther.jpg", rating: 4.2 },

  // 🍟 Fries
  { id: uuid(), name: "Classic Fries", description: "Golden crispy french fries", price: 99, averagePreparationTime: 6, category: "French Fries", stock: 25, imageUrl: "/assets/fries/curly.jpg", rating: 4.1 },
  { id: uuid(), name: "Cheesy Fries", description: "Fries with melted cheese", price: 129, averagePreparationTime: 8, category: "French Fries", stock: 18, imageUrl: "/assets/fries/Cheese.jpg", rating: 4.5 },

  // 🥗 Veggies
  { id: uuid(), name: "Grilled Paneer", description: "Spiced paneer cubes", price: 169, averagePreparationTime: 10, category: "Veggies", stock: 9, imageUrl: "/assets/veggies/grilled.jpg", rating: 4.4 },
  { id: uuid(), name: "Caesar Salad", description: "Fresh greens with dressing", price: 149, averagePreparationTime: 8, category: "Veggies", stock: 11, imageUrl: "/assets/veggies/caesar.jpg", rating: 4.3 },

  // 🍹 Drinks
  { id: uuid(), name: "Coca-Cola", description: "Chilled soft drink", price: 49, averagePreparationTime: 2, category: "Drink", stock: 30, imageUrl: "/assets/drinks/latte.jpg", rating: 4.0 },
  { id: uuid(), name: "Lemon Iced Tea", description: "Refreshing lemon tea", price: 59, averagePreparationTime: 3, category: "Drink", stock: 20, imageUrl: "/assets/drinks/smoothie.jpg", rating: 4.2 },
  { id: uuid(), name: "Cold Coffee", description: "Chilled espresso with milk", price: 89, averagePreparationTime: 5, category: "Drink", stock: 16, imageUrl: "/assets/drinks/cocktail.jpg", rating: 4.6 },
];

// --- CHEFS ---
const chefs = [
  { id: "chef-1", name: "Manesh", ordersCount: 3 },
  { id: "chef-2", name: "Pritam", ordersCount: 7 },
  { id: "chef-3", name: "Yash", ordersCount: 5 },
  { id: "chef-4", name: "Tenzen", ordersCount: 8 },
];

// --- TABLES ---
const tables = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Table-${String(i + 1).padStart(2, "0")}`,
  seats: Math.floor(Math.random() * 4) + 2, //2 - 8 chairs
  status: Math.random() > 0.2 ? "AVAILABLE" : "RESERVED",
}));

// --- ORDERS ---
const randomId = () => Math.floor(Math.random() * 401) + 100;
const randomTable = () => Math.floor(Math.random() * 30) + 1;
const randomTime = () => {
  const hours = 9 + Math.floor(Math.random() * 3);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")} AM`;
};

const orders = [
  {
    id: randomId(),
    type: "DINE_IN",
    tableId: randomTable(),
    status: "PROCESSING",
    items: [
      { name: "Classic Burger", qty: 1 },
      { name: "Fries", qty: 1 },
      { name: "Coca-Cola", qty: 1 },
    ],
    time: randomTime(),
    chefAssigned: "chef-2",
    timestamp: new Date().toISOString(),
    processingEndAt: new Date(Date.now() + 4 * 60 * 1000).toISOString(),
  },
  {
    id: randomId(),
    type: "TAKE_AWAY",
    tableId: null,
    status: "DONE",
    items: [
      { name: "Margherita", qty: 1 },
      { name: "Cold Coffee", qty: 1 },
    ],
    time: randomTime(),
    chefAssigned: "chef-3",
  },
];

// --- SEED FUNCTION ---
export function seedAll() {
  if (!localStorage.getItem("menu")) localStorage.setItem("menu", JSON.stringify(menu));
  if (!localStorage.getItem("chefs")) localStorage.setItem("chefs", JSON.stringify(chefs));
  if (!localStorage.getItem("tables")) localStorage.setItem("tables", JSON.stringify(tables));
  if (!localStorage.getItem("orders")) localStorage.setItem("orders", JSON.stringify(orders));
}
