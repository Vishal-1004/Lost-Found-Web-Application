import {
  DeleteAccount,
  UpdateHostelerDayScholarForm,
  UpdatePasswordForm,
  UpdatePhoneNumberForm,
} from "../components";

const EditProfile = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        Edit Profile
      </h2>

      <div className="space-y-10">
        <UpdatePhoneNumberForm />
        <hr className="my-2 mx-auto border-t-4 border-gray-300 w-[400px] md:w-[500px]" />
        <UpdateHostelerDayScholarForm />
        <hr className="my-2 mx-auto border-t-4 border-gray-300 w-[400px] md:w-[500px]" />
        <UpdatePasswordForm />
        <hr className="my-2 mx-auto border-t-4 border-gray-300 w-[400px] md:w-[500px]" />
        <DeleteAccount />
        <hr className="my-2 mx-auto border-t-4 border-gray-300 w-[400px] md:w-[500px]" />
      </div>
    </div>
  );
};

export default EditProfile;
