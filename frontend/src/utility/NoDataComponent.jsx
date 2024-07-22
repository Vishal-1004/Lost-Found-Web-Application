import TypewriterComponent from "typewriter-effect";

const NoDataComponent = () => {
  return (
    <div className="w-full h-full">
      <div className="border border-blue-500 bg-blue-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-6">
        <h1 className="text-blue-500 text-2xl mb-4">No Data To Display</h1>
        <div className="text-gray-800">
          <p className="mb-2">
            <TypewriterComponent
              options={{
                delay: 50, // Adjust typing speed (lower is faster)
                cursor: "", // Hide cursor after typing
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("* Kindly try refreshing the page.")
                  .start();
              }}
            />
          </p>
          <p>
            <TypewriterComponent
              options={{
                delay: 50, // Adjust typing speed (lower is faster)
                cursor: "", // Hide cursor after typing
              }}
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(2000)
                  .typeString(
                    "* If there is still no data displayed then you may proceed to create one."
                  )
                  .start();
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoDataComponent;
