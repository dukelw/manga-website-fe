import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { signupAnotherWay } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <LoginSocialGoogle
      client_id={process.env.REACT_APP_OAUTH_CLIENT_ID}
      onResolve={async ({ provider, data }) => {
        const { email, picture, name } = data;
        await signupAnotherWay(
          {
            email,
            avatar: picture,
            name,
          },
          dispatch,
          navigate
        );
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
}

export default Login;
