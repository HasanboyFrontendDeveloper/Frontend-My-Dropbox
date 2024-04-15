import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert, ChangeProfile, CreateModal, Sidebar, UploadModal } from "../";
import { getDownloadURL } from "firebase/storage";

import "./FolderItem.css";

const FolderItem = ({
  folderList,
  fileList,
  createFolder,
  username,
  userEmail,
  folder,
  uploadFile,
  deleteHadler,
  alert,
  setAlert,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [createFolderName, setCreateFolderName] = useState("");
  const [showDropdown, setShowDropdown] = useState({ fullPath: "", type: "" });
  const [fileLink, setFileLink] = useState("");

  const haldeSubmit = () => {
    createFolder(createFolderName);
  };

  const toggleDropdown = (id) => {
    if (
      showDropdown.fullPath === id.fullPath &&
      showDropdown.type === id.type
    ) {
      setShowDropdown("");
    } else {
      setShowDropdown(id);
    }
  };

  const downloadFile = async (file) => {
    const link = await getDownloadURL(file);
    setFileLink(link);
  };

  const copyLinkHadler = () => {
    navigator.clipboard.writeText(fileLink).then(() => setAlert("Copied!"));
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <a href="#">DropBox</a>
            </div>
            <div
              className="user"
              onClick={() => setShowSidebar((prev) => !prev)}
            >
              <span>{username && username}</span>
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className="header-side ">
          <div>
            <p>
              Home{folder && `${folder.fullPath.split(userEmail).slice(1)}`}
            </p>
          </div>
          <div className="buttons">
            <button
              className="create button"
              onClick={() => setShowModal("create")}
            >
              Create
            </button>
            <button
              className="upload button"
              onClick={() => setShowModal("upload")}
            >
              Upload
            </button>
          </div>

          {showSidebar && <Sidebar setShowModal={setShowModal} />}
        </div>
      </div>
      <div className="container">
        <Link to={".."} className="arrow-back">
          <i className="fa-solid fa-arrow-left icon"></i>
        </Link>
        <table className="table">
          <tbody className="folder">
            {folderList.map((folder) => (
              <tr key={folder.fullPath}>
                <td className="icon">
                  <i className="fa-solid fa-folder"></i>
                </td>
                <td className="folder-td button">
                  <Link to={`${folder.name}`}> {folder.name}</Link>
                </td>

                <td className="icon"></td>
              </tr>
            ))}
            {fileList &&
              fileList.map(
                (file) =>
                  !file.name.startsWith(".") && (
                    <tr key={file.fullPath}>
                      <td className="icon">
                        <i className="fa-solid fa-file"></i>
                      </td>
                      <td className="folder-td button">
                        <Link> {file.name}</Link>
                      </td>

                      <td className="icon" onClick={() => downloadFile(file)}>
                        <i
                          className="fa-solid fa-list list-icon"
                          onClick={() =>
                            toggleDropdown({
                              fullPath: file.fullPath,
                              type: "file",
                            })
                          }
                        ></i>
                        {showDropdown.fullPath === file.fullPath &&
                          showDropdown.type === "file" && (
                            <div className="dropdown">
                              <a href={`${fileLink}`} target="_blank">
                                Open
                              </a>
                              <h3 onClick={() => copyLinkHadler()}>
                                Copy link
                              </h3>
                              <h3 onClick={() => deleteHadler(file?.name)}>
                                Delete
                              </h3>
                            </div>
                          )}
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
      {showModal === "create" && (
        <CreateModal
          show={"show"}
          setShow={setShowModal}
          createFolderName={createFolderName}
          setCreateFolderName={setCreateFolderName}
          haldeSubmit={haldeSubmit}
        />
      )}
      {showModal === "upload" && (
        <UploadModal
          show={"show"}
          setShow={setShowModal}
          uploadFile={uploadFile}
        />
      )}
      {showModal === "changeProfile" && (
        <ChangeProfile show={"show"} setShow={setShowModal} setAlert={setAlert} />
      )}
      {alert && <Alert>{alert}</Alert>}
    </>
  );

  // return <div className="folder">
  //   {folderList.map(folder => (<Link to={`/${folder.fullPath}`} > {folder.name}</Link>))}
  // </div>;
};

export default FolderItem;
