import TypewriterComponent from "typewriter-effect";

const WarningComponent = () => {
  return (
    <div className="">
      <div className="border border-yellow-500 bg-yellow-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-6">
        <h1 className="text-yellow-500 text-2xl mb-4">Page Under Development</h1>
        <div className="text-gray-800">
          <p className="mb-2">
            <TypewriterComponent
              options={{
                delay: 20, // Adjust typing speed (lower is faster)
                cursor: "", // Hide cursor after typing
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(" ▶ This page is currently under development.")
                  .start();
              }}
            />
          </p>
          <p>
            <TypewriterComponent
              options={{
                delay: 30, // Adjust typing speed (lower is faster)
                cursor: "", // Hide cursor after typing
              }}
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(1000)
                  .typeString(
                    "▶ We are working hard to get it up and running soon."
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

export default WarningComponent;
