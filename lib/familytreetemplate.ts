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
		let html: string;
		html = `<div style="line-height: 20px;
      padding: 0 14px;
      font-size: 15px;
      color: #757575;
      padding: 14px;
      ">
      <span style="color: #acacac">Bio</span><br /> ${value}</div>`;
		return {
			html: html,
			id: id,
			value: value,
		};
	};

	FamilyTree.elements.hiddenField = function (
		data: any,
		editElement: any,
		minWidth: any,
		readOnly: any
	) {
		return {
			html: "",
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
		'<text style="font-size: 22px;" fill="#000000" x="100" y="230" text-anchor="middle" data-text-overflow="multiline">{val}</text>';
	FamilyTree.templates.myTemplate.field_1 =
		'<text style="font-size: 22px;" fill="#000000" x="100" y="260" text-anchor="middle" data-text-overflow="multiline">{val}</text>';

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
		'<circle cx="100" cy="100" r="100" fill="	#9ac0dd" stroke-width="1" stroke="#aeaeae"></circle>';
	FamilyTree.templates.myTemplate_female = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_female.node =
		'<circle cx="100" cy="100" r="100" fill="#DD9AC0" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate_gen1 = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_gen1.node =
		'<circle cx="100" cy="100" r="100" fill="#FFCD6F" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate_gen2 = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_gen2.node =
		'<circle cx="100" cy="100" r="100" fill="#FFA785" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate_gen3 = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_gen3.node =
		'<circle cx="100" cy="100" r="100" fill="#F98E9F" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate_gen4 = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_gen4.node =
		'<circle cx="100" cy="100" r="100" fill="#9079A8" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate_gen5 = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_gen5.node =
		'<circle cx="100" cy="100" r="100" fill="#8F91BF" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate_gen6 = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_gen6.node =
		'<circle cx="100" cy="100" r="100" fill="#91A9D0" stroke-width="1" stroke="#aeaeae"></circle>';

	FamilyTree.templates.myTemplate_gen7 = Object.assign(
		{},
		FamilyTree.templates.myTemplate
	);
	FamilyTree.templates.myTemplate_gen7.node =
		'<circle cx="100" cy="100" r="100" fill="#9AC0DD" stroke-width="1" stroke="#aeaeae"></circle>';
}
