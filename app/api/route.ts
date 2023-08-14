import { writeFile } from "node:fs/promises";
import { database } from "@/scripts/database";

export async function GET(request: Request) {
	// if (!database) return JSON.stringify({ response: "hnot ok" });
	// const cursor = database?.find({});

	// for await (let doc of cursor) {
	// 	console.log(doc);
	// }
	return JSON.stringify({ response: "ok" });
}

export async function PATCH(request: Request) {
	const data = await request.json();
	await writeFile("/familytreedata.json", JSON.stringify(data));
	return JSON.stringify({ response: "ok" });
}
