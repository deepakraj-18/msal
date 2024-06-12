// Login.js
import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../Helpers/authConfig';
import { CreateFolder, GetDocument, GetItems, GetList, UploadFile } from '../../Service/ListService';

const Login = () => {
    const { instance } = useMsal();
    const [directoryList, setDirectoryList] = useState([]);
    const [directory, setDirectory] = useState([]);
    const [folder, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");
    const [newFolderName, setNewFolderName] = useState('');
    const [file, setFile] = useState(null);

    const handleLogin = () => {
        instance.loginPopup(loginRequest)
            .then((res) => {
                console.log(res);
                localStorage.setItem("accessToken", res?.accessToken)
            })
            .catch(e => {
                console.error(e);
            });
    };

    const getList = async () => {
        await GetList(localStorage.getItem("accessToken"))
            .then((res) => {
                console.log(res);
            })
            .catch(e => {
                console.error(e);
            });
    };

    const getDocumentFolder = async () => {
        await GetDocument(localStorage.getItem("accessToken"))
            .then((res) => {
                console.log(res);
                if (res?.status === 200) {
                    setDirectoryList(res?.data?.value);
                }
            })
            .catch(e => {
                console.error(e);
            });
    };
    const getItems = async () => {
        await GetItems(directory?.id, localStorage.getItem("accessToken"))
            .then((res) => {
                console.log(res);
                if (res?.status === 200) {
                    setFolders(res?.data?.value)
                }
            })
            .catch(e => {
                console.error(e);
            });
    };

    const handleFileChange = (event) => {
        console.log(event.target.files);
        setFile(event.target.files[0]);
        // event.target.files.pop();
    };

    const createFolder = async () => {
        let folderId = ""
        if (directory == "") {
            alert("Select Directory name");
            return;
        }
        if (newFolderName == "") {
            alert("Enter FOlder name");
            return;
        }
        const folderDetails = {
            name: newFolderName,
            folder: {},
            "@microsoft.graph.conflictBehavior": "rename"
        };
        await CreateFolder(directory?.id, folderDetails, localStorage.getItem("accessToken"))
            .then((res) => {
                console.log(res?.data?.id);
                setSelectedFolder(res?.data?.id)
                folderId = res?.data?.id
            })
            .catch((err) => {
                console.log(err);
            })
        return folderId;
    };

    const uploadFile = async () => {
        console.log(file.name);
        let folderId = await createFolder()

        const uploadPath = `/drives/${directory?.id}/items/${folderId}:/${file.name}:/content`;
        console.log(uploadPath);
        await UploadFile(directory?.id, folderId, file, localStorage.getItem("accessToken"))
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                console.log(err);
            })

    };
    const handleDirectoryChange = async (directory) => {
        setDirectory(directory);
        getItems(directory?.id)

    }

    return (
        <>
            <button onClick={handleLogin}>
                Sign in with Microsoft
            </button>
            <button onClick={getList}>
                get list
            </button>
            <button onClick={getDocumentFolder}>
                get document
            </button>
            <button onClick={getItems}>
                get items
            </button>
            <br></br>
            <input type='text' placeholder='Enter Folder Name' value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)}></input>
            <button onClick={createFolder}>
                Create Folder
            </button>
            <br></br>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload File</button>
            <hr></hr>
            <h4>Document Library : <span>{directoryList?.length}</span></h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {directoryList?.length !== 0 &&
                    directoryList?.map((_, index) => {
                        return (<div key={index} style={{ border: "1px solid black", padding: 5, margin: 5, cursor: "pointer" }}>
                            <p style={{ color: directory?.id === _?.id ? "red" : "black", margin: 0 }} onClick={() => handleDirectoryChange(_)} >{_?.name}</p>
                        </div>)
                    })}
            </div>
            <hr></hr>
            <h4>Folder : {folder?.length}</h4>
            <ol>
                {folder.length !== 0 &&
                    folder?.map((_, index) => {
                        return (
                            <div key={index}>

                                <li>{_?.name}-{_?.id}</li>

                            </div>
                        )
                    })
                }
            </ol>

        </>
    );
};

export default Login;
