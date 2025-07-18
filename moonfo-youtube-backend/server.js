import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import cors from "cors";
import {
  errorResponserHandler,
  invalidPathHandler,
} from "./middleware/errorHandler";

// Routes
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import postCategoriesRoutes from "./routes/postCategoriesRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const corsOptions = {
  exposedHeaders: "*",
};
app.use(cors(corsOptions));

// ======= ✅ API Routes =======
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

// ======= ✅ Serve uploads (images) =======
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// ======= ✅ Serve frontend build =======
const __dirnameFull = path.resolve();
app.use(express.static(path.join(__dirname,  "../moonfo-youtube/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,  "../moonfo-youtube/","build", "index.html"));
});

// ======= ❌ Remove or comment this line =======
// app.get("/", (req, res) => { res.send("Server is running..."); });

// ======= ✅ Error Handlers =======
app.use(invalidPathHandler);
app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
