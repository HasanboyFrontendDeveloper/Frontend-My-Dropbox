import { Link } from "react-router-dom";
import { Input } from "../../ui";
import { useForm } from "../../hooks";
import "../../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";

import "./AuthPage.css";
import { addDoc, collection } from "firebase/firestore";
import { accountDB } from "../../firebase/firebase";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = ({createUserFolder}) => {
  const [value, setValue] = useForm(initialState);
  const [wrongMsg, setWrongMsg] = useState("");

  const auth = getAuth();

  const submitHandler = (e) => {
    e.preventDefault();
    if (value.password.length >= 6) {
      createUserWithEmailAndPassword(auth, value.email, value.password)
        .then(() => {
          setWrongMsg("");
          const accountRef = collection(accountDB, "account");
          addDoc(accountRef, { username: value.username, email: value.email });
          createUserFolder(value.email)
          updateProfile(auth.currentUser, { displayName: value.username })
        })
        .catch((error) => {
          setWrongMsg("Email is already taken");
          console.log(error);
        });
    } else {
      setWrongMsg("Password should be at least 6 characters ");
    }
  };

  return (
    <div className="auth-page">
      <div className="wrapper">
        <div className="login_box">
          <div className="login-header">
            <span>Register</span>
          </div>
          <form onSubmit={submitHandler}>
            <Input
              id={"user"}
              name={"username"}
              icon={"fa-regular fa-user"}
              label={"Username"}
              value={value.username}
              setValue={setValue}
            />
            <Input
              id={"email"}
              name={"email"}
              icon={"fa-regular fa-envelope"}
              type={"email"}
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
                <span className="wrongMsg">{wrongMsg}</span>
              </div>
            )}

            <div className="register">
              <span>
                Do you have an account? <Link to="/login">Login</Link>
              </span>
            </div>

            <div className="input_box">
              <button className="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
