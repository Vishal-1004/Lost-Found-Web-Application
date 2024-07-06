import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div>
      <h1>Verify OTP</h1>
      <p>Email: {email}</p>
      {/* Your component code */}
    </div>
  );
};

export default ResetPassword;
