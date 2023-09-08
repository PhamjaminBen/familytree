import clientPromise from "@/lib/database";

export async function GET() {
	const retobj = [];
	const client = await clientPromise;
	const eventData = client.db("data").collection("eventData");
	const cursor = eventData.find({}).project({ _id: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}

	return new Response(JSON.stringify(retobj));
}

export async function POST(request: Request) {
	console.log("POST");
	const data = await request.json();
	const event = data.event;
	const client = await clientPromise;
	const eventData = client.db("data").collection("eventData");
	eventData.insertOne(event);
	return new Response(JSON.stringify({ status: "ok" }));
}

export async function PATCH(request: Request) {
	console.log("PATCH");
	const data = await request.json();
	const event = data.event;
	const client = await clientPromise;
	const eventData = client.db("data").collection("eventData");
	eventData.replaceOne({ id: event.id }, event);
	console.log(event.id);
	return new Response(JSON.stringify({ status: "ok" }));
}

export async function DELETE(request: Request) {
	console.log("DELETE");
	const data = await request.json();
	const id = data.id;
	const client = await clientPromise;
	const eventData = client.db("data").collection("eventData");
	eventData.deleteMany({ id: id });
	return new Response(JSON.stringify({ status: "ok" }));
}
