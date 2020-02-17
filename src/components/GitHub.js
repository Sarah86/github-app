import React, { useState, useEffect } from "react"
import axios from "axios" //Guaranteed compatibility between browsers
import { Form, Button, Card, Container, Jumbotron } from 'react-bootstrap'

const GitHub = () => {

    const [my_token, setMy_Token] = useState("");
    const [user, setUser] = useState("Sarah86");
    const [repo, setRepo] = useState("github-app");
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
            <Jumbotron fluid>
            <Container>
                <h1>Github data puller</h1>
                <p>
                This is a simple web app to pull data from a Github repo.
                </p>
            </Container>
            </Jumbotron>
            <Container style={{marginBottom: '3em'}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicToken">
                        <Form.Label>Token</Form.Label>
                        <Form.Control type="text" value={my_token} onChange={(event) => setMy_Token(event.target.value)} placeholder="Enter your token" />
                        <Form.Text className="text-muted">
                            For use this app you have to get your token on <a href="https://github.com/settings/tokens" target="_blank">https://github.com/settings/tokens</a>
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicUser">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="text" value={user} onChange={(event) => setUser(event.target.value)} placeholder="The username you want to pull data" />
                    </Form.Group>
                    <Form.Group controlId="formBasicRepo">
                        <Form.Label>Repository</Form.Label>
                        <Form.Control type="text" value={repo} onChange={(event) => setRepo(event.target.value)} placeholder="Repository slug" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
            </Button>
                </Form>

            </Container>


            <Container>
                {commits.map((commit, i) => (
                    <Card key={i} style={{ marginBottom: '1em' }}>
                        <Card.Header>Commit n° {i}</Card.Header>
                        <Card.Body>
                            <Card.Title>{commit.commit.author.name}</Card.Title>
                            <Card.Text>
                                <ul>
                                    <li>
                                        <strong>When:</strong> {commit.commit.author.date}</li>
                                    <li><strong>Message:</strong> {commit.commit.message}</li>

                                    <li>
                                        <strong>Sha:</strong> {commit.sha}
                                    </li>
                                </ul>
                                <div>
                                    <Button variant="primary"
                                        onClick={() => getTreeList(commit.sha)}>Modified Files</Button>
                                    <Container style={{ margin: '1em' }}>
                                        <ul style={{ listStyle: 'circle' }}>
                                            {
                                                (commit.sha === tree_sha.sha)
                                                &&
                                                (tree_sha.tree.map((file, i) => (
                                                    <li key={i}>{file.path}</li>
                                                )))
                                            }
                                        </ul>
                                    </Container>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>

    )

}

export default GitHub