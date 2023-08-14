import { writeFile } from "node:fs/promises";
import { database } from "@/scripts/database";

export async function GET() {
	const retobj = [];
	if (!database) return JSON.stringify({ response: "hnot ok" });
	const cursor = database?.find({}).project({ _id: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}
	return new Response(JSON.stringify(retobj));
}

export async function PATCH(request: Request) {
	const data = await request.json();
	await writeFile("/familytreedata.json", JSON.stringify(data));
	return JSON.stringify({ response: "ok" });
}
