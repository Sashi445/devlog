import React from "react";
import { Link } from "react-router-dom";

const errorPage = ({ message }) => {
  return (
    <div className="d-flex flex-row align-items-center" style={{height:"80vh"}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <h1>{message}</h1>
            <p className="font-monospace my-3">
              The page you are looking for might have been temporarily
              unavailable!!
            </p>
            <Link className="btn btn-primary" to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
errorPage.defaultProps = {
  message: "404-Not Found",
};
export default errorPage;
