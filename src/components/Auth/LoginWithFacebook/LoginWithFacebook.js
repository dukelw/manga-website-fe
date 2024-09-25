import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { signupAnotherWay } from "../../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginWithFacebook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <LoginSocialFacebook
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        onResolve={async (response) => {
          const profile = response.data;
          const { name, picture, userID } = profile;
          const email = userID + "@gmail.com";
          await signupAnotherWay(
            {
              email,
              avatar: picture.data.url,
              name,
            },
            dispatch,
            navigate
          );
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
}

export default LoginWithFacebook;
