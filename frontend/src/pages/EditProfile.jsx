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
        <UpdateHostelerDayScholarForm />
        <UpdatePasswordForm />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default EditProfile;
