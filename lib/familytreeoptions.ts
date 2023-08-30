import FamilyTree from "@balkangraph/familytree.js";

interface familyTreeData {
	nodes: {
		id: number;
		pids?: number[];
		mid?: number;
		fid?: number;
		name: string;
		gender?: string;
		portrait?: string;
		bio?: string;
	};
}

export default function createTree(data: familyTreeData[]) {
	return new FamilyTree(document.getElementById("tree") as any, {
		padding: 100,
		template: "myTemplate",
		nodeBinding: {
			field_0: "name",
			img_0: "portrait",
		},
		levelSeparation: 100,
		subtreeSeparation: 200,
		siblingSeparation: 200,

		nodes: data,
		editForm: {
			titleBinding: "name",
			photoBinding: "portrait",
			elements: editElements,
			readOnly: true,
			buttons: {
				share: null,
				pdf: null,
				remove: null,
			},
		},
		miniMap: false,
		searchFields: ["name"],
		scaleInitial: 0.75,
	});
}

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
	{
		type: "hiddenField",
		label: "portrait",
		binding: "portrait",
	},
	{
		type: "hiddenField",
		label: "gender",
		binding: "gender",
	},
];
