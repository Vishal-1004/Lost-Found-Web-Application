import TypewriterComponent from "typewriter-effect";

const LoginToAccessComponent = () => {
  return (
    <div className="">
      <div className="border border-blue-500 bg-blue-100 p-6 rounded-lg shadow-md max-w-lg mx-auto my-6">
        <h1 className="text-blue-500 text-2xl mb-4">Login To Access</h1>
        <div className="text-gray-800">
          <p className="mb-2">
            <TypewriterComponent
              options={{
                delay: 20, // Adjust typing speed (lower is faster)
                cursor: "", // Hide cursor after typing
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    " ▶ This component can be accessed by only registered users."
                  )
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
                    "▶ You need to login first to use/view this component."
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

export default LoginToAccessComponent;
