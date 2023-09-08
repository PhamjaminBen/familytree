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
