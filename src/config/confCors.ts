import cors from "cors";
export const config: cors.CorsOptions = {
    origin: "*",
    // origin: "localhost:3003",
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}