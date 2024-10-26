import { Router, Request, Response } from "express";
import axios from "axios";
const router = Router();

router.get("/zip/:username/:repo_name", async (req: Request, res: Response) => {
    try {
        const { authorization } = req.headers;
        const { username, repo_name } = req.params;

        const github_res = await axios.get(
            `https://api.github.com/repos/${username}/${repo_name}/zipball/`,
            {
                headers: {
                    Authorization: `${authorization}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
                responseType: "stream",
            }
        );
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename=${repo_name}.zip`);
        github_res.data.pipe(res);
    } catch (e) {
        console.log("E", e);
        res.status(500).json({
            message: "Something went wrong :(",
        });
    }
});

export default router;
