import React, { useState, useEffect } from "react"
import axios from "axios" //Guaranteed compatibility between browsers

const GitHub = () => {

    const user = "Sarah86";
    const repo = "mandetta";
    const my_token = "3633af72eda1cb9816106830f0b22320a5028e45"

    const [commits, setCommits] = useState([]);

    const [shaList, setShaList] = useState([]);

    const [tree_sha, setTree_sha] = useState([]);



    const getCommits = () => {
        axios.get(`https://api.github.com/repos/${user}/${repo}/commits`, {
            'headers': {
                'Authorization': `token ${my_token}`
            }
        })
            .then(response => {
                console.log(response);
                setCommits(response.data);
                const concatSha = response.data.map(commit => commit.sha)
                setShaList(concatSha)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getTreeList = () => {
    
    //    for (const sha of setShaList) {
    //        console.log(sha)
    //    }

        // axios.get(`https://api.github.com/repos/${user}/${repo}/git/trees/${sha}`, {
        // 'headers': {
        //     'Authorization': `token ${my_token}`
        // }
        // })
        // .then(response => {
        //     console.log(response);
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }

    useEffect(() => {
        getCommits();
        getTreeList();
    }, [setCommits])

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
                            <li>Author: <strong>{commit.commit.author.name}</strong></li>
                            <li>
                                Sha: {commit.sha}
                            </li>
                            <li>
                                Tree: {}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>

    )

}

export default GitHub