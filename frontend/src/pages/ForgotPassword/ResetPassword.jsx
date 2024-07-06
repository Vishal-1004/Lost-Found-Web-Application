import { useSelector } from "react-redux";

const ResetPassword = () => {
  const email = useSelector((state) => state.resetPasswordState.userEmail);

  return (
    <div>
      <h1>Verify OTP</h1>
      <p>Email: {email}</p>
      {/* Your component code */}
    </div>
  );
};

export default ResetPassword;
