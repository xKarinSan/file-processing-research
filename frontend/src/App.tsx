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
        await axios
            .get(
                `http://localhost:3000/files/zip/${githubUsername}/${githubReponame}`,
                {
                    headers: {
                        authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then((res) => {
                return res.data;
            })
            .then((data) => {
                console.log("data", data);
            });
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
