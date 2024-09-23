import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginWithGoogle from "../Auth/LoginWithGoogle";
import LoginWithFacebook from "../Auth/LoginWithFacebook";

function HomePage() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
      <LoginWithGoogle />
      <LoginWithFacebook />
    </GoogleOAuthProvider>
  );
}

export default HomePage;
