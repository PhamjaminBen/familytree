import { Collection, Db, MongoClient } from "mongodb";

export let database: null | Collection<Document> = null;

if (!process.env.MONGODB_URI) {
} else {
	const client = new MongoClient(process.env.MONGODB_URI);
	database = client.db("familytree").collection("treedata");
}

// export async function connectDB() {
// 	if (!process.env.MONGODB_URI) return;
// 	const client = new MongoClient(process.env.MONGODB_URI);
// 	const database = client.db("familytree").collection("treedata");
// 	// database.insertOne({ id: 1, name: "Ong Noi", pids: [2], bio: "grandpa" });
// 	// const cursor = database.find({});

// 	// if ((await database.countDocuments({})) === 0) {
// 	// 	console.log("No documents found!");
// 	// }
// 	// for await (const doc of cursor) {
// 	// 	console.dir(doc);
// 	// }
// }
