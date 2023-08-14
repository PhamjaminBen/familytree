import { writeFile } from "node:fs/promises";
import { Collection, MongoClient } from "mongodb";

export async function GET() {
	let database: null | Collection<Document> = null;

	if (!process.env.MONGODB_URI) return JSON.stringify({ response: "no db" });

	const client = new MongoClient(process.env.MONGODB_URI);
	database = client.db("familytree").collection("treedata");
	console.log("client open");

	const retobj = [];
	if (!database) return JSON.stringify({ response: "no db" });
	const cursor = database?.find({}).project({ _id: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}
	client.close();
	return new Response(JSON.stringify(retobj));
}

export async function PATCH(request: Request) {
	const data = await request.json();

	let database: null | Collection<Document> = null;

	if (!process.env.MONGODB_URI) return JSON.stringify({ response: "not ok" });

	const client = new MongoClient(process.env.MONGODB_URI);
	database = client.db("familytree").collection("treedata");
	console.log("edit open");

	const retobj = [];
	if (!database) return JSON.stringify({ response: "no db" });
	const cursor = database?.find({ id: data.id }).project({ _id: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}
	client.close();

	return JSON.stringify({ response: "ok" });
}
