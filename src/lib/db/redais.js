
import Redis from "ioredis";

const redis = new Redis("redis://127.0.0.1:6379");

redis.on("error", (err) => {
    console.error("Redis connection error:", err.message);
});

export default redis;
