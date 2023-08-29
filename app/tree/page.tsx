"use client";

import addTemplate from "@/lib/familytreetemplate";
import { store } from "@/lib/store";
import FamilyTree from "@balkangraph/familytree.js";
import Link from "next/link";
import { redirect } from "next/navigation";
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
		type: "myTextArea",
		label: "Bio",
		binding: "bio",
	},
	{
		type: "textbox",
		label: "Full Name",
		binding: "name",
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
	{
		type: "textbox",
		label: "mother",
		binding: "mother",
	},
	{
		type: "textbox",
		label: "father",
		binding: "father",
	},
	{
		type: "textbox",
		label: "children",
		binding: "children",
	},
];

addTemplate(FamilyTree);

export default function Tree() {
	if (!store.getState().user.verified) {
		redirect("/login");
	}
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
				padding: 100,
				template: "myTemplate",
				nodeBinding: {
					field_0: "name",
					img_0: "portrait",
				},
				levelSeparation: 100,
				subtreeSeparation: 200,
				siblingSeparation: 200,

				nodes: d,
				editForm: {
					titleBinding: "name",
					photoBinding: "portrait",
					elements: editElements,
					readOnly: true,
					buttons: {
						back: {
							icon: `<svg 
              fill="#ffffff" 
              height="25px" 
              width="47px" 
              version="1.1" 
              id="Layer_1" 
              mlns="http://www.w3.org/2000/svg" 
              xmlns:xlink="http://www.w3.org/1999/xlink" 
              viewBox="-38.1 -38.1 552.41 552.41" 
              xml:space="preserve" 
              stroke="#ffffff" 
              stroke-width="60" 
              transform="rotate(0)">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.952426"></g>
              <g id="SVGRepo_iconCarrier"> <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 57.427,253.107 476.213,253.107 "></polygon> 
              </g>
              </svg>`,
							text: "back",
						},
						share: null,
						pdf: null,
						remove: null,
					},
				},
				miniMap: false,
				searchFields: ["name"],
				scaleInitial: 0.75,
			});

			tree.editUI.on("button-click", (sender, args) => {
				sender.hide();
			});
		});
	}, []);
	return (
		<div className='flex flex-col items-center bg-white h-[87vh]'>
			{loading ? (
				<h1 className='m-auto text-[5rem] font-bold w-full text-center absolute top-1/3 '>
					Loading...
				</h1>
			) : (
				<div className='bg-slate-100 opacity-0 sm:opacity-100 p-5 rounded-xl self-start absolute top-0 sm:top-[12vh] z-20 space-y-10 mx-5'>
					<h1 className='m-auto sm:text-lg font-semibold w-full text-left'>
						Want to add yourself to the tree?{" "}
						<Link
							href='/addmemberform'
							className='text-blue-500 hover:underline hover:text-indigo-600'
						>
							Click here to submit a form.
						</Link>
					</h1>
				</div>
			)}
			<div
				id='tree'
				className='h-[85vh] sm:h-[95vh] w-[98vw] rounded-xl mb-10 '
			></div>
		</div>
	);
}
