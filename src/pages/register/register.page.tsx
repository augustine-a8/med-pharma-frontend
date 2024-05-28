import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import "./register.style.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { ApolloError, useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../api";
import { ClipLoader } from "react-spinners";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    variables: { email, password, name },
  });

  const navigate = useNavigate();
  const { useSignIn } = useAuth();

  return (
    <div className="auth-container">
      <h3>Register</h3>
      <div className="auth-img-box">
        <img src="/auth-user.png" alt="Auth user image" />
      </div>
      {error !== "" && (
        <div className="error-msg">
          <p>{error}</p>
        </div>
      )}
      <form action="#" className="auth-form">
        <div className="input-box">
          <FontAwesomeIcon icon={faUser} />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="login-btn-box">
          <a
            href="#"
            className="login-btn"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              register({ variables: { email, password, name } })
                .then((data) => {
                  console.log(data.data.register);
                  localStorage.setItem(
                    "auth-token",
                    JSON.stringify({ token: data.data.register.token })
                  );
                  setEmail("");
                  setPassword("");
                  useSignIn(data.data.register.token);
                  navigate("/", { replace: true });
                })
                .catch((err: ApolloError) => {
                  console.log(err.graphQLErrors);
                  setError(err.message);
                });
            }}
          >
            {loading ? (
              <ClipLoader loading={loading} color="fff" size={25} />
            ) : (
              <p>Register</p>
            )}
          </a>
        </div>
      </form>
      <p className="cta">
        Already have an account? <a href="/login">Log In!</a>
      </p>
    </div>
  );
}
