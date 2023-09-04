import clientPromise from "@/lib/database";
import type { Person } from "@/types/persontype";

export async function GET() {
	console.log("awgwagawg");
	let retobj: Person[] = [];
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");
	const cursor = treeDB
		.find({})
		.project({ _id: 0, partner: 0, children: 0, mother: 0, father: 0 });

	for await (let doc of cursor) {
		retobj.push(doc as any);
	}

	return new Response(JSON.stringify({ resp: "ok" }));
}
