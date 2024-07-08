import { ourTeamBackgound, vishal } from "../assets";
import { TeamCard } from "../components";

const OurTeam = () => {
  return (
    <div
      className="py-16 sm:py-8"
      style={{
        backgroundImage: `url(${ourTeamBackgound})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-[64px] text-center font-bold uppercase text-gray-700 pd-8">
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
              name="Surya"
              image={vishal}
              link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
            />
          </div>
        </div>
        <div className="inline-block items-bottom">
          <h3 className="text-24 text-center font-bold text-gray-700 py-2">
            Backend Developers
          </h3>
          <div className="flex">
            <TeamCard
              name="Akkhilesh"
              image={vishal}
              link="https://www.linkedin.com/in/vishal-kumar-yadav-8085a3232/"
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
  );
};

export default OurTeam;
