import express from "express";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";

const app = express();
const port = 3000;
app.use(express.json());

app.post("/publish", async (req, res) => {
    const { name, content } = req.body;
    if (!name || !content) return res.status(400).send("Invalid request");
    const queue = new RabbitMQAdapter();
    await queue.connect();
    await queue.publish({ name, content });
    return res.status(200).json('published');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});