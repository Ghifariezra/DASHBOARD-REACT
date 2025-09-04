import router from "./route/route";
import express, { Request, Response } from "express";
import cors from "cors";

const PORT = 3000;
const app = express();
const corsOptions = {
    origin: ["http://localhost:3001"],
}

app.use(cors(corsOptions));
app.use(express.json());

// Prefix route
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;