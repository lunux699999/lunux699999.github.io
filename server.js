const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.set("trust proxy", true);

app.post("/visit", async (req, res) => {
    try {
        const ip =
            req.headers["cf-connecting-ip"] ||
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.socket.remoteAddress;

        const userAgent = req.headers["user-agent"] || "Unknown";
        const time = new Date().toLocaleString();

        await fetch("YOUR_WEBHOOK_URL", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content:
`📌 New website visit

🌐 IP: ${ip}
🖥️ Device: ${userAgent}
⏰ Time: ${time}`
            })
        });

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
