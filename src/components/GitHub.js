import React, { useState, useEffect } from "react"
import axios from "axios" //Guaranteed compatibility between browsers

const GitHub = () => {

    const user = "Sarah86";
    const repo = "mandetta";
    const my_token = "3633af72eda1cb9816106830f0b22320a5028e45"

    const [commits, setCommits] = useState([]);

    const [shaList, setShaList] = useState([]);


    const [tree_sha, setTree_sha] = useState([]);

    const [uniqueSha, setUniqueSha] = useState(null);

    async function getTreeList(uniqueSha) {

        console.log(uniqueSha)

        await axios.get(`https://api.github.com/repos/${user}/${repo}/git/trees/${uniqueSha}`, {
            'headers': {
                'Authorization': `token ${my_token}`
            }
            })
            .then(response => {
                setTree_sha(response.data.tree);
                console.log(tree_sha)
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
                const concatSha = response.data.map(commit => commit.sha);
                setShaList(concatSha);
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
                        <li>Author: <strong>{commit.commit.author.name}</strong></li>
                        <li onClick={() => {
                            setUniqueSha(commit.sha);
                            getTreeList(uniqueSha);
                            }}
                            
                            >
                            Sha: {commit.sha}
                        </li>
                        <li>
                            Modified Files
                            {/* <ul>
                                {tree_sha.map(file => {
                                   <li> {file.path} </li>  
                                })}                       
                            </ul> */}
                        </li>
                    </ul>
                </div>
            ))}
            {/* <ul>
                {tree_sha.map(file => {
                    <li> {file.path} </li>  
                })}                       
            </ul> */}
        </div>
    </div>

)

}

export default GitHub