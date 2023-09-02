import clientPromise from "@/lib/database";

export async function GET() {
	const retobj = [];
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");
	const cursor = treeDB
		.find({})
		.project({ _id: 0, partner: 0, children: 0, mother: 0, father: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}

	const sorted = retobj.sort((x, y) =>
		x.name === "Pham Duc Dien" || y.name === "Pham Duc Dien" ? -1 : 1
	);

	return new Response(JSON.stringify(sorted));
}

export async function DELETE(request: Request) {
	console.log("deleting...");
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");
	treeDB.deleteMany({});
}

export async function PATCH(request: Request) {
	console.log("patching");
	const data = await request.json();
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");

	treeDB.replaceOne({ id: data.person.id }, data.person, {
		upsert: true,
	});
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
}
