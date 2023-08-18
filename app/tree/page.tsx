"use client";

import addTemplate, { testData } from "@/lib/familytreetemplate";
import FamilyTree from "@balkangraph/familytree.js";
import { useEffect, useState } from "react";

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

var nodeBinding = {
	field_0: "name",
	// field_1: "mid",
};

const editElements = [
	{
		type: "textbox",
		label: "Full Name",
		binding: "name",
	},
	{
		type: "select",
		options: [
			{ value: "male", text: "male" },
			{ value: "female", text: "female" },
			{ value: "other", text: "other" },
		],
		label: "gender",
		binding: "gender",
	},
	{
		type: "date",
		label: "Date of Birth",
		binding: "birthdate",
	},
	{
		type: "textbox",
		label: "Profession",
		binding: "profession",
	},
	{
		type: "textbox",
		label: "Hobbies",
		binding: "hobbies",
	},
	{
		type: "textbox",
		label: "Biography",
		binding: "biography",
	},
	{
		type: "textbox",
		label: "Phone",
		binding: "phone",
	},
	{
		type: "textbox",
		label: "Email",
		binding: "email",
	},
	{
		type: "textbox",
		label: "Instagram",
		binding: "instagram",
	},
	{
		type: "textbox",
		label: "Facebook",
		binding: "facebook",
	},
];

addTemplate(FamilyTree);

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

		let tree: FamilyTree;
		getData().then((d) => {
			console.log(d);
			tree = new FamilyTree(document.getElementById("tree") as any, {
				template: "myTemplate",
				nodeBinding: {
					field_0: "name",
					// field_1: "bio",
					img_0: "photo",
				},
				levelSeparation: 100,
				nodes: d,
				nodeTreeMenu: true,
				editForm: {
					titleBinding: "name",
					photoBinding: "photo",
					elements: editElements,
					addMore: undefined,
					addMoreFieldName: undefined,
					addMoreBtn: undefined,
					buttons: {
						pdf: null,
						share: null,
					},
				},
				miniMap: true,
			});

			tree.update = function (e: any) {
				if (tree.config.nodes === undefined) return tree;

				console.log("tree", tree.config.nodes);
				let nodes: Array<any>;
				nodes = tree.config.nodes;
				for (var t = 0; t < tree.config.nodes.length; t++) {
					if (nodes[t].id == e.id) {
						tree.config.nodes[t] = e;
						break;
					}
				}
				for (var t = 0; t < tree.config.nodes.length; t++) {
					fetch("api", {
						method: "PATCH",
						body: JSON.stringify({
							person: tree.config.nodes[t],
						}),
						headers: {
							"content-type": "application/json",
						},
					});
				}
				return tree;
			};
		});
	}, []);
	return (
		<>
			<div id='tree' className='h-[90vh]'></div>
			{loading && (
				<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
					Loading...
				</h1>
			)}
		</>
	);
}
