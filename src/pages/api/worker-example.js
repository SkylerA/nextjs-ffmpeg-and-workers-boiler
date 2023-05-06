import fs from "fs";
import path from "path";
import { NextApiResponse } from "next";

export default async function handler(req, res) {
const filePath = path.join(process.cwd(), "public", "example.worker.js");
const fileContent = fs.readFileSync(filePath, "utf-8");

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Content-Type", "application/javascript");
res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

res.status(200).send(fileContent);
}