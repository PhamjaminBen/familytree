// import FamilyTree from "@balkangraph/familytree.js";

// export default function addTemplate(FamilyTree: any) {
// 	FamilyTree.templates.john = Object.assign({}, FamilyTree.templates.base);
// 	FamilyTree.templates.john.defs = `<style>
//     .{randId} .bft-edit-form-header, .{randId} .bft-img-button{
//         background-color: #aeaeae;
//     }
//     .{randId}.male .bft-edit-form-header, .{randId}.male .bft-img-button{
//         background-color: #039BE5;
//     }
//     .{randId}.male div.bft-img-button:hover{
//         background-color: #F57C00;
//     }
//     .{randId}.female .bft-edit-form-header, .{randId}.female .bft-img-button{
//         background-color: #F57C00;
//     }
//     .{randId}.female div.bft-img-button:hover{
//         background-color: #039BE5;
//     }
// </style>
// <clipPath id="john_img_0">
// <rect x="6" y="6" rx="54" ry="54" width="108" height="108" fill="#aeaeae"></rect>
// </clipPath>
//   ${FamilyTree.gradientCircleForDefs("circle", "#aeaeae", 60, 5)}
//   ${FamilyTree.gradientCircleForDefs("male_circle", "#039BE5", 60, 5)}
//   ${FamilyTree.gradientCircleForDefs("female_circle", "#F57C00", 60, 5)}`;
// 	FamilyTree.templates.john.field_0 =
// 		"<text " +
// 		FamilyTree.attr.width +
// 		' ="230" style="font-size: 16px;font-weight:bold;" fill="#aeaeae" x="60" y="135" text-anchor="middle">{val}</text>';
// 	FamilyTree.templates.john.field_1 =
// 		"<text " +
// 		FamilyTree.attr.width +
// 		' ="150" style="font-size: 13px;" fill="#aeaeae" x="60" y="150" text-anchor="middle">{val}</text>';
// 	FamilyTree.templates.john.node =
// 		'<use x="0" y="0" fill="#4D4D4D" xlink:href="#circle" />';
// 	FamilyTree.templates.john.img_0 =
// 		'<image preserveAspectRatio="xMidYMid slice" clip-path="url(#john_img_0)" xlink:href="{val}" x="6" y="6" width="108" height="108"></image>';
// 	FamilyTree.templates.john.ripple = {
// 		radius: 60,
// 		color: "#e6e6e6",
// 		rect: undefined,
// 	};

// 	FamilyTree.templates.john.size = [120, 120];
// 	FamilyTree.templates.john_male = Object.assign({}, FamilyTree.templates.john);
// 	FamilyTree.templates.john_male.node +=
// 		'<use x="0" y="0" xlink:href="#male_circle" />';
// 	FamilyTree.templates.john_male.ripple = {
// 		radius: 60,
// 		color: "#039BE5",
// 		rect: undefined,
// 	};
// 	FamilyTree.templates.john_female = Object.assign(
// 		{},
// 		FamilyTree.templates.john
// 	);
// 	FamilyTree.templates.john_female.node +=
// 		'<use x="0" y="0" xlink:href="#female_circle" />';
// 	FamilyTree.templates.john_female.ripple = {
// 		radius: 60,
// 		color: "#F57C00",
// 		rect: undefined,
// 	};
// 	FamilyTree.templates.john.nodeMenuButton = `<use ${FamilyTree.attr.control_node_menu_id}="{id}" x="90" y="50" xlink:href="#base_node_menu" />`;
// }

export default function addTemplate(FamilyTree: any) {
	FamilyTree.elements.myTextArea = function (
		data: any,
		editElement: any,
		minWidth: any,
		readOnly: any
	) {
		var id = FamilyTree.elements.generateId();
		var value = data[editElement.binding];
		if (value == undefined) value = "";
		if (readOnly && !value) {
			return {
				html: "",
			};
		}
		var rOnlyAttr = readOnly ? "readonly" : "";
		var rDisabledAttr = readOnly ? "disabled" : "";
		return {
			html: `
            <textarea ${rDisabledAttr} ${rOnlyAttr} id="${id}" name="${id}" \
            style="width: 100%;\
            height: 200px;\
            background-color: white;\
            padding-left: 15px;\
            data-binding="${editElement.binding}">${value}</textarea>`,
			id: id,
			value: value,
		};
	};

	FamilyTree.templates.myTemplate = Object.assign(
		{},
		FamilyTree.templates.tommy
	);
	FamilyTree.templates.myTemplate.size = [200, 200];
	FamilyTree.templates.myTemplate.node =
		'<circle cx="100" cy="100" r="100" fill="#4D4D4D" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate.defs = `<clipPath id="hugo_img_0"><rect id="hugo_img_0_stroke" stroke-width="2" stroke="#fff" x="90" y="-5" rx="25" ry="25" width="70" height="70"></rect></clipPath>
  <linearGradient id="hugo_grad_female" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF8024;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF46A3;stop-opacity:1" />
  </linearGradient>
  <linearGradient id="hugo_grad_male" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00D3A5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00A7D4;stop-opacity:1" />
  </linearGradient>
  <linearGradient id="hugo_grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#D0D0D0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#909090;stop-opacity:1" />
  </linearGradient>
  <g id="hugo_up">
  <circle cx="12" cy="12" r="15" fill="transparent"></circle>
    ${FamilyTree.icon.ft(24, 24, "#fff", 0, 0)}
  </g>
  <g id="hugo_node_menu" style="cursor:pointer;">
      <rect x="0" y="0" fill="transparent" width="22" height="22"></rect>
      <circle cx="11" cy="4" r="2" fill="#ffffff"></circle>
      <circle cx="11" cy="11" r="2" fill="#ffffff"></circle>
      <circle cx="11" cy="18" r="2" fill="#ffffff"></circle>
  </g>
      <style>
          .{randId} .bft-edit-form-header{
              background: linear-gradient(90deg, #D0D0D0 0%, #909090 100%);
          }
          .{randId}.male .bft-edit-form-header{
              background: linear-gradient(90deg, #00D3A5 0%, #00A7D4 100%);
          }
          .{randId}.female .bft-edit-form-header{
              background: linear-gradient(90deg, #FF8024 0%, #FF46A3 100%);
          }  
          .{randId} .bft-img-button{
              background-color: #909090;
          }      
          .{randId} .bft-img-button:hover{
              background-color: #D0D0D0;
          }
          .{randId}.male .bft-img-button{
              background-color: #00A7D4;
          }      
          .{randId}.male .bft-img-button:hover{
              background-color: #00D3A5;
          }
          .{randId}.female .bft-img-button{
              background-color: #FF46A3;
          }      
          .{randId}.female .bft-img-button:hover{
              background-color: #FF8024;
          }
  </style>`;

	FamilyTree.templates.myTemplate.img_0 =
		'<clipPath id="ulaImg">' +
		'<circle cx="100" cy="100" r="100"></circle>' +
		"</clipPath>" +
		'<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="0" y="0" width="200" height="200">' +
		"</image>";
	FamilyTree.templates.myTemplate.field_0 =
		'<text style="font-size: 18px;" fill="#000000" x="100" y="230" text-anchor="middle" data-text-overflow="multiline">{val}</text>';
	// FamilyTree.templates.myTemplate.field_1 =
	// 	'<text style="font-size: 16px;" fill="#ffffff" x="100" y="60" text-anchor="middle">{val}</text>';

	// FamilyTree.templates.myTemplate.link =
	// '<path stroke="#686868" stroke-width="1px" fill="none" data-l-id="[{id}][{child-id}]" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';

	// FamilyTree.templates.myTemplate.nodeMenuButton =
	// 	'<g style="cursor:pointer;" transform="matrix(1,0,0,1,93,15)" data-ctrl-n-menu-id="{id}">' +
	// 	'<rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22">' +
	// 	"</rect>" +
	// 	'<line x1="0" y1="0" x2="0" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />' +
	// 	'<line x1="7" y1="0" x2="7" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />' +
	// 	'<line x1="14" y1="0" x2="14" y2="10" stroke-width="2" stroke="rgb(255, 202, 40)" />' +
	// 	"</g>";

	// FamilyTree.templates.myTemplate.menuButton =
	// 	'<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" data-ctrl-menu="">' +
	// 	'<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">' +
	// 	'<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">' +
	// 	'<hr style="background-color: rgb(255, 202, 40); height: 3px; border: none;">' +
	// 	"</div>";

	FamilyTree.templates.myTemplate.pointer =
		'<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)">><g transform="matrix(0.3,0,0,0.3,-17,-17)">' +
		'<polygon fill="rgb(255, 202, 40)" points="53.004,173.004 53.004,66.996 0,120" />' +
		'<polygon fill="rgb(255, 202, 40)" points="186.996,66.996 186.996,173.004 240,120" />' +
		'<polygon fill="rgb(255, 202, 40)" points="66.996,53.004 173.004,53.004 120,0" />' +
		'<polygon fill="rgb(255, 202, 40)" points="120,240 173.004,186.996 66.996,186.996" />' +
		'<circle fill="rgb(255, 202, 40)" cx="120" cy="120" r="30" />' +
		"</g></g>";

	FamilyTree.templates.myTemplate_male = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_male.node =
		'<circle cx="100" cy="100" r="100" fill="#039be5" stroke-width="1" stroke="#aeaeae"></circle>';
	FamilyTree.templates.myTemplate_female = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_female.node =
		'<circle cx="100" cy="100" r="100" fill="#FF46A3" stroke-width="1" stroke="#aeaeae"></circle>';
}

export const testData = [
	{
		id: 1,
		pids: [2],
		name: "Amber McKenzie",
		gender: "female",
		phone: "+7(863)354-67-14",
		photo: "https://cdn.balkan.app/shared/w60/3.jpg",
	},
	{
		id: 2,
		pids: [1],
		name: "Ava Field",
		gender: "male",
		phone: "+7(3952)67-30-48",
		photo: "https://cdn.balkan.app/shared/m60/3.jpg",
	},
	{
		id: 3,
		mid: 1,
		fid: 2,
		name: "Peter Stevens",
		gender: "male",
		phone: "+7(4932)86-83-67",
		photo: "https://cdn.balkan.app/shared/m30/1.jpg",
	},
	{
		id: 4,
		mid: 1,
		fid: 2,
		name: "Savin Stevens",
		gender: "male",
		phone: "+7(351)121-01-17",
		photo: "https://cdn.balkan.app/shared/m30/2.jpg",
	},
	{
		id: 5,
		mid: 1,
		fid: 2,
		name: "Emma Stevens",
		gender: "female",
		phone: "+7(8652)97-73-24",
		photo: "https://cdn.balkan.app/shared/w30/5.jpg",
	},
];
