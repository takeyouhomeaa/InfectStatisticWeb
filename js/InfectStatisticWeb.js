var confirmedCount = [];
var currentConfirmedCount = [];
var curedCount = [];
var deadCount = []
var dateId = [];
var processedData = [];
var msg = []
var processedDate = [];

$.ajaxSettings.async = false;

$.getJSON ("data.json", function (res) {
    var url =  window.location.href;
    var str = url.split('?');
    msg = str[1];
    if(msg == 710000){
        window.location.href="index.html";
    }
    console.log(msg,'msg')
    res.forEach(item => {
            if(item.locationId == msg)
                processedData.push({
                    provinceName:item.provinceName,
                    statisticsData:item.statisticsData,
                    cities:item.cities
                })
        }
    );
});
//把json省份数据进行处理获得各个市的数据
console.log(processedData,'processedData')
var cityData = [];
if(processedData[0].provinceName == '上海市' || processedData[0].provinceName == '北京市'
    || processedData[0].provinceName == '重庆市'|| processedData[0].provinceName == '天津市') {
    processedData[0].cities.forEach(item=>{
        cityData.push(
            {
                name:item.cityName,
                value:item.currentConfirmedCount,
                confirmedCount:item.confirmedCount,
                suspectedCount:item.suspectedCount,
                curedCount:item.curedCount,
                deadCount:item.deadCount,
            })
    })
}else{
    processedData[0].cities.forEach(item=>{
        cityData.push(
            {
                name:item.cityName +'市',
                value:item.currentConfirmedCount,
                confirmedCount:item.confirmedCount,
                suspectedCount:item.suspectedCount,
                curedCount:item.curedCount,
                deadCount:item.deadCount,
            })
    })
}

console.log(cityData);

div=document.getElementById('cityData');
var tab='<table border=1 width=100%">';
tab+='<tr>' +
    '<th>城市</th>' +
    '<th>现存确诊人数</th>' +
    '<th>累计确诊人数</th>' +
    '<th>疑似人数</th>' +
    '<th>治愈人数</th>' +
    '<th>死亡人数</th>' +
    '</tr>';
var currentConfirmed = 0;
var confirmed = 0;
var cure = 0;
var death = 0;
for(i = 0;i<processedData[0].cities.length;i++) {
    tab += '<tr>'
    tab += "<td>" + processedData[0].cities[i].cityName + "</td>";
    tab += "<td>" + processedData[0].cities[i].currentConfirmedCount + "</td>";
    tab += "<td>" + processedData[0].cities[i].confirmedCount + "</td>";
    tab += "<td>" + processedData[0].cities[i].suspectedCount + "</td>";
    tab += "<td>" + processedData[0].cities[i].curedCount + "</td>";
    tab += "<td>" + processedData[0].cities[i].deadCount + "</td>";
    tab += '</tr>';
    currentConfirmed += processedData[0].cities[i].currentConfirmedCount;
    confirmed += processedData[0].cities[i].confirmedCount;
    cure += processedData[0].cities[i].curedCount;
    death += processedData[0].cities[i].deadCount;
}
tab+='</table>';
div.innerHTML=tab;

document.getElementById('province').innerText=processedData[0].provinceName;
document.getElementById('currentConfirmed').innerText=currentConfirmed;
document.getElementById('confirmed').innerText=confirmed;
document.getElementById('cure').innerText=cure;
document.getElementById('death').innerText=death;
var mapName = 'json/' + msg + '.json';

$.get(mapName, function (json) {
    console.log(mapName,'map');
    echarts.registerMap(msg, json);
    var myChart = echarts.init(document.getElementById('main'));
    console.log(cityData,"city");

    var option = {
        //标题设置

        title: {
            text: processedData[0].provinceName + '疫情统计',
            subtext: '当前现有确诊,治愈、死亡,可以使用滚轮放大,鼠标拖动',
            left:'center',
        },
        series: [{
            type:'map',
            map:msg,
            label:{
                show:false,
            },
            data:cityData,
            zoom: 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            scaleLimit: { //滚轮缩放的极限控制
                min: 1,
                max: 5,
            },
        }],
        tooltip:{
            formatter: function (params) {
                // console.log(params)
                return `地区：${params.name}<br/>确诊：${params.value|| 0}人<br/>
                    治愈：${(params.data && params.data.curedCount) || 0}人<br/>死亡：${params.data?.deadCount || 0}人<br/>`;
            }
        },
        visualMap:[
            {
                pieces:[
                    { min: 10000 }, // (10000, Infinity]
                    { min: 1000, max: 9999 }, // (1000, 9999]
                    { min: 100, max: 999 }, // (100, 999]
                    { min: 10, max: 99 }, // (10, 99]
                    { min: 1, max: 9 }, // (0, 9]
                    { value:0}
                ],
                inRange: {
                    color: ['#ffffff','#fdebcf', '#f59e83', '#e55a4e', '#cb2a2f', '#811c24']
                }
            }
        ],
        backgroundColor:'#f7f7f7',
    }
    myChart.setOption (option);
});

$.getJSON (processedData[0].statisticsData, function (str) {
    var dateStaging = [];
    dateStaging = str.data;
    var processedData = [];
    dateStaging.forEach(item=>{
        processedData.push({
            confirmedCount:item.confirmedCount,
            currentConfirmedCount:item.currentConfirmedCount,
            curedCount:item.curedCount,
            deadCount:item.deadCount,
            dateId:item.dateId,

        })
    });
    console.log(processedData,"stg");

    for(i = 0 ; i < processedData.length;i++){
        confirmedCount.push(processedData[i].confirmedCount);
        currentConfirmedCount.push(processedData[i].currentConfirmedCount);
        curedCount.push(processedData[i].curedCount);
        deadCount.push(processedData[i].deadCount);
        dateId.push(processedData[i].dateId);
    }

    var j = 0;
    var dates = [];
    var start = 0;
    for(start = 0;start < dateId.length ;start++){
        dates[j] =  dateId[start] % 10000;
        j++;
    }
    for(i = 0;i < dates.length;i++){
        var d =  dates[i] % 100;
        var m =  Math.floor(dates[i] / 100);
        processedDate[i] = m + '.' + d;
    }
});

var myChart1 = echarts.init(document.getElementById('trend'));

var colors = ['#5793f3', '#d14a61', '#675bba'];
option1 = {
    color: colors,

    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:['现存确诊', '累计确诊'],
    },
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: processedDate
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: processedDate
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '现存确诊',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: currentConfirmedCount
        },
        {
            name: '累计确诊',
            type: 'line',
            smooth: true,
            data: confirmedCount
        }
    ]
};
option2 = {
    color: colors,

    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:['死亡人数', '治愈人数'],
    },
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: processedDate
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: processedDate
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '死亡人数',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: deadCount
        },
        {
            name: '治愈人数',
            type: 'line',
            smooth: true,
            data: curedCount
        }
    ]
};

myChart1.setOption(option1);

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
btn1.onclick = function () {
    btn1.setAttribute('class','btn btn-primary');
    btn2.setAttribute('class','btn btn btn-default');
    myChart1 = echarts.init(document.getElementById('trend'));
    myChart1.setOption(option1);
}
btn2.onclick = function () {
    btn2.setAttribute('class','btn btn-primary');
    btn1.setAttribute('class','btn btn btn-default');
    myChart1 = echarts.init(document.getElementById('trend'));
    myChart1.setOption(option2);
}