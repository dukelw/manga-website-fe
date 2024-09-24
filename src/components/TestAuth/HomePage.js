import LoginWithGoogle from "../Auth/LoginWithGoogle";
import LoginWithFacebook from "../Auth/LoginWithFacebook";

function HomePage() {
  return (
    <div>
      <LoginWithGoogle />
      <LoginWithFacebook />
    </div>
  );
}

export default HomePage;
