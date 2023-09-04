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
		tags: {
			gen1: { template: "myTemplate_gen1" },
			gen2: { template: "myTemplate_gen2" },
			gen3: { template: "myTemplate_gen3" },
			gen4: { template: "myTemplate_gen4" },
			gen5: { template: "myTemplate_gen5" },
			gen6: { template: "myTemplate_gen6" },
			gen7: { template: "myTemplate_gen7" },
			spouse: { template: "myTemplate_female" },
		},
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
