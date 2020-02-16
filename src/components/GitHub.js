import React, { useState, useEffect } from "react"
import axios from "axios" //Guaranteed compatibility between browsers

const GitHub = () => {

    const user = "Sarah86";
    const repo = "cop";
    const my_token = "3633af72eda1cb9816106830f0b22320a5028e45"

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


    useEffect(() => {
        async function getCommits() {
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


        getCommits();

    }, [])

    return (
        <div>
            <h1>Github</h1>
            <h2>User: {user} </h2>
            <h3>Repository: {repo} </h3>
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
                                        (tree_sha.tree.map(file => (
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