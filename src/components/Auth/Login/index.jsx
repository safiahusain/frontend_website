import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginLayout from "./LoginLayout";
import LoginWidget from "./LoginWidget";
function Login({ isLayout = true }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [imgThumb, setImgThumb] = useState(null);
  useEffect(() => {
    if (websiteSetup) {
      setImgThumb(websiteSetup.payload.login_page_image);
    }
  }, [websiteSetup]);
  if (isLayout) {
    return (
      <LoginLayout imgThumb={imgThumb && imgThumb.image}>
        <LoginWidget />
      </LoginLayout>
    );
  } else {
    return <LoginLayout />;
  }
}
export default Login;
