//[widget charts Javascript]

//Project:	Unique Admin - Responsive Admin Template
//Primary use:   Used only for the  widget charts



$( document ).ready(function() {
    "use strict";
	

	if( $('#bubble-chart').length > 0 ){
		var ctx5 = document.getElementById("bubble-chart").getContext("2d");
		var data5 = {
			datasets: [
				{
					label: 'First Dataset',
					data: [
						{
							x: 60,
							y: 40,
							r: 20
						},
						{
							x: 50,
							y: 60,
							r: 20
						},
						{
							x: 40,
							y: 70,
							r: 20
						},
						{
							x: 30,
							y: 20,
							r: 30
						},
						{
							x: 80,
							y: 50,
							r: 20
						}
					],
					backgroundColor:"#689f38",
					hoverBackgroundColor: "#33691e",
				},
				{
					label: 'Second Dataset',
					data: [
						{
							x: 50,
							y: 20,
							r: 30
						},
						{
							x: 55,
							y: 30,
							r: 30
						},
						{
							x: 45,
							y: 20,
							r: 30
						}
					],
					backgroundColor:"#38649f",
					hoverBackgroundColor: "#244674",
				}]
		};
		
		var bubbleChart = new Chart(ctx5,{
			type:"bubble",
			data:data5,
			options: {
				elements: {
					points: {
						borderWidth: 1,
						borderColor: 'rgb(33, 33, 33)'
					}
				},
				scales: {
					xAxes: [
					{
						ticks: {
							min: -10,
							max: 100,
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						},
						gridLines: {
							color: "rgba(135,135,135,0)",
						}
					}],
					yAxes: [
					{
						ticks: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						},
						gridLines: {
							color: "rgba(135,135,135,0)",
						}
					}]
				},
				animation: {
					duration:	3000
				},
				responsive: true,
				legend: {
					labels: {
					fontFamily: "Nunito Sans",
					fontColor:"#878787"
					}
				},
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Nunito Sans'"
				}
			}
		});
	}

	if( $('#pie-chart').length > 0 ){
		var ctx6 = document.getElementById("pie-chart").getContext("2d");
		var data6 = {
			 labels: [
			"lab 1",
			"lab 2",
			"lab 3"
		],
		datasets: [
			{
				data: [425, 70, 120],
				backgroundColor: [
					"#689f38",
					"#38649f",
					"#389f99"
				],
				hoverBackgroundColor: [
					"#33691e",
					"#244674",
					"#18625e"
				]
			}]
		};
		
		var pieChart  = new Chart(ctx6,{
			type: 'pie',
			data: data6,
			options: {
				animation: {
					duration:	3000
				},
				responsive: true,
				legend: {
					labels: {
					fontFamily: "Nunito Sans",
					fontColor:"#878787"
					}
				},
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Nunito Sans'"
				},
				elements: {
					arc: {
						borderWidth: 0
					}
				}
			}
		});
	}

	if( $('#doughnut-chart').length > 0 ){
		var ctx7 = document.getElementById("doughnut-chart").getContext("2d");
		var data7 = {
			 labels: [
			"lab 1",
			"lab 2",
			"lab 3"
		],
		datasets: [
			{
				data: [356, 95, 210],
				backgroundColor: [
					"#389f99",
					"#ee1044",
					"#ff8f00"
				],
				hoverBackgroundColor: [
					"#18625e",
					"#b31338",
					"#c0720f"
				]
			}]
		};
		
		var doughnutChart = new Chart(ctx7, {
			type: 'doughnut',
			data: data7,
			options: {
				animation: {
					duration:	3000
				},
				responsive: true,
				legend: {
					labels: {
					fontFamily: "Nunito Sans",
					fontColor:"#878787"
					}
				},
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Nunito Sans'"
				},
				elements: {
					arc: {
						borderWidth: 0
					}
				}
			}
		});
	}
	
	// Bar chart
	new Chart(document.getElementById("bar-chart1"), {
		type: 'bar',
		data: {
		  labels: ["January", "February", "March", "April", "May"],
		  datasets: [
			{
			  label: "Dataset",
			  backgroundColor: ["#689f38", "#38649f","#389f99","#ee1044","#ff8f00"],
			  data: [4875,9658,5425,7548,1245]
			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: 'My dataset'
		  }
		}
	});
	
	if( $('#bar-chart2').length > 0 ){
		var ctx2 = document.getElementById("bar-chart2").getContext("2d");
		var data2 = {
			labels: ["July", "August", "September", "October", "November", "December"],
			datasets: [
				{
					label: "First dataset",
					backgroundColor: "#689f38",
					borderColor: "#689f38",
					data: [36, 85, 50, 20, 70, 51]
				},
				{
					label: "Second dataset",
					backgroundColor: "#38649f",
					borderColor: "#38649f",
					data: [86, 27, 90, 48, 40, 19]
				},
				{
					label: "Third dataset",
					backgroundColor: "#389f99",
					borderColor: "#389f99",
					data: [76, 77, 40, 28, 50, 29]
				}
			]
		};
		
		var hBar = new Chart(ctx2, {
			type:"bar",
			data:data2,
			
			options: {
				tooltips: {
					mode:"label"
				},
				scales: {
					yAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						}
					}],
					xAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						}
					}],
					
				},
				elements:{
					point: {
						hitRadius:40
					}
				},
				animation: {
					duration:	3000
				},
				responsive: true,
				maintainAspectRatio:false,
				legend: {
					display: false,
				},
				
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Nunito Sans'"
				}
				
			}
		});
	};


	// Horizental Bar Chart
	new Chart(document.getElementById("bar-chart-horizontal1"), {
		type: 'horizontalBar',
		data: {
		  labels: ["August", "September", "October", "November", "December"],
		  datasets: [
			{
			  label: "Dataset",
			  backgroundColor: ["#689f38", "#38649f","#389f99","#ee1044","#ff8f00"],
			  data: [1254,8452,9542,4256,3254]
			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: 'My dataset'
		  }
		}
	});
	
	if( $('#bar-chart-horizontal2').length > 0 ){
		var ctx2 = document.getElementById("bar-chart-horizontal2").getContext("2d");
		var data2 = {
			labels: ["July", "August", "September", "October", "November", "December"],
			datasets: [
				{
					label: "My First dataset",
					backgroundColor: "#689f38",
					borderColor: "#689f38",
					data: [50, 45, 80, 59, 40, 75]
				},
				{
					label: "My Second dataset",
					backgroundColor: "#38649f",
					borderColor: "#38649f",
					data: [34, 67, 65, 88, 50, 58]
				}
			]
		};
		
		var hBar = new Chart(ctx2, {
			type:"horizontalBar",
			data:data2,
			
			options: {
				tooltips: {
					mode:"label"
				},
				scales: {
					yAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						}
					}],
					xAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						}
					}],
					
				},
				elements:{
					point: {
						hitRadius:40
					}
				},
				animation: {
					duration:	3000
				},
				responsive: true,
				legend: {
					display: false,
				},
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Nunito Sans'"
				}
				
			}
		});
	}

	//Polar Chart
	new Chart(document.getElementById("polar-chart1"), {
		type: 'polarArea',
		data: {
		  labels: ["August", "September", "October", "November", "December"],
		  datasets: [
			{
			  label: "Dataset",
			  backgroundColor: ["#689f38", "#38649f","#389f99","#ee1044","#ff8f00"],
			  data: [1254,8456,7458,9652,2568]
			}
		  ]
		},
		options: {
		  title: {
			display: true,
			text: 'Mt Dataset'
		  }
		}
	});

	if( $('#polar-chart2').length > 0 ){
		var ctx4 = document.getElementById("polar-chart2").getContext("2d");
		var data4 = {
			datasets: [{
				data: [
					25,
					15,
					35,
					9,
					19
				],
				backgroundColor: [
					"#689f38",
					"#38649f",
					"#389f99",
					"#ee1044",
					"#ff8f00"
				],
				hoverBackgroundColor: [
					"#33691e",
					"#244674",
					"#18625e",
					"#b31338",
					"#c0720f"
				],
				label: 'My dataset' // for legend
			}],
			labels: [
				"data 1",
				"data 2",
				"data 3",
				"data 4",
				"data 5"
			]
		};
		var polarChart = new Chart(ctx4, {
			type: "polarArea",
			data: data4,
			options: {
				elements: {
					arc: {
						borderColor: "#fff",
						borderWidth: 0
					}
				},
				scale: {
					ticks: {
						beginAtZero: true,
						fontFamily: "Nunito Sans",
						
					},
					gridLines: {
						color: "rgba(135,135,135,0)",
					}
				},
				animation: {
					duration:	3000
				},
				responsive: true,
				legend: {
					labels: {
					fontFamily: "Nunito Sans",
					fontColor:"#878787"
					}
				},
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Nunito Sans'"
				}
			}
		});
	}

	//Radar chart
	new Chart(document.getElementById("radar-chart1"), {
		type: 'radar',
		data: {
		  labels: ["August", "September", "October", "November", "December"],
		  datasets: [
			{
			  label: "250",
			  fill: true,
			  backgroundColor: "rgba(179,181,198,0.2)",
			  borderColor: "rgba(179,181,198,1)",
			  pointBorderColor: "#fff",
			  pointBackgroundColor: "rgba(179,181,198,1)",
			  data: [4.77,64.61,29.69,8.62,5.82]
			}, {
			  label: "4050",
			  fill: true,
			  backgroundColor: "rgba(239, 72, 62, 0.2)",
			  borderColor: "rgba(239, 72, 62, 1)",
			  pointBorderColor: "#fff",
			  pointBackgroundColor: "#ff4c52",
			  pointBorderColor: "#fff",
			  data: [29.48,42.16,2.61,9.06,2.45]
			}
		  ]
		},
		options: {
		  title: {
			display: true,
			text: 'My dataset'
		  }
		}
	});

	if( $('#radar-chart2').length > 0 ){
		var ctx3 = document.getElementById("radar-chart2").getContext("2d");
		var data3 = {
			labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
			datasets: [
				{
					label: "My First dataset",
					backgroundColor: "rgba(116, 96, 238, 0.6)",
					borderColor: "rgba(116, 96, 238, 0.6)",
					pointBackgroundColor: "rgba(116, 96, 238, 0.6)",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(116, 96, 238, 0.6)",
					data: [65, 59, 90, 81, 56, 55, 40]
				},
				{
					label: "My Second dataset",
					backgroundColor: "rgba(57, 139, 247, 1)",
					borderColor: "rgba(57, 139, 247, 1)",
					pointBackgroundColor: "rgba(57, 139, 247, 1)",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "rgba(57, 139, 247, 1)",
					data: [28, 48, 40, 19, 96, 27, 100]
				}
			]
		};
		var radarChart = new Chart(ctx3, {
			type: "radar",
			data: data3,
			options: {
					scale: {
						ticks: {
							beginAtZero: true,
							fontFamily: "Nunito Sans",
							
						},
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						pointLabels:{
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						},
					},
					
					animation: {
						duration:	3000
					},
					responsive: true,
					legend: {
							labels: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
							}
						},
						elements: {
							arc: {
								borderWidth: 0
							}
						},
						tooltip: {
						backgroundColor:'rgba(33,33,33,1)',
						cornerRadius:0,
						footerFontFamily:"'Nunito Sans'"
					}
			}
		});
	}
	//Line Chart
	
	new Chart(document.getElementById("line-chart1"), {
	  type: 'line',
	  data: {
		labels: [4500,3500,3200,3050,2700,2450,2200,1750,1499,2050],
		datasets: [{ 
			data: [86,114,106,106,107,111,133,221,783,2478],
			label: "January",
			borderColor: "#689f38",
			fill: false
		  }, { 
			data: [282,350,411,502,635,809,947,1402,3700,5267],
			label: "February",
			borderColor: "#38649f",
			fill: false
		  }, { 
			data: [168,170,178,190,203,276,408,547,675,734],
			label: "March",
			borderColor: "#389f99",
			fill: false
		  }, { 
			data: [40,20,10,16,24,38,74,167,508,784],
			label: "April",
			borderColor: "#ee1044",
			fill: false
		  }, { 
			data: [6,3,2,2,7,26,82,172,312,433],
			label: "May",
			borderColor: "#ff8f00",
			fill: false
		  }
		]
	  },
	  options: {
		title: {
		  display: true,
		  text: 'My Dateset'
		}
	  }
	});
	
	if( $('#line-chart2').length > 0 ){
		var ctx1 = document.getElementById("line-chart2").getContext("2d");
		var data1 = {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
			{
				label: "fir",
				backgroundColor: "#ff8f00",
				borderColor: "#ff8f00",
				pointBorderColor: "#ff8f00",
				pointHighlightStroke: "#ff8f00",
				data: [0, 59, 40, 75, 50, 45, 80]
			},
			{
				label: "sec",
				backgroundColor: "#ee1044",
				borderColor: "#ee1044",
				pointBorderColor: "#ee1044",
				pointBackgroundColor: "#ee1044",
				data: [48, 88, 50, 58, 34, 67, 65],
			}
			
		]
		};
		
		var areaChart = new Chart(ctx1, {
			type:"line",
			data:data1,
			
			options: {
				tooltips: {
					mode:"label"
				},
				elements:{
					point: {
						hitRadius:90
					}
				},
				
				scales: {
					yAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						}
					}],
					xAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Nunito Sans",
							fontColor:"#878787"
						}
					}]
				},
				animation: {
					duration:	3000
				},
				responsive: true,
				legend: {
					display: false,
				},
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Nunito Sans'"
				}
				
			}
		});
	}

	
}); // End of use strict
