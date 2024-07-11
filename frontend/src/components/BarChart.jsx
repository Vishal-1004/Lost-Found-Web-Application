import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Lost Items',
        data: [2, 1, 2, 3, 4, 2, 0, 5, 2, 3, 5, 1],
        backgroundColor: 'rgba(66, 165, 245, 0.2)', 
        borderColor: 'rgba(66, 165, 245, 1)', 
        borderWidth: 1,
      },
      {
        label: 'Found Items',
        data: [1, 2, 0, 3, 1, 2, 3, 0, 4, 2, 1, 0],
        backgroundColor: 'rgba(255, 183, 77, 0.2)', 
        borderColor: 'rgba(255, 183, 77, 1)', 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x', 
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000000',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, 
          color: '#000000',
          callback: function(value) {
            return value;
          }
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#000000',
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-blue-50">
      <h2 className="text-center text-lg mb-4 font-bold">Your Stats</h2>
      <div className="relative" style={{ height: '200px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
