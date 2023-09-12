import clientPromise from "@/lib/database";

export async function GET() {
	const retobj = [];
	const client = await clientPromise;
	const pictureDB = client.db("data").collection("pictureData");
	const cursor = pictureDB.find({}).project({ _id: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}

	return new Response(JSON.stringify(retobj));
}

export async function POST(request: Request) {
	const retobj = [];
	const client = await clientPromise;
	const data = await request.json();
	console.log(data);
	const pictureDB = client.db("data").collection("pictureData");
	pictureDB.insertOne(data.image);

	return new Response(JSON.stringify({}));
}
