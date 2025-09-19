// // const express = require("express");
// // const cors = require("cors");

// // const app = express();
// // const port = process.env.PORT || 5000;

// // // ===== Middleware =====
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:3000", // local React frontend
// //       "https://crop-recommendation-frontend.vercel.app", // ✅ replace with your real frontend URL
// //     ],
// //     methods: ["GET", "POST"],
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());

// // // ===== Utils =====
// // const getWeather = require("./utils/getWeather");

// // // ===== Routes =====
// // app.get("/", (req, res) => {
// //   res.send("🌱 Hello, AgroFriend Backend is running 🚀");
// // });

// // // Weather API
// // app.get("/api/get-weather", async (req, res) => {
// //   const { city } = req.query;

// //   if (!city) {
// //     return res.status(400).json({ error: "City is required" });
// //   }

// //   try {
// //     const response = await getWeather(city);
// //     const { main } = response.data;

// //     res.json({
// //       temperature: main.temp,
// //       humidity: main.humidity,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching weather:", error.message);
// //     res.status(500).json({ error: "Failed to fetch weather data" });
// //   }
// // });

// // // Crop recommendation routes
// // const recommendationRoutes = require("./routes/recommendationRoutes");
// // app.use("/api", recommendationRoutes);

// // // Email routes
// // const emailRoute = require("./routes/emailRoute");
// // app.use("/api", emailRoute);

// // // ===== Start Server =====
// // app.listen(port, "0.0.0.0", () => {
// //   console.log(`✅ Server is running at http://0.0.0.0:${port}`);
// // });


// // backend/index.js
// const express = require("express");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// // ===== Middleware =====
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000", // local React frontend
//       "https://crop-recommendation-frontend.vercel.app", // deployed frontend
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ===== Utils =====
// const getWeather = require("./utils/getWeather");

// // ===== Routes =====
// app.get("/", (req, res) => {
//   res.send("🌱 Hello, AgroFriend Backend is running 🚀");
// });

// // Weather API
// app.get("/api/get-weather", async (req, res) => {
//   const { city } = req.query;

//   if (!city) {
//     return res.status(400).json({ error: "City is required" });
//   }

//   try {
//     const response = await getWeather(city);
//     const { main } = response.data;

//     res.json({
//       temperature: main.temp,
//       humidity: main.humidity,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching weather:", error.message);
//     res.status(500).json({ error: "Failed to fetch weather data" });
//   }
// });

// // Crop & Fertilizer Recommendation Routes
// const recommendationRoutes = require("./routes/recommendationRoutes");
// app.use("/api", recommendationRoutes);

// // Email Routes
// const emailRoute = require("./routes/emailRoute");
// app.use("/api", emailRoute);

// // ===== Start Server =====
// app.listen(port, "0.0.0.0", () => {
//   console.log(`✅ Server is running at http://0.0.0.0:${port}`);
// });


const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

// ===== Middleware =====
app.use(cors({
  origin: ["http://localhost:3000"], // React frontend
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// ===== Utils =====
const getWeather = require("./utils/getWeather");

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("🌱 AgroFriend Backend is running 🚀");
});

// Weather API
app.get("/api/get-weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const data = await getWeather(city);
    res.json(data);
  } catch (error) {
    console.error("❌ Weather API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Crop & Fertilizer recommendation routes
const recommendationRoutes = require("./routes/recommendationRoutes");
app.use("/api", recommendationRoutes);

// ===== Start Server =====
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
