import HomeStatus from "./HomeStatus";

const ColumnsWithChart = () => {
  return (
    <div className="mx-auto px-4 py-8 bg-gradient-to-b from-[#fff] to-blue-100">
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/2 px-4 flex flex-col gap-4 mb-4">
          <h1
            className="text-[28px] sm:text-[36px] font-bold text-gray-700 text-left"
          >
            Some Information
          </h1>
          <p className="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quam, vel dolorem nulla veritatis quibusdam atque, porro vitae cum officiis laudantium ipsum ad, nihil aperiam quasi consectetur perspiciatis voluptatem animi possimus. Error magnam ipsum modi ex expedita, sapiente dicta ratione, doloribus, perspiciatis ipsam cum animi? Obcaecati nam expedita in sunt excepturi fugit rem distinctio optio explicabo reprehenderit officiis, id vitae a labore adipisci hic iste accusamus. Et alias eveniet omnis nobis accusamus eum distinctio odio quaerat qui sit in repellat sapiente sed dolores mollitia consequuntur debitis, explicabo est aliquid fuga veritatis assumenda quidem. Dolore, vel excepturi error voluptatem praesentium hic.
          </p>
        </div>
        <div className="w-full md:w-1/2 mx-auto">
          <HomeStatus />
        </div>
      </div>
    </div>
  );
};

export default ColumnsWithChart;
