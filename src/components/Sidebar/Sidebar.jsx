import { getAuth, signOut } from "firebase/auth";
import "./Sidebar.css";

const Sidebar = ({setShowModal}) => {
  const auth = getAuth();
  const currentUser = auth.currentUser

  const logoutHandler = () => {
    signOut(auth);
  };

  return (
    <div className="sidebar">
      <h3>Username: <span>{currentUser?.displayName}</span></h3>
      <h3>Email: <span>{currentUser?.email}</span></h3>
      <button className="button" onClick={() => setShowModal('changeProfile')}>Change Name</button>
      <button onClick={logoutHandler} className="button">
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
