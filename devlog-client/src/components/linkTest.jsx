import { Link } from "react-router-dom";
import { useState } from "react";
import store from "../app/store";
import snackBarBtn from "../features/snackbar/action";

const CardTemplate = (props) => {
  return (
    <div className="card shadow-3 col-lg-3 col m-2">
      <div className="card-body">{props.children}</div>
    </div>
  );
};

const LinkTest = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="container">
      <div>
        <h4>Link Testing Page</h4>
      </div>
      <div className="row align-items-stretch">
        <CardTemplate>
          <h4>User Info Testing</h4>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Link to={`/info/${username}`}>Jump to</Link>
        </CardTemplate>
        <CardTemplate>
          <h4>404 page link</h4>
          <Link to="/404">Jump to</Link>
        </CardTemplate>
        <CardTemplate>
          <button
            className="btn btn-primary"
            onClick={() =>
              snackBarBtn("This is a test snackbar This is a test snackba This is a test snackbarr","info")
            }
          >
            SnackBar Test
          </button>
        </CardTemplate>
      </div>
    </div>
  );
};

export default LinkTest;
