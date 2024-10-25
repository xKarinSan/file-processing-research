import { Router, Request, Response } from "express";
import axios from "axios";
const router = Router();

router.get("/zip/:username/:repo_name", async (req: Request, res: Response) => {
    try {
        const { authorization } = req.headers;
        const { username, repo_name } = req.params;
        console.log(`authorization: ${authorization}`);

        const github_req = await axios.get(
            `https://api.github.com/repos/${username}/${repo_name}/zipball/`,
            {
                headers: {
                    "Authorization": `${authorization}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
            }
        );
        console.log(`github_req: ${github_req}`);
        res.status(200).json({
            message: "OK",
        });
    } catch (e) {
        console.log("E", e);
        res.status(500).json({
            message: "Something went wrong :(",
        });
    }
});

export default router;
