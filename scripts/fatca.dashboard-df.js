/* //dashboard charts and scripts */
var workflowStagesData = {};
workflowStagesData = [
	{value: 45, label: "JE"}, 
	{value: 20, label: "FR"}, 
	{value: 30, label: "IN"}, 
	{value: 60, label: "GR"}, 
	{value: 10, label: "US"}
];
$(function () {

	//1- Graph - Donut Chart :: Workflow Stages
	
	initDataDonutWorkFlowStages(workflowStagesData);

	//2- Graph - Bar Chart :: Users Count 
	var arUserNames = ["SuperUser", "Free Earners"];
	var arUserCount = [2, 1000];
	createDataBarUsersCount(arUserNames , arUserCount);

	//3- Graph - Bar Chart :: Workflow Stages ON click
	var arDataNames = ["US", "GB"];
	var arDataValues1 = [65, 59];
	var arDataValues2 = [27, 90];
	var arDataValues3 = [40, 20];
	//createBarWorkflowStages(arDataNames, arDataValues1, arDataValues2, arDataValues3);
	
	// New data
	//var arDataNamesBig = ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10"];
	//var arDataNamesBig = ["AB", "BC", "CD", "L4", "L5", "L6", "L7", "L8", "L9", "L10","AB", "BC", "CD", "L4", "L5", "L6", "L7", "L8", "L9", "L10"];
	var arDataNamesBig = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
	//var arDataValuesBig = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
	var arDataValuesBig = [
		2000, 1000, 199, 1800, 2300, 900, 809, 70, 100, 200];
	/*var arDataValuesBig = [
		21, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	*/createBarWorkflowStagesBig(arDataNamesBig, arDataValuesBig);

	//3- Multiline Charts - GIIN and Account Holder
	var arDataNamesGIIN = ["2013", "2014", "2015", "2016"];
	var arDataValuesGIIN = [150, 45, 100, 71];
	createLinesGIINData(arDataNamesGIIN, arDataValuesGIIN);

	//circle clickable 
	$('body').on('click', 'ul.lst-floating-circles>li>a', function () {
		var workflowCount = parseInt($(this).find('h3').html());
		//alert('Bubble Color = ' + $(this).css('background-color'));
		scrolltoSection('tbl-giin-fidetails');
	});

	createBubbleGraph(arBubbleList);

	//floatCircles();
});
function scrolltoSection (htmlElement) {
    $('html, body').animate({
        scrollTop: $('.' + htmlElement).offset().top - 100
    }, 800);
};
function initDataDonutWorkFlowStages (workflowStagesData) {
	//take Data as parameter
	//alert('upiii');
	var workflowStagesDataDesign = [
		{
			color: "#FFA000",
			highlight: "#FFCA28"
		}, {
			color: "#E53935",
			highlight: "#EF5350"
		}, {
			color:"#673AB7",
			highlight: "#9575CD"
		}, {
			color:"#8BC34A",
			highlight: "#AED581"
		}, {
			color:"#03A9F4",
			highlight: "#4FC3F7"
		}, {
			color:"#00796B",
			highlight: "#009688"
		}, {
			color:"#FBC02D",
			highlight: "#FFEB3B"
		}, {
			color:"#6D4C41",
			highlight: "#8D6E63"
		}, {
			color:"#455A64",
			highlight: "#607D8B"
		}
	];
	workflowStagesDataDesign.splice(workflowStagesData.length, workflowStagesDataDesign.length);
	//alert('workflowStagesData=' + workflowStagesData);
	var finalData = {};
	$.extend(true, finalData, workflowStagesDataDesign, workflowStagesData);
	//console.log(finalData);
	//alert(finalData.toString());
	//pass data and create graph
	createDonutWorkFlowStages(finalData);

};
function createDonutWorkFlowStages (chartDataWFS) {
	var dataWorkflowStages = chartDataWFS;
	//======1 Chart - PIE Chart - Workflow Stages === START /
	var ctxWorkflowStages = document.getElementById("chartPieWorkflowStages").getContext("2d");
	var myWSGenerationChart = new Chart(ctxWorkflowStages).Doughnut(dataWorkflowStages, {
		percentageInnerCutout : 88, 
		animationEasing : "easeOutExpo"
	});
	var legendWorkflowStages = myWSGenerationChart.generateLegend();
	$('div#legend-workflow-stages').html(legendWorkflowStages);
	
	$("canvas#chartPieWorkflowStages").on('click', function(evt){
		var activePoints = myWSGenerationChart.getSegmentsAtEvent(evt);
		var activeLabel = activePoints[0].label;
		var segments = myWSGenerationChart.segments;
		for (var index = 0; index < segments.length; index++) {
			if (activeLabel == segments[index].label) {
				//alert('DATA is = ' + segments[index].value);
			}
		}
	});
};
//Users Count Chart
function createDataBarUsersCount (arUserNames, arUserCount) {

	//====== Chart - Bar Chart - Users Count === START /
	var dataBarUsers = {
		labels: arUserNames,
		/*labels: ["SuperUser", "Free Earners"],*/
		datasets: [
			{
				label: "Users",
				fillColor: "rgba(255, 160, 0, 0.5)",
				strokeColor: "rgba(255, 160, 0, 0.8)",
				highlightFill: "rgba(255, 160, 0, 0.75)",
				highlightStroke: "rgba(255, 160, 0, 1)",
				/*data: [2, 1000]*/
				data: arUserCount
			}
		]
	};
	var ctxUsersBarChart = document.getElementById("chartBarUsers").getContext("2d");
	var myUsersBarChart = new Chart(ctxUsersBarChart).Bar(dataBarUsers, {
		barValueSpacing : 25, 
		showTooltips: false, 
		scaleShowLabels: false,
		onAnimationComplete: function () {
			var ctx = this.chart.ctx;
			ctx.font = this.scale.font;
			ctx.fillStyle = this.scale.textColor;
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";

			this.datasets.forEach(function (dataset) {
				dataset.bars.forEach(function (bar) {
					ctx.fillText(bar.value, bar.x, bar.y);
				});
			})
		}
	});

	/*myUsersBarChart.onclick = function(evt){
		var activePoints = myUsersBarChart.getPointsAtEvent(evt);
		// => activePoints is an array of points on the canvas that are at the same position as the click event.
		alert("See me?");
	};*/

	$('canvas#chartBarUsers').on('click', function(evt){
		var activePoints = myUsersBarChart.getBarsAtEvent(evt);
		var activeLabel = activePoints[0].label;
		for (var i = 0; i < activePoints.length; i++) {
			//alert(activePoints[i].value);
		}
	});
};
function createBarWorkflowStages(arDataNames, arDataValues1, arDataValues2, arDataValues3) {
	//======4 Chart - Bar Chart - Users Count === START /
	var dataBarWorkflowStages = {
		/*labels: ["Reviewed & Reported", "Reviewed & Not Reported"],*/
		labels: arDataNames,
		datasets: [
			{
				label: "Reviewed & Reportable",
				fillColor: "rgba(139, 195, 74, 0.5)",
				strokeColor: "rgba(139, 195, 74, 0.8)",
				highlightFill: "rgba(139, 195, 74, 0.7)",
				highlightStroke: "rgba(139, 195, 74, 1)",
				/*data: [65, 59]*/
				data: arDataValues1
			}, {
				label: "Reviewed & Not Reportable",
				fillColor: "rgba(25, 118, 210, 0.5)",
				strokeColor: "rgba(25, 118, 210, 0.8)",
				highlightFill: "rgba(25, 118, 210, 0.7)",
				highlightStroke: "rgba(25, 118, 210, 1)",
				data: arDataValues2
			}, {
				label: "Not Reviewed",
				fillColor: "rgba(229, 57, 53, 0.5)",
				strokeColor: "rgba(229, 57, 53, 0.8)",
				highlightFill: "rgba(229, 57, 53, 0.7)",
				highlightStroke: "rgba(229, 57, 53, 1)",
				data: arDataValues3
			}
		]
	};
	var ctxBarChartWorkflowStages = document.getElementById("chartBarWorkflowStages").getContext("2d");
	var myBarChartWorkflowStages = new Chart(ctxBarChartWorkflowStages).Bar(dataBarWorkflowStages, {
		barValueSpacing : 25, 
		showTooltips: false, 
		scaleShowLabels: false,
		onAnimationComplete: function () {
			var ctx = this.chart.ctx;
			ctx.font = this.scale.font;
			ctx.fillStyle = this.scale.textColor;
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";

			this.datasets.forEach(function (dataset) {
				dataset.bars.forEach(function (bar) {
					ctx.fillText(bar.value, bar.x, bar.y);
				});
			})
		}
	});
	var legendBarWorkflowStages = myBarChartWorkflowStages.generateLegend();
	$('div#legendbar-workflow-stages').html(legendBarWorkflowStages);
};
function createBarWorkflowStagesBig(arDataNamesBig, arDataValuesBig) {
	//======4 Chart - Bar Chart - Users Count === START /
	//var barSpacing = 0;
	var dataBarWorkflowStagesBig = {
		/*labels: ["Reviewed & Reported", "Reviewed & Not Reported"],*/
		labels: arDataNamesBig,
		datasets: [
			{
				label: arDataNamesBig,
				fillColor: "rgba(139, 195, 74, 0.5)",
				/*strokeColor: "rgba(255, 255, 255, 0.1)",
				highlightFill: "rgba(139, 195, 74, 0.7)",
				highlightStroke: "rgba(139, 195, 74, 1)",*/
				/*data: [65, 59]*/
				data: arDataValuesBig
			}
		]
	};
	
	//barSpacing = checkBarSpacing(arDataValuesBig.length);
	//console.log('barSpacing=' + barSpacing);

	var ctxBarChartWorkflowStagesBig = document.getElementById("chartBarWorkflowStagesBig").getContext("2d");
	var myBarChartWorkflowStagesBig = new Chart(ctxBarChartWorkflowStagesBig).Bar(dataBarWorkflowStagesBig, {
		showTooltips: false, 
		scaleShowLabels: false,
		barValueSpacing : 10,
		// isFixedWidth:true,
		// barWidth: 17,
		onAnimationComplete: function () {
			var ctx = this.chart.ctx;
			ctx.font = this.scale.font;
			ctx.fillStyle = this.scale.textColor;
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";
			this.datasets.forEach(function (dataset) {
				dataset.bars.forEach(function (bar) {
					ctx.fillText(bar.value, bar.x, bar.y);
				});
			})
		}
	});

	$.each(manyColorPalette, function (key, data) {
		myBarChartWorkflowStagesBig.datasets[0].bars[key].style = 'padding-left: 10px;'
		var rgbaColor = 'rgba(' + hexToRgb(data).r + ', ' + hexToRgb(data).g + ', ' + hexToRgb(data).b + ', 0.8)';
		myBarChartWorkflowStagesBig.datasets[0].bars[key].fillColor = "" + rgbaColor;
	});

	//var createList = '<ul>'
	var legendList = $('div#legendbar-workflow-stages-big').append('<ul></ul>').find('ul');
	for (var ikey = 0; ikey < myBarChartWorkflowStagesBig.datasets[0].bars.length; ikey++) {
		legendList.append('<li><span style="background-color:'+ myBarChartWorkflowStagesBig.datasets[0].bars[ikey].fillColor +'"></span>' + myBarChartWorkflowStagesBig.datasets[0].bars[ikey].label + '</li>');
	};
	
	$('canvas#chartBarWorkflowStagesBig').on('click', function(evt){
		var activePoints = myBarChartWorkflowStagesBig.getBarsAtEvent(evt);
		var activeLabel = activePoints[0].label;
		var activeValue = activePoints[0].value;
		for (var i = 0; i < activePoints.length; i++) {
			//alert('Label = ' + activeLabel + ', Value = ' + activeValue);
			resetDonutCanvas();
		}
	});
};
function checkBarSpacing(lenthOfArray) {
	if (lenthOfArray >=0 && lenthOfArray < 10) {
		return 15;
	} else if (lenthOfArray >=10 && lenthOfArray < 20) {
		return 10;
	} else if (lenthOfArray >=20 && lenthOfArray <= 30) {
		return 5;
	} else {
		return 0;
	};
};
var resetDonutCanvas = function(){
	/* ======== RESETING CANVAS BY ========== */
	$('canvas#chartPieWorkflowStages').remove(); // this is my <canvas> element
	$('div#myDonutChartContainer').prepend('<canvas id="chartPieWorkflowStages"><canvas>');
	
	/* ======== OR ========== */
	//$('canvas#chartPieWorkflowStages').width($('canvas#chartPieWorkflowStages').width());
	//alert('reseting...');
	
	/*canvas = document.querySelector('#chartPieWorkflowStages');
	ctx = canvas.getContext('2d');*/
	//ctx.canvas.width = $('#graph').width(); // resize to parent width
	//ctx.canvas.height = $('#graph').height(); // resize to parent height
	//var x = canvas.width/2;
	//var y = canvas.height/2;
	//ctx.font = '10pt Verdana';
	//ctx.textAlign = 'center';
	initDataDonutWorkFlowStages (workflowStagesData);
	//ctx.fillText('This text is centered on the canvas', x, y);
};
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
var manyColorPalette = [
	"#FFA000", 
	"#E53935", 
	"#673AB7", 
	"#8BC34A", 
	"#03A9F4", 
	"#546E7A", 
	"#9C27B0", 
	"#43A047", 
	"#1976D2", 
	"#AFB42B", //10
	"#FFA000", 
	"#E53935", 
	"#673AB7", 
	"#C2185B", 
	"#9C27B0", 
	"#5E35B1", 
	"#3949AB", 
	"#2196F3", 
	"#0097A7", 
	"#00796B", //20
	"#2E7D32", 
	"#558B2F", 
	"#9E9D24", 
	"#FBC02D", 
	"#F57F17", 
	"#EF6C00", 
	"#D84315", 
	"#4E342E", 
	"#37474F", 
	"#1565C0" //30
];
function createLinesGIINData(arDataNamesGIIN, arDataValuesGIIN) {
	//======4 Chart - Line Chart (Extended) - Total GIIN === START /
	var dataExtendedLine = {
		/*labels: ["2013", "2014", "2015", "2016"],*/
		labels: arDataNamesGIIN,
		datasets: [{
			label: "dataset",
			fillColor: "rgba(151,187,205,0.5)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			/*data: [15, 20, 90, 400]*/
			data: arDataValuesGIIN
		}]
	}

	var ctxExtendedLine = document.getElementById("chartxlineTotalGIIN").getContext("2d");
	var myExtendedLine = new Chart(ctxExtendedLine).Line(dataExtendedLine, {
		scaleBeginAtZero: true,
		scaleShowGridLines: true
	});
};
var arBubbleList = [
	["Submission Successful", 9, 10], 
	["Reviewed & Reportable", 8, 2], 
	["Reviewed & Not Reportable", 7, 600], 
	["Reviewed Not Started", 6, 1000], 
	["Review In Progress", 5, 17], 
	["Report Withdrawn", 4, 23], 
	["Report Submitted", 3, 71], 
	["Report Rejected", 2, 10], 
	["Report Generated", 1, 7], 
	["Zero Value", 1, 0]
];
function createBubbleGraph(arBubbleListData) {
	//create bubbles
	$('ul.lst-floating-circles').html('');
	//create bubble legend
	$('ul.lst-floating-circle-legend').html('');

	/*$.each(arBubbleListData, function(i, item) {
		console.log(item[i] + ' and ' + item);
	});​*/
	$.each(arBubbleListData, function (key, data) {
		//console.log('Label=' + data[0] + '\nCode=' + data[1] + '\nValue=' + data[2])
		//console.log("key=" + key);
		$('ul.lst-floating-circles').append('<li><a href="javascript:;" ID="' + data[1] + '"><h3>' + data[2] + '</h3><em>' + data[0] + '</em></a></li>');
		$('ul.lst-floating-circle-legend').append('<li><span></span>' + data[0] + '</li>');
	});
	setFloatCircleLayout();
};
function setFloatCircleLayout () {
	$('ul.lst-floating-circles>li>a>h3').each(function() {
		var digitLen = $(this).text().length;
		$(this).closest('a').addClass('count-digit-' + digitLen);
		if ($(this).text() == 0) {$(this).closest('a').removeClass().addClass('count-digit-0');};
		//count-digit-2
	});
};
/*var theData = [
	["FI Number", "Legal Name", "GIIN Type"], 
	["FI Number", "Legal Name", "GIIN Type"], 
	["FI Number", "Legal Name", "GIIN Type"]
];
createGIINFIDetailsTable(theData);
function createGIINFIDetailsTable(arFIDetailsData) {
	//$('table.tbl-giin-fidetails')
	$
	createTableHeader();
};
function createTableHeader() {
	var headerTH = '<tr><th><em>FI Number</em></th>';
		headerTH += '<th><em>Legal Name</em></th>';
		headerTH += '<th><em>GIIN Type</em></th></tr>';

	$('table.tbl-giin-fidetails').html('');
	$('table.tbl-giin-fidetails').append(headerTH);
};*/