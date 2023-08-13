import { writeFile } from "node:fs/promises";

export async function PATCH(request: Request) {
	const data = await request.json();
	await writeFile("/familytreedata.json", JSON.stringify(data));
	return JSON.stringify({ response: "ok" });
}
