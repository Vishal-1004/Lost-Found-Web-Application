import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Lost Items',
        data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115],
        fill: false,
        backgroundColor: 'rgba(66, 165, 245, 0.2)', 
        borderColor: 'rgba(66, 165, 245, 1)', 
        pointBackgroundColor: 'rgba(66, 165, 245, 1)',
        borderWidth:'4',
        pointRadius:'1',
        pointHoverRadius:'2',
        
      },
      {
        label: 'Found Items',
        data: [10, 20, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91],
        fill: false,
        backgroundColor: 'rgba(255, 183, 77, 0.2)', 
        borderColor: 'rgba(255, 183, 77, 1)', 
        pointBackgroundColor: 'rgba(255, 183, 77, 1)',
        borderWidth:'4',
        pointRadius:'1',
        pointHoverRadius:'2',
      },
    ],
  };

  const options = {
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
          stepSize: 20, // Adjust step size as needed
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
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full md:w-3/4 mx-auto p-4 bg-blue-50">
      <h2 className="text-center text-lg mb-4">In the Year 2024</h2>
      <div className="relative" style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
