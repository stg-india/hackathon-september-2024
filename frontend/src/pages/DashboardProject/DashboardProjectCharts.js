import React from 'react';
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";


const PrjectsStatusCharts = ({ series }) => {
    var donutchartProjectsStatusColors = ["#09cf12","#0e6cc4","#e37c08","#d52c08","#09c6cf"];

    var options = {
        labels: ["Debug","Critical","Warning","Error","Info"],
        chart: {
            type: "donut",
            height: 230,
        },
        plotOptions: {
            pie: {
                size: 100,
                offsetX: 0,
                offsetY: 0,
                donut: {
                    size: "90%",
                    labels: {
                        show: false,
                    }
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        stroke: {
            lineCap: "round",
            width: 0
        },
        colors: donutchartProjectsStatusColors,
    };
    return (
        <React.Fragment>
            <ReactApexChart
                options={options}
                series={series}
                type="donut"
                height="230"
                className="apex-charts"
            />
        </React.Fragment>
    );
};

export {PrjectsStatusCharts };