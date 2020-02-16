import React, { useState, useEffect } from "react"
import axios from "axios" //Guaranteed compatibility between browsers

const GitHub = () => {

    const [user, setUser] = useState("Sarah86");

    const [repo, setRepo] = useState("github-app");

    const my_token = "f6bb3326eca34b15c94d53eb7db931786b6f2469"

    const [commits, setCommits] = useState([]);

    const [tree_sha, setTree_sha] = useState("");

    function getTreeList(shaNumber) {

        axios.get(`https://api.github.com/repos/${user}/${repo}/git/trees/${shaNumber}`, {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        })
            .then(response => {
                const shaTree = response.data
                setTree_sha(shaTree);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    async function getCommits(user, repo) {
        await axios.get(`https://api.github.com/repos/${user}/${repo}/commits`, {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        })
            .then(response => {
                console.log(response);
                setCommits(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    };

    function handleSubmit(event) {
        event.preventDefault();
        getCommits(user, repo);
    }

    
    useEffect(() => {


    }, [])

    return (
        <div>
            <h1>Github</h1>
            <form onSubmit={handleSubmit}>
                <label>User:
                    <input type="text" value={user} onChange={(event) => setUser(event.target.value)}/>
                </label>
                <label>Repo:
                    <input type="text" value={repo} onChange={(event) => setRepo(event.target.value)}/>
                </label>
                 <input type="submit" value="Enviar" />
            </form>
            
            <div>
                {commits.map((commit, i) => (
                    <div key={i}>
                        <h3>Commit n° {i}</h3>
                        <ul>
                            <li>
                                <strong>Author:</strong> {commit.commit.author.name}
                            </li>
                            <li>
                                <strong>When:</strong> {commit.commit.author.date}</li>
                            <li><strong>Message:</strong> {commit.commit.message}</li>

                            <li>
                                <strong>Sha:</strong> {commit.sha}
                            </li>
                            <li onClick={() => getTreeList(commit.sha)}
                                style={{cursor: 'pointer'}}>
                                <strong>Modified Files + </strong>
                                <ul>
                                    
                                    {
                                        (commit.sha === tree_sha.sha)
                                        &&
                                        (tree_sha.tree.map((file,i) => (
                                            <li key={i}>{file.path}</li>
                                        )))
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>

    )

}

export default GitHub