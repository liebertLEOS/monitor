$( function(){

	var barChart = echarts.init(document.getElementById('bar-chart'));
	var lineChart = echarts.init(document.getElementById('line-chart'));

	function getBarChartData(){
		$.get('user-data').done(function (data) {
			var userData = data.anchorVoteModels;

			var len = userData.length,
				voteNumber = new Array(),
				nickName   = new Array();

			for( var i=0; i < len; i++){
				voteNumber[i] = userData[i].voteNumber;
				nickName[i] = userData[i].nickName;
			}

		    barChart.setOption({
		        title: {
		            text: '2017年度主播评选监控'
		        },
		        grid: { // 控制图的大小
	           		bottom:'15%'
	         	},
		        tooltip: {},
		        legend: {
		            data:['2017年度主播评选监控']
		        },
		        xAxis: {
		            data: nickName,
		            axisLabel: {  
					   	interval:0,
					   	rotate: 20,
					   	textStyle: {
	                        color: '#000',
	                        fontSize: 10,
	                        fontWeight: 'bold'
	                    }
					   	// formatter:function(value) {
					   	// 	return value.split("").join("\n");  
					   	// }
					}
		        },
		        yAxis: {},
		        series: [{
		            name: '票数',
		            type: 'bar',
		            data: voteNumber
		        }]
		    });


		});
	}

	var userset = [{
		userid: 2629294,
		name: '采采',
        type: 'line',
        data: []
	},{
		userid: 1266964,
		name: '2',
        type: 'line',
        data: []
	},{
		userid: 25725181,
		name: '3',
        type: 'line',
        data: []
	},{
		userid: 2979487,
		name: '4',
        type: 'line',
        data: []
	},{
		userid: 53903665,
		name: '5',
        type: 'line',
        data: []
	},{
		userid: 66769858,
		name: '6',
        type: 'line',
        data: []
	},{
		userid: 47398747,
		name: '7',
        type: 'line',
        data: []
	},{
		userid: 37504890,
		name: '8',
        type: 'line',
        data: []
	},{
		userid: 35310389,
		name: '9',
        type: 'line',
        data: []
	},{
		userid: 38876036,
		name: '10',
        type: 'line',
        data: []
	}];

	function getLineChartData(){
		var xAxis = [];
		var legend = [];

		// 循环获取15个用户的数据
		// 采采
		for (var j=0; j<userset.length; j++) {
			legend[j] = userset[j].name;
			$.ajax({
				url: 'user',
				async: false,
				data:{
					userid: userset[j].userid
				},
				success: function(data){
					var len = data.length;
					var voteNumber = new Array();
					var datetime = new Array();
					var newDate = new Date();

					for (var i=0; i<len; i++) {
						voteNumber[i] = data[len-i-1].votenumber;
						newDate.setTime(data[len-i-1].createtime);
						datetime[i] = newDate.getHours() +'时'+ newDate.getMinutes() + '分' + ( newDate.getSeconds().toString().match(/^\d{2}$/) ? newDate.getSeconds() : '0'+newDate.getSeconds() ) + '秒';
					}
					xAxis = datetime;
					userset[j].data = voteNumber;		
				}
			});

		}

		lineChart.setOption({
	        title: {
	            text: '2017年度主播评选票数统计图'
	        },
	        grid: { // 控制图的大小
           		bottom:'15%'
         	},
	        tooltip: {
	        	axisPointer: {
	        		link: {xAxisIndex: 'all'}
	        	}
	        },
	        axisPointer: {
	            link: {xAxisIndex: 'all'},
	            label: {
	                backgroundColor: '#777'
	            }
	        },
	        legend: {
	            data:legend
	        },
	        toolbox: {
		        show: true,
		        feature: {
		            magicType: {show: true, type: ['stack', 'tiled']},
		            saveAsImage: {show: true}
		        }
		    },
	        xAxis: {
	        	name: '时间',
	            data: xAxis,
	            axisPointer:{
                	show:true
                },
	            axisLabel: {  
				   	interval:0,
				   	rotate: -20,
				   	textStyle: {
                        color: '#000',
                        fontSize: 10
                    }
				}
	        },
	        yAxis:{
            	name: '票数',
                scale: true,
                axisPointer:{
                	show:true
                }
            },
	        series: userset
	    });
	

		// $.get('user?userid=2629294').done(function (data) {

		// 	var len = data.length;
		// 	var voteNumber = new Array();
		// 	var datetime = new Array();
		// 	var newDate = new Date();

		// 	for (var i=0; i<len; i++) {
		// 		voteNumber[i] = data[len-i-1].votenumber;
		// 		newDate.setTime(data[len-i-1].createtime);
		// 		datetime[i] = newDate.toLocaleTimeString();
		// 	}


			

		// });
	}

	//getBarChartData();
	getLineChartData();

	//setInterval(getBarChartData, 3000);
	setInterval(getLineChartData,180000);

} );