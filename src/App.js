// TODO: add css descriptors
import { useEffect, useState } from 'react';
import './App.css';

// Components must always be PURE

function ProjectRow({ project }) {

    return (
        <tr>
            <td>{project.title}</td>
            <td>{project.cost}</td>
            <td>{project.duration_days}</td>
            <td>{project.description}</td>
        </tr>
    )
}

function ProjectTableHeader({ headers }) {

    const headerElements = headers.map(( header ) => <th scope="col" key={header}>{header}</th>)

    return (
        <thead>
            <tr>
                {headerElements} 
            </tr>
        </thead>
    )
}

function ProjectTable({ projects }) {

    const headers = ["Title", "Estimated Cost (USD)", "Estimated Duration (Days)", "Description"]
    const projectRowElements = projects.map(( project ) => <ProjectRow key={project.title} project={project} />)

    return (
        <table>
            <ProjectTableHeader headers={headers} />
            <tbody>
                {projectRowElements} 
            </tbody>
        </table>
    )
}

function NewProjectButton() {

    // TODO: on click open new project modal
    return (
        <div className="new-project-button-container">
            <button className="new-project-button" type="button" onClick={() => alert("You clicked the New Project button!")}>New Project</button>
        </div>
    )
}

function App() {

    const [projects, setProjects] = useState([])

    // TODO: this should go somewhere else to improve performance, make a button with filters to load projects?
    useEffect(() => {
        const uri = "http://localhost:8080/projects"
        
        fetch(uri, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.log(err)) // TODO: error handling
    }, [])

    return (
        <div className="App">
            <h1 className="page-header">Your Home Improvement Projects</h1>
            <ProjectTable projects={projects}/>
            <NewProjectButton />
        </div>
    );
}

export default App;

/*
function NewProjectForm() {

    const [ title, setTitle ] = useState('');
    const [ cost, setCost ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ description, setDescription ] = useState('');
    const postData = () => {
        const body = {
            title: title,
            duration_days: Number(duration),
            cost: Number(cost),
            description: description,
        }        

        const uri = "http://localhost:8080/projects"
        fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((res) => {
            console.log(res.status, res.json());
        })
    }

    return (
        <Form id="new-project-form">
            <Form.Field>
                <label>Project Title</label>
                <input type='text' maxLength='25' placeholder='Project Title' onChange={(e) => setTitle(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Estimated Cost (USD)</label>
                <input type="number" placeholder='Estimated Cost' onChange={(e) => setCost(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Estimated Duration (Days)</label>
                <input type="number" placeholder='Estimated Duration' onChange={(e) => setDuration(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <textarea name="description" rows="10" cols="25" onChange={(e) => setDescription(e.target.value)}></textarea>
            </Form.Field>
            <Button type="submit" onClick={postData}>Create Project</Button>
        </Form>
    )
}
*/

