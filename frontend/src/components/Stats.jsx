import BarChart from "./BarChart";

export default function Stats() {
  return (
    <div className="w-full md:w-1/2 bg-blue-100 p-4 mt-4 md:mt-0">
      <h2 className="text-lg font-semibold"></h2>
      <div className="w-full" >
        <BarChart />
      </div>
    </div>
  );
}
