import express, { Request, Response } from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks";
import fileRoutes from "./routes/files";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this line to enable JSON parsing in the request body
app.use(cors());
app.use("/tasks", taskRoutes); // Add this line to mount the Task API routes
app.use("/files", fileRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
