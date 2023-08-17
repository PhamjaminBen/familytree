"use client";

import FamilyTree from "@balkangraph/familytree.js";
import { useEffect, useState } from "react";
// import familyTreeData from "@/public/familytreedata.json";

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

export interface familyTreeData {
	nodes: {
		id: number;
		pids?: number[];
		mid?: number;
		fid?: number;
		name: string;
		gender?: string;
		img?: string;
		bio?: string;
	};
}
// function Familytree(props: TreeProps) {
// 	if (typeof window === "object") {
// 		var chart = new FamilyTree(document.getElementById("tree") as any, {
// 			nodeBinding: props.nodeBinding,
// 			nodes: props.nodes,
// 		});
// 	}
// 	return null;
// }

var nodeBinding = {
	field_0: "name",
	// field_1: "mid",
};

export default function HomePage() {
	// // 	const [data, setData] = useState<familyTreeData | null>(null);
	// console.log(familyTreeData);
	const [loading, setLoading] = useState<Boolean>(true);

	useEffect(() => {
		const getData = async () => {
			const data = await fetch("/api");
			const cleanData = await data.json();
			setLoading(false);
			return cleanData;
		};

		getData().then((d) => {
			const tree = new FamilyTree(document.getElementById("tree") as any, {
				mode: "dark",
				nodeBinding: nodeBinding,
				nodes: d,
			});
			// let originaltreeupdate = tree.update;
			// console.log(originaltreeupdate.toString());
			// tree.update = function (e) {
			// 	console.log(e);
			// 	originaltreeupdate(e);
			// 	return tree;
			// };
			// console.log(tree.update.toString());

			tree.update = function (e: any) {
				if (tree.config.nodes === undefined) return tree;
				let nodes: Array<any>;
				nodes = tree.config.nodes;
				for (var t = 0; t < tree.config.nodes.length; t++) {
					if (nodes[t].id == e.id) {
						tree.config.nodes[t] = e;
						break;
					}
				}
				fetch("api", {
					method: "PATCH",
					body: JSON.stringify({
						person: e,
					}),
					headers: {
						"content-type": "application/json",
					},
				});
				return tree;
			};
		});
	}, []);
	return (
		<>
			<div id='tree' className='h-[90vh] w-2xl'></div>
			{loading && (
				<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
					Loading...
				</h1>
			)}
		</>
	);
}
