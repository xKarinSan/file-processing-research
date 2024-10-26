import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [authToken, setAuthToken] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [githubReponame, setGithubRepoName] = useState("");

    const downloadRepo = async () => {
        if (!authToken || !githubUsername || !githubReponame) {
            alert("Please fill all of them.");
            return;
        }
        const res = await axios.get(
            `http://localhost:3000/files/zip/${githubUsername}/${githubReponame}`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
                responseType: "blob",
            }
        );
        // cget the reader
        // const reader = res.data.pipeThrough(new TextDecoderStream()).getReader()
        // while(true)
        //   {
        //     const {value,done} = await reader.read()
        //     if (done){
        //       break;
        //     }
        //   }

        // Create a URL for the blob and trigger a download
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${githubReponame}.zip`); // Specify the file name
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    return (
        <>
            <h3>Github repo downloader</h3>
            <label>Github Auth Token:</label>
            <input
                value={authToken}
                onChange={(e) => {
                    setAuthToken(e.target.value);
                }}
                placeholder="Github Auth Token"
            />
            <label>Github Username:</label>
            <input
                value={githubUsername}
                onChange={(e) => {
                    setGithubUsername(e.target.value);
                }}
                placeholder="Github Username"
            />
            <label>Github Repo:</label>
            <input
                value={githubReponame}
                onChange={(e) => {
                    setGithubRepoName(e.target.value);
                }}
                placeholder="Github Repo name"
            />
            <button onClick={downloadRepo}>Download Repo</button>
        </>
    );
}

export default App;
