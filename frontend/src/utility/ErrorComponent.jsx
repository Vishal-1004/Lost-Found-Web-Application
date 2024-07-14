import TypewriterComponent from "typewriter-effect";

const ErrorComponent = () => {
  return (
    <div className="">
      <div className="border border-red-500 bg-red-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-6">
        <h1 className="text-red-500 text-2xl mb-4">Some Error Occurred</h1>
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
                    "* If error persists, try after some time while we are working on it."
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

export default ErrorComponent;
