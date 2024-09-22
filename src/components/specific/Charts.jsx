/* eslint-disable react/prop-types */
import { Line, Doughnut } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS,
    Tooltip,
    Legend,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
 } from "chart.js";
import { orange, orangeLight, purple, purpleLight } from "../../constants/color";
import { getLast7Days } from "../../lib/features";

 ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    ArcElement
)
const labels=getLast7Days()


const lineChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false
        }
    },

    scales:{
        x:{
            grid:{
                display:false
            }
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false
            }
        }
    }
}

const LineChart = ({value=[]}) => {
  const data = {
    labels: labels,
    datasets: [{
        data:value,
        label:"Messages",
        fill:true,
        backgroundColor:purpleLight,
        borderColor:purple
    },]
  };

  return (
    <div>
      <Line data={data} options={lineChartOptions}/>
    </div>
  );
};

const DoughnutChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
    },
    cutout:80
}
const DoughnutChart = ({value=[],labels=[]}) => {
    const data = {
        labels: labels,
        datasets: [{
            data:value,
            backgroundColor:[purpleLight,orangeLight],
            hoverBackgroundColor:[purple,orange],
            borderColor:[purple,orange],
            offset:40
        },]
      };
  return (
    <Doughnut style={{
        zIndex:10
    }} data={data} options={DoughnutChartOptions}/>
  );
};

export { LineChart, DoughnutChart };
