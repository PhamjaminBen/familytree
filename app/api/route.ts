import clientPromise from "@/lib/database";

export async function GET() {
	const retobj = [];
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");
	const cursor = treeDB.find({}).project({ _id: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}

	return new Response(JSON.stringify(retobj));
}

export async function DELETE(request: Request) {
	console.log("deleting...");
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");
	treeDB.deleteMany({});
	return JSON.stringify({ response: "ok" });
}

export async function PATCH(request: Request) {
	console.log("patching");
	const data = await request.json();
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");

	treeDB.replaceOne({ id: data.person.id }, data.person, {
		upsert: true,
	});

	return JSON.stringify({ response: "ok" });
}

export async function POST(request: Request) {
	console.log("posting");
	const data = await request.json();
	const person = data.person;
	const client = await clientPromise;
	const formDB = client.db("data").collection("formData");
	person.approved = false;

	const cursor = await formDB.insertOne(person);
	console.log("inserted id: ", cursor.insertedId);
	return JSON.stringify({ response: "ok" });
}
