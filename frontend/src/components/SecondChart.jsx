import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SecondChart = ({tab}) => {
  const data = {
    labels: ['Others Items', 'Admin Items','Your Items'],
    datasets: [
      {
        label: 'Items',
        data: [10, 18, 3], 
        backgroundColor: [
          'rgba(66, 165, 245, 0.2)',
          'rgba(255, 183, 77, 0.2)',
          'rgba(205,0,0,0.3)',
        ],
        borderColor: [
          'rgba(66, 165, 245, 1)',
          'rgba(255, 183, 77, 1)',
          'rgba(205,0,0,0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#000000',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw;
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="w-full p-4 bg-blue-50">
      <h2 className="text-center text-lg mb-4 font-bold"> {tab} Stats</h2>
      <div className="relative" style={{ height: '200px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default SecondChart;
