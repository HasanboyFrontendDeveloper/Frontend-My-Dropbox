import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { FolderItem, Loader } from "../";
import "../../firebase/firebase";
import { fileDB } from "../../firebase/firebase";

import "./Home.css";
import { Route, Routes } from "react-router-dom";
import {
  deleteObject,
  listAll,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

const Home = ({ folder }) => {
  const [fileList, setFileList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState("");
  const currentUser = getAuth().currentUser;
  const userEmail = currentUser?.email;
  const username = currentUser?.displayName
  

  const getFolderRef = () => {
    if (!folder) {
      return ref(fileDB, `${userEmail}/`);
    } else {
      return folder;
    }
  };

  const createFolder = async (folderName) => {
    setIsLoading(true);
    const newDir = ref(getFolderRef(), `${folderName}/`);
    const ghostFile = ref(newDir, ".ghostFile");
    await uploadString(ghostFile, "");
    fetchData();
    setIsLoading(false);
  };
  const uploadFile = async (file, fileName) => {
    setIsLoading(true);
    const files = ref(getFolderRef(), fileName);
    uploadBytes(files, file)
      .then(() => {
        fetchData();
      })
      .catch(() => setAlert("Error"));
  };

  const fetchData = async () => {
    try {
      const listData = await listAll(getFolderRef());
      setFileList(listData.items);
      setFolderList(listData.prefixes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAlert("");
    }, 6000);
  }, [alert]);

  const deleteHadler = (name) => {
    const objectRef = ref(getFolderRef(), name);
    deleteObject(objectRef)
      .then(() => {
        setAlert("Deleted!");
        fetchData();
      })
      .catch(() => setAlert("Delete Error"));
  };

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route
          index
          element={
            <FolderItem
              folder={folder}
              folderList={folderList}
              fileList={fileList}
              createFolder={createFolder}
              username={username}
              userEmail={userEmail}
              fetchData={fetchData}
              uploadFile={uploadFile}
              deleteHadler={deleteHadler}
              alert={alert}
              setAlert={setAlert}
            />
          }
        />
        {folderList.map((folder) => (
          <Route
            key={folder.name}
            path={`/${folder.name}/*`}
            element={<Home folder={folder} />}
          />
        ))}
      </Routes>
    </>
  );
};

export default Home;
