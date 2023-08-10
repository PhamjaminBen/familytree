"use client";

import FamilyTree from "@balkangraph/familytree.js";
import { useEffect } from "react";

interface TreeProps {
	nodeBinding: { field_0: string; img_0: string };
	nodes: {
		id: number;
		pids?: number[];
		mid?: number;
		fid?: number;
		name: string;
		gender?: string;
		img?: string;
	}[];
}
function Familytree(props: TreeProps) {
	if (typeof window === "object") {
		var chart = new FamilyTree(document.getElementById("tree") as any, {
			nodeBinding: props.nodeBinding,
			nodes: props.nodes,
		});
	}
	return null;
}

var data = [
	{
		id: 1,
		pids: [2],
		name: "Ong Noi",
		gender: "male",
		img: "https://cdn.balkan.app/shared/2.jpg",
	},
	{
		id: 2,
		pids: [1],
		name: "Ba Noi",
		gender: "female",
	},
	{
		id: 3,
		name: "test",
		gender: "female",
	},
	{
		id: 4,
		name: "dad",
		gender: "male",
		mid: 2,
		fid: 1,
	},
];

var nodeBinding = {
	field_0: "name",
	// img_0: "img",
};

export default function HomePage() {
	useEffect(() => {
		var chart = new FamilyTree(document.getElementById("tree") as any, {
			mode: "dark",
			nodeBinding: nodeBinding,
			nodes: data,
		});
	}, []);

	return (
		<div>
			<div id='tree' className='h-6xl w-6xl'>
				{/* <Familytree nodes={data} nodeBinding={nodeBinding} /> */}
			</div>
		</div>
	);
}
