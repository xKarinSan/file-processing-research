import { useState } from "react";
import "./App.css";
// import axios from "axios";

function App() {
    const [authToken, setAuthToken] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [githubReponame, setGithubRepoName] = useState("");

    const downloadRepo = async () => {
        if (!authToken || !githubUsername || !githubReponame) {
            alert("Please fill all of them.");
            return;
        }
        await fetch(
            `http://localhost:3000/files/zip/${githubUsername}/${githubReponame}`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then(async (res) => {
                if (!res.ok) {
                    alert("Something went wrong!");
                    return;
                }
                const reader = res.body?.getReader();
                const dataArr: Uint8Array[] = [];
                while (true) {
                    if (reader) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        console.log(value);
                        dataArr.push(value);
                    }
                }
                const url = window.URL.createObjectURL(new Blob(dataArr));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${githubReponame}.zip`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((e) => {
                alert("Something went wrong!");
                return;
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
