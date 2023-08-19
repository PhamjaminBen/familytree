import clientPromise from "@/lib/database";

export async function GET() {
	console.log("GET");
	const client = await clientPromise;
	const formDB = client.db("data").collection("formData");

	const retobj = [];
	const cursor = formDB.find({}).project({ _id: 0 });

	for await (let doc of cursor) {
		retobj.push(doc);
	}
	return new Response(JSON.stringify(retobj));
}

export async function PATCH(request: Request) {
	console.log("patching");
	const data = await request.json();
	const entry = data.entry;
	const client = await clientPromise;
	const treeDB = client.db("data").collection("treeData");
	const formDB = client.db("data").collection("formData");

	formDB.updateOne(
		{ name: entry.name },
		{ $set: { approved: entry.approved } }
	);
	treeDB.updateOne(
		{ id: entry.binding },
		{
			$set: {
				name: entry.name,
				bio: entry.bio,
				birthdate: entry.birthdate,
				children: entry.children,
				email: entry.email,
				facebook: entry.facebook,
				father: entry.father,
				gender: entry.gender,
				hobbies: entry.hobbies,
				instagram: entry.instagram,
				mother: entry.mother,
				partner: entry.partner,
				phone: entry.phone,
				portrait: entry.portrait,
				profession: entry.profession,
			},
		}
	);

	return JSON.stringify({ response: "ok" });
}
