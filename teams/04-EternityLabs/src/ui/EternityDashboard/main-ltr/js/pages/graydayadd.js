document.write("<script language=javascript src='./js/api.js'></script>");
document.write("<script language=javascript src='http://at.alicdn.com/t/font_2612700_uzdaq5d2kzd.js'></script>");




$(function () {

    getgrayposition();
getSelectCurrency();
    'use strict';

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

}); // End of use strict

function getSelectCurrency() {
    var str = '<option selected="selected">BTC</option>';
    var list = [ "ETH", "XRP", "ADA", "DOGE", "BNB", "LTC", "DOT", "EOS", "BCH", "UNI", "SOL", "TRX", "LINK", "ETC", "FIL", "MATIC", "SUSHI", "XLM", "ICP", "BSV", "USDT", "FTT"];
    list.forEach((item, i) => {
        str += '<option>' + list[i] + '</option>';
    });
    $(".select-currency").append(str);
}
function viewlist(){
	
}
function change(){
	console.log("111");
	
	var chartDom = document.getElementById('grayposition');
	var myChart = echarts.init(chartDom);
	var option;
	

	option = {
	   
	
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross'
	        },
			 formatter: "{b} <br/>{a0}: {c0}万 <br/>{a1}:${c1}万" // 这里是鼠标移上去的显示数据
	    },
	    grid: {
	        right: '10%'
	    },
	    toolbox: {
	        feature: {
	            dataView: {show: true, readOnly: false},
				 
	            restore: {show: true},
	            saveAsImage: {show: true},
				
	        }
	    },
	   
	    xAxis: [
	        {
	            type: 'category',
	            axisTick: {
	                alignWithLabel: true
	            },
	            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	        }
	    ],
		dataZoom: [
		        {
		            type: 'slider',
		            xAxisIndex: 0,
		            
		        },
		     
		        {
		            type: 'inside',
		            xAxisIndex: 0,
		            
		        },
		       
		    ],
	    yAxis: [
	        {
	            type: 'value',
	            
	        
	            position: 'right',
	            axisLine: {
	                show: true,
	               
	            },
	            axisLabel: {
	                formatter: '{value} 万'
	            }
	        },
	        {
	            
	        },
	        {
	            type: 'value',
	           
	          
	            position: 'left',
	            axisLine: {
	                show: true,
	               
	            },
	            axisLabel: {
	                formatter: '${value} 万'
	            }
	        }
	    ],
	    series: [
	       {
	            name: '增持',
	            type: 'bar',
	            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 13.56, 16.22, 32.6, 20.0, 6.4, 3.3],
				color:"#5470C6"
	        }, 
	   
	        {
	            name: 'BTC价格',
	            type: 'line',
	            yAxisIndex: 2,
	            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
				color:'#EE6666'
	        }
	    ]
	};
if($("#style-select option:selected").val()==="折线图"){
	option.series[0]=
	{	            name: '增持',
	            type: 'line',
	            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 13.56, 16.22, 32.6, 20.0, 6.4, 3.3],
				color:"#5470C6"
				}
				
}
else{option.series[0]=
{	            name: '增持',
	            type: 'bar',
	            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 13.56, 16.22, 32.6, 20.0, 6.4, 3.3],
				color:"#5470C6"
				}
				
}



option && myChart.setOption(option);
   $(window).resize(function () {
        myChart.resize();
    })
}

function getgrayposition() {
	var chartDom = document.getElementById('grayposition');
	var myChart = echarts.init(chartDom);
	var option;
	

option = {
    

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
		 formatter: "{b} <br/>{a0}: {c}万<br/>{a1}:${c1}万" // 这里是鼠标移上去的显示数据
    },
 
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
			 
            restore: {show: true},
            saveAsImage: {show: true},
			
        }
    },
    
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    ],
	dataZoom: [
	        {
	            type: 'slider',
	            xAxisIndex: 0,
	            
	        },
	     
	        {
	            type: 'inside',
	            xAxisIndex: 0,
	            
	        },
	       
	    ],
    yAxis: [
        {
            type: 'value',
            
           
            position: 'right',
            axisLine: {
                show: true,
               
            },
            axisLabel: {
                formatter: '{value}万'
            }
        },
        {
            
        },
        {
            type: 'value',
           
          
            position: 'left',
            axisLine: {
                show: true,
               
            },
            axisLabel: {
                formatter: '${value}万'
            }
        }
    ],
    series: [
        {
            name: '增持',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 13.56, 16.22, 32.6, 20.0, 6.4, 3.3],
		
			color:"#5470C6"
        },
   
        {
            name: 'BTC价格',
            type: 'line',
            yAxisIndex: 2,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
			color: '#EE6666'
        }
    ]
};
option && myChart.setOption(option);
   $(window).resize(function () {
        myChart.resize();
    })
}
