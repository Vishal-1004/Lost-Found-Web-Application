import {
  ourTeamBackgound,
  vishal,
  shashank,
  akkilesh,
  adityaP,
  surya,
  adithya,
} from "../assets";
import { AboutUsVideo, TeamCard } from "../components";

const AboutUs = () => {
  return (
    <>
      <AboutUsVideo />
      <div className="max-w-5xl mx-auto mb-10 p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-gray-800 pb-6 border-b border-gray-300">
          Problem Statement
        </h1>
        <p className="pt-6 pb-10 text-gray-600 leading-loose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut facere ea,
          rerum quo sunt cum pariatur consectetur voluptatibus ratione
          voluptatem voluptates, perferendis quaerat vero? Obcaecati, in quidem?
          Provident nobis libero voluptate itaque inventore fugiat iste
          consectetur quod enim veniam, aspernatur nulla dolores maxime dicta!
          Porro voluptates molestias impedit incidunt natus!
        </p>
        <h1 className="text-4xl font-bold text-gray-800 pb-6 border-b border-gray-300">
          How We Are Solving the Problem?
        </h1>
        <p className="pt-6 pb-10 text-gray-600 leading-loose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sunt,
          nemo repellat tempora asperiores pariatur quasi consequuntur ipsam
          fugiat facilis quia illum, enim impedit ea sit ipsa? Totam illum non
          neque voluptatum excepturi officiis omnis itaque, incidunt distinctio
          cupiditate iure. Fugiat cum aspernatur quis? Dolores dicta totam
          officia quo excepturi.
        </p>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 pb-6 border-b border-gray-300">
            Tech Stack Used
          </h1>
          <div className="flex justify-around mt-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 pb-4">
                Frontend
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/tailwind_css.png"
                    alt="Tailwind CSS"
                  />
                  <span className="text-gray-700">Tailwind CSS</span>
                </li>
                <li className="flex items-center space-x-4">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png"
                    alt="React JS"
                  />
                  <span className="text-gray-700">React Js</span>
                </li>
                <li className="flex items-center space-x-4">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/redux.png"
                    alt="Redux"
                  />
                  <span className="text-gray-700">Redux</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 pb-4">
                Backend
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/nodejs.png"
                    alt="Node JS"
                  />
                  <span className="text-gray-700">Node Js</span>
                </li>
                <li className="flex items-center space-x-4">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/ios/50/express-js.png"
                    alt="Express JS"
                  />
                  <span className="text-gray-700">Express Js</span>
                </li>
                <li className="flex items-center space-x-4">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/mongo-db.png"
                    alt="MongoDB"
                  />
                  <span className="text-gray-700">MongoDB</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 pb-4">
            Key Modules
          </h2>
          <ul className="list-disc grid grid-cols-1 sm:grid-cols-2 gap-4 gap-x-8">
            <li>
              <span className="text-gray-700">Chart.js</span>
            </li>
            <li>
              <span className="text-gray-700">Nodemailer</span>
            </li>
            <li>
              <span className="text-gray-700">Toastify</span>
            </li>
            <li>
              <span className="text-gray-700">Multer</span>
            </li>
            <li>
              <span className="text-gray-700">Toastify</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="py-16 sm:py-8"
        style={{
          backgroundImage: `url(${ourTeamBackgound})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-[58px] text-center font-bold uppercase text-gray-700 pd-8">
          Our Team
        </h1>
        {/* Right Aligned Cards */}
        <div className="hidden md:flex md:flex-row justify-center items-center md:items-end">
          <div className="inline-block pl-40 mr-24 scale-125 my-20 mx-20">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Faculty Guide
            </h3>
            <TeamCard
              name="Vishal Kumar Yadav"
              image={vishal}
              link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
            />
          </div>
          <div className="inline-block scale-125 ml-12 my-10">
          <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Team Lead
            </h3>
            <TeamCard
              name="Vishal Kumar Yadav"
              image={vishal}
              link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
            />
          </div>
        </div>

        <div className="flex flex-col block md:hidden md:flex-row justify-center items-center md:items-end max-[440px]:scale-90">
          <div className="inline-block scale-125 my-20 mx-20">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Faculty Guide
            </h3>
            <TeamCard
              name="Vishal Kumar Yadav"
              image={vishal}
              link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
            />
          </div>
          <div className="w-full flex flex-row justify-evenly">
            <div className="inline-block scale-125 my-10">
              <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Team Lead
              </h3>
              <TeamCard
                name="Vishal Kumar Yadav"
                image={vishal}
                link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end ">
          <div className="inline-block items-bottom">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Frontend Developers
            </h3>
            <div className="flex">
              <TeamCard
                name="Shashank Sharma"
                image={shashank}
                link="https://www.linkedin.com/in/shashank-sharma-733ba126b/"
              />
              <TeamCard
                name="Surya M.U"
                image={surya}
                link="https://linkedin.com/in/suryamu7"
              />
            </div>
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Web Designer
            </h3>
            <div className="flex">
              <TeamCard
                name="Aditya Prabhu"
                image={adityaP}
                link="https://www.linkedin.com/in/aditya-prabhu-90ba6724a"
              />
            </div>
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-[24px] text-center font-bold text-gray-700 py-2">
              Backend Developers
            </h3>
            <div className="flex">
              <TeamCard
                name="Akkilesh A"
                image={akkilesh}
                link="https://www.linkedin.com/in/akkilesh-a-620561275/"
              />
              <TeamCard
                name="A.Adithya"
                image={adithya}
                link="https://www.linkedin.com/in/adithya-aravindan-06a760279/"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
