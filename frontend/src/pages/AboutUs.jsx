import { ourTeamBackgound, vishal, akkilesh, adityaP, surya } from "../assets";
import { AboutUsVideo, TeamCard } from "../components";

const AboutUs = () => {
  return (
    <>
      <AboutUsVideo />
      <div className="max-w-[1000px] mx-auto mb-5">
        <h1 className="text-[32px] text-left font-bold uppercase text-gray-700 pb-2">
          Problem Statement
        </h1>
        <p className="pb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut facere ea,
          rerum quo sunt cum pariatur consectetur voluptatibus ratione
          voluptatem voluptates, perferendis quaerat vero? Obcaecati, in quidem?
          Provident nobis libero voluptate itaque inventore fugiat iste
          consectetur quod enim veniam, aspernatur nulla dolores maxime dicta!
          Porro voluptates molestias impedit incidunt natus!
        </p>
        <h1 className="text-[32px] text-left font-bold uppercase text-gray-700 pb-2">
          How we are solving the problem?
        </h1>
        <p className="pb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sunt,
          nemo repellat tempora asperiores pariatur quasi consequuntur ipsam
          fugiat facilis quia illum, enim impedit ea sit ipsa? Totam illum non
          neque voluptatum excepturi officiis omnis itaque, incidunt distinctio
          cupiditate iure. Fugiat cum aspernatur quis? Dolores dicta totam
          officia quo excepturi.
        </p>
        <div>
          <h1 className="text-[32px] text-left font-bold uppercase text-gray-700 pb-2">
            Tech Stack Used
          </h1>
          <div className="flex justify-around">
            <div>
              <h1 className="text-[24px] text-left font-bold uppercase text-gray-700 pd-8">
                Frontend
              </h1>
              <ul>
                <li className="flex items-center">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/tailwind_css.png"
                    alt="tailwind_css"
                  />
                  Tailwind CSS
                </li>
                <li className="flex items-center">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png"
                    alt="external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo"
                  />
                  React Js
                </li>
                <li className="flex items-center">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/redux.png"
                    alt="redux"
                  />
                  Redux
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-[24px] text-left font-bold uppercase text-gray-700 pd-8">
                Backend
              </h1>
              <ul>
                <li className="flex items-center">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/nodejs.png"
                    alt="nodejs"
                  />
                  Node Js
                </li>
                <li className="flex items-center">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/ios/50/express-js.png"
                    alt="express-js"
                  />
                  Express Js
                </li>
                <li className="flex items-center">
                  <img
                    width="32"
                    height="32"
                    src="https://img.icons8.com/color/48/mongo-db.png"
                    alt="mongo-db"
                  />
                  MongoDB
                </li>
              </ul>
            </div>
          </div>
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
        <div className="md:flex md:flex-row justify-center items-center md:items-end">
          <div className="inline-block scale-150 my-20 mx-20">
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
        <div className="flex flex-col md:scale-110 md:py-10 lg:scale-100 lg:flex-row justify-evenly items-center lg:items-end ">
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Frontend Developers
            </h3>
            <div className="flex">
              <TeamCard
                name="Shashank Sharma"
                image={vishal}
                link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
              />
              <TeamCard
                name="Surya M.U"
                image={surya}
                link="https://linkedin.com/in/suryamu7"
              />
            </div>
          </div>
          <div className="inline-block items-bottom">
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
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
            <h3 className="text-24 text-center font-bold text-gray-700 py-2">
              Backend Developers
            </h3>
            <div className="flex">
              <TeamCard
                name="Akkilesh A"
                image={akkilesh}
                link="https://www.linkedin.com/in/akkilesh-a-620561275/"
              />
              <TeamCard
                name="Aditya"
                image={vishal}
                link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
