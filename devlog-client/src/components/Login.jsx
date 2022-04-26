import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import store from "./../app/store";
import serverConfig from "../app/ServerConfig";
import { loginUser } from "./../features/user/action";
import Image from "./LandingComponents/Image";
import { BsGithub } from "react-icons/bs";

const loginUserHelper = async (code, history) => {
  const proxyUrl = serverConfig.proxyUrl;

  try {
    const response = await axios.post(proxyUrl, { code: code });

    const { accessToken, exists, user } = response.data;

    console.log(accessToken);

    console.log("EXISTS : ", exists);

    store.dispatch(loginUser(accessToken, user));

    history.replace("/");
  } catch (e) {
    alert(e.message);
  }
};

const Login = () => {
  
  const history = useHistory();

  const redirectUrl = "http://localhost/login";


  const clientId = process.env.REACT_APP_CLIENT_ID;

  const search = useLocation().search;

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");

    if (code) {
      loginUserHelper(code, history);
    }
  }, []);

  return (
    <div className="container">
      <div className="card mb-3 border-0 py-10">
        <div className="row g-0 align-items-center">
          <Image
            src={
              "https://res.cloudinary.com/dcjfrnxqn/image/upload/v1629747751/landing_wllh5t.jpg"
            }
          ></Image>
          <div className="col-lg-6 col-sm-12 justify-content-center">
            <div className="container-fluid py-5 ">
              <div className="text-dark text-xl mb-3">
                <h2><span className="font-bolder">&lt;Devlog</span>🚀
                  <span className="font-bolder">/&gt;</span></h2>
              </div>
              <p className="mb-3" style={{ fontSize: "1.2rem" }}>
                <strong className="text-muted py-2">
                  Devlog is a platform for software developers and content creators. It helps developers to collaborate better.  It helps you in sharing the information and updates about your projects. Devlog helps you to form communities around your projects and provides a space for you to express better.
                </strong>
              </p>
              <a
                className="btn btn-secondary"
                href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=user%20repo`}
              >
                <div className="d-flex align-items-center justify-content-around">
                  <BsGithub /><span className="mx-2">Sign Up With GitHub</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
