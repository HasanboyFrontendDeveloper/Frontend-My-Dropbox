import {
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useForm } from "../../hooks";
import "./Modals.css";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const ChangeProfile = ({ show, setShow, setAlert }) => {
  const [value, setValue] = useForm(initialState);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const closeHandler = (e) => {
    if (e.target.className === "create-box show") {
      setShow("hide");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(currentUser, { displayName: value.username })
      .then(() => window.location.reload())
      .catch(() => setAlert('Failure to change Name'));
  };

  console.log(value);

  return (
    <div className={`create-box ${show}`} onClick={closeHandler}>
      <div className="create-field">
        <div className="wrapper">
          <h2>Change Name</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="input"
              name="username"
              value={value.username}
              onChange={setValue}
            />

            <div className="submit-btn-box">
              <button className="submit-btn" type="submit">
                <span>Submit</span>
              </button>
            </div>
          </form>
          <button className="close" onClick={() => setShow("hide")}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
