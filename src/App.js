// TODO: add css descriptors
import { useEffect, useState } from 'react';
import './App.css';

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

    return (
        <button className="newProjectButton" onClick={() => alert("You want to create a new project!")}>
            New Project
        </button>
    )
}

function App() {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        const uri = "http://localhost:8080/projects"
        
        fetch(uri, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => setProjects(data))
        .catch((err) => console.log(err)) // TODO: error handling in the DOM?
    }, [])

    return (
        <div className="App">
            <div>
                <header>
                    <h1>Your Home Improvement Projects</h1>
                </header>
            </div>
            
            <div className="tableContainer">
                <ProjectTable projects={projects}/>
            </div>

            <NewProjectButton />
        </div>
    );
}

export default App;
