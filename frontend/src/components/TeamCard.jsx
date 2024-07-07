// Default profile pic
//import { defaultpfp } from "../../assets";

const TeamCard = ({ image, name, link }) => {
  return (
    <div className="w-40 h-auto border bg-white rounded-lg shadow-lg p-3 flex flex-col items-center m-3">
      <img
        src={image}
        alt="profile picture"
        className="w-24 h-24 rounded-full mb-2 object-cover object-end"
      />
      <div
        className="text-sm font-semibold text-center truncate"
        style={{ maxWidth: "140px" }}
      >
        {name}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ maxWidth: "140px" }}
      >
        <div className="flex items-center justify-center bg-[#0288D1] text-white py-1 px-2 rounded text-xs mt-2">
          LinkedIn
          <img
            src="https://img.icons8.com/color/48/linkedin.png"
            alt="LinkedIn"
            className="w-4 h-4 ml-1"
          />
        </div>
      </a>
    </div>
  );
};

export default TeamCard;
