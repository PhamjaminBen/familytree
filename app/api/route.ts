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
	// console.log("edit open", data);

	if (!database) return JSON.stringify({ response: "no db" });
	const cursor = database.findOneAndReplace(
		{ id: data.person.id },
		data.person
	);

	client.close();

	return JSON.stringify({ response: "ok" });
}

export async function POST(request: Request) {
	console.log("posting");
	const data = await request.json();
	const person = data.person;

	let database: null | Collection<Document> = null;

	if (!process.env.MONGODB_URI) return JSON.stringify({ response: "ERROR" });

	const client = new MongoClient(process.env.MONGODB_URI);
	database = client.db("familytree").collection("treedata");

	if (person.pids) {
		console.log("updating partner");
		database.updateOne({ id: person.pids[0] }, { $set: { pids: [person.id] } });
	}

	if (person.children) {
		console.log(person.children);
		for (const childId of person.children) {
			console.log("child", childId);
			if (person.gender === "female") {
				database.updateOne({ id: childId }, { $set: { mid: person.id } });
			} else if (person.gender === "male") {
				database.updateOne({ id: childId }, { $set: { fid: person.id } });
			}
		}
		delete person.children;
	}

	database.insertOne(data.person);

	client.close();
	return JSON.stringify({ response: "ok" });
}
