"use client";

import createTree from "@/lib/familytreeoptions";
import addTemplate from "@/lib/familytreetemplate";
import { store } from "@/lib/store";
import FamilyTree from "@balkangraph/familytree.js";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

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
		getData().then((data) => {
			tree = createTree(data);

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
				className='h-[85vh] sm:h-[94vh] w-[98vw] rounded-xl mb-10 mt-1 '
			></div>
		</div>
	);
}
