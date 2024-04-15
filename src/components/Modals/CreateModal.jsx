import "./Modals.css";

const CreateModal = ({
  show,
  setShow,
  createFolderName,
  setCreateFolderName,
  haldeSubmit,
}) => {
  const closeHandler = (e) => {
    if (e.target.className === "create-box show") {
      setShow("hide");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    haldeSubmit();
    setShow("hide");
    setCreateFolderName("");
  };

  console.log('create');

  return (
    <div className={`create-box ${show}`} onClick={closeHandler}>
      <div className="create-field">
        <div className="wrapper">
          <h2>Create New Folder</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Folder name"
              className="input"
              onChange={(e) => setCreateFolderName(e.target.value)}
              value={createFolderName}
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

export default CreateModal;
