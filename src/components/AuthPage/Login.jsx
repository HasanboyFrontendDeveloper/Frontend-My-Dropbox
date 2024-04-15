import { Link } from "react-router-dom";
import { Input } from "../../ui";
import { useForm } from "../../hooks";
import "../../firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import "./AuthPage.css";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [value, setValue] = useForm(initialState);
  const [wrongMsg, setWrongMsg] = useState(false);

  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, value.email, value.password).catch(() =>
      setWrongMsg(true)
    );
  };

  return (
    <div className="auth-page">
      <div className="wrapper">
        <div className="login_box">
          <div className="login-header">
            <span>Login</span>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              id={"email"}
              name={"email"}
              icon={"fa-regular fa-envelope"}
              label={"Email"}
              value={value.email}
              setValue={setValue}
            />
            <Input
              id={"pass"}
              name={"password"}
              icon={"fa-solid fa-lock"}
              type={"password"}
              label={"Password"}
              value={value.password}
              setValue={setValue}
            />
            {wrongMsg && (
              <div className="wrongMsgBox">
                <span className="wrongMsg">
                  Your email or password is Wrong
                </span>
              </div>
            )}

            <div className="register">
              <span>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </div>

            <div className="input_box">
              <button type="submit" className="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
