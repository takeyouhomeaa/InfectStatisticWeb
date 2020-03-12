var time = '';
var myDate = new Date();
year = myDate.getFullYear();
month = myDate.getMonth() + 1;
day = myDate.getDate();
time = '数据更新至' + year + '-' + month + '-' + day;
document.getElementById('time').innerText = time;

var myChart = echarts.init(document.getElementById('main'));
var url = "data.json";
var request = new XMLHttpRequest();
request.open("get", url);
request.send(null);
request.onload = function () {
    if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        console.log(json)
        var processedData = []
        json.forEach(item => {
                processedData.push({
                    id:item.locationId,
                    name: item.provinceShortName,
                    value: item.currentConfirmedCount,
                    confirmedCount:item.confirmedCount,
                    deadCount: item.deadCount,
                    curedCount: item.curedCount
                })
            }
        )
        console.log(processedData,"pro");

        var diagnose = 0;
        var cure = 0;
        var death = 0;
        var cDiagnose = 0;
        for(i = 0; i < processedData.length;i++){
            cDiagnose += processedData[i].value;
            diagnose += processedData[i].confirmedCount;
            cure += processedData[i].curedCount;
            death += processedData[i].deadCount;
        }
        document.getElementById("cDiagnose").innerText = cDiagnose;
        document.getElementById("diagnose").innerText = diagnose;
        document.getElementById("cure").innerText = cure;
        document.getElementById("death").innerText = death
        myChart.setOption ({
            title: {
                text: '新冠疫情状况分布图',
                subtext: '当前现有确诊病例数，治愈、死亡',
                left:'center',
            },
            series: [{
                type:'map',
                map:'china',
                label:{
                    show:true,
                },
                data:processedData
            }],
            tooltip:{
                triggerOn:'click',
                formatter: function (params) {
                    return `地区：${params.name}<br/>确诊：${params.value || 0}人<br/>
                    治愈：${(params.data && params.data.curedCount) || 0}人<br/>死亡：${params.data?.deadCount || 0}人<br/>
                    <a href="details.html?${params.data.id}">查看</a>`;
                },
                enterable: true
            },
            visualMap:[
                {
                    type: 'piecewise',
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
        })
    }
}
