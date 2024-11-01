
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOMServer from 'react-dom/server';
import { Buffer } from 'buffer';
// import DropZone2 from './components2/DropZone2';
import DraggableItem2 from './components2/DraggableItem2';
import DropZone2 from './components2/DropZone2';
import './components/DropArea.css';
import { images } from './assets/Images';
import Theme1 from './components2/Theme1';
import Theme2 from './components2/Theme2';
import FinalTheme1 from './components2/FinalTheme1';
import axios from 'axios';
import'./App.css';
// import cssContent1 from '!!raw-loader!./components2/DataSec.css';
// import DragableItem2 from './components2/DraggableItem2';

const ItemTypes = {
  HEADING: 'heading',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
};

export default function App() {
  const [aboutItems, setAboutItems] = useState([]);
  const [skillsItems, setSkillsItems] = useState([]);
  const [deploayLoader, setDeployLoader] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState('');
  const [activeTheme, setActiveTheme] = useState(0);
  const [dataSaved, setDataSaved] = useState(false);
  window.Buffer = Buffer;

  async function loadCSSFiles() {
    const files = import.meta.glob('/src/**/*.css', { as: 'raw', eager: true });
    return Object.values(files).join('\n');
}

  async function deployToVercel(htmlContent) {
    setDeployLoader(true);
    const vercelToken = '21oEYD9Q7Werem5zqytaPMGz';
    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "user-resume",
        files: [
          {
            file: "index.html",
            data: htmlContent,
          },
         
        ],
        "projectSettings": {
    "framework": null,
    "buildCommand": null,
    "devCommand": null,
    "installCommand": null,
    "outputDirectory": "."
  },
        target: "production",
      }),
    });
  
    const result = await response.json();
    console.log('Deployment URL:', result.url);
    setDeployLoader(false);
    setDeployedUrl(result.url);
    return result.url;
}



async function deployProject() {
  setDeployLoader(true);
  const deploymentData = {
      name: "resume-auto-dep",
      gitSource: {
          type: "github",
          repoId: "880674205",
          ref: "main"
      },
      "projectSettings": {
        "installCommand": "npm install",
        "buildCommand": "npm run build",
        "devCommand": "vite --port $PORT",
        "outputDirectory": "dist",
        "framework": "vite"
      }
      // Additional configuration here if necessary
  };

  const response = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 21oEYD9Q7Werem5zqytaPMGz`, // Use your actual token here
      },
      body: JSON.stringify(deploymentData),
  });

  if (response.ok) {
      console.log("Deployment successful!");
      setDeployLoader(false);
  } else {
      console.log("Deployment failed:", await response.json());
      setDeployLoader(false);
  }
}



  const handleAutoDeploy = async () => {
    const htmlContent = ReactDOMServer.renderToString(<FinalTheme1 ItemTypes={ItemTypes} aboutItems={aboutItems} skillsItems={skillsItems}/>);
    const cssContent = await loadCSSFiles();
    const htmlContent2 = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Resume</title>

        <!-- Bootstrap CSS 5.3.3 -->
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          crossorigin="anonymous"
        />

        <!-- Google Fonts for MUI -->
        <link 
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" 
          rel="stylesheet" 
        />

        

        <!-- Tailwind CSS -->
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

        <!-- Ant Design -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.17.3/antd.min.css" />

        <style>${cssContent}</style>
    </head>
    <body>
        <div id="resume">
            ${ReactDOMServer.renderToString(<FinalTheme1 ItemTypes={ItemTypes} aboutItems={aboutItems} skillsItems={skillsItems}/>)}
        </div>

        <!-- Bootstrap JavaScript Bundle 5.3.3 -->
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          crossorigin="anonymous"
        ></script>

        <!-- React and ReactDOM -->
        <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>

        <!-- Material-UI JavaScript Bundle -->
        <script 
      src="https://cdnjs.cloudflare.com/ajax/libs/material-ui/5.0.0-beta.5/index.min.js"
      crossorigin="anonymous"
    ></script>

        <!-- Ant Design -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/4.17.3/antd.min.js"></script>
    </body>
    </html>`;



    deployToVercel(htmlContent2)
  }

  const goToResume = () => {
    window.open(deployedUrl, '_blank',);
  }

  const handleDeploy = async () => {
    setDeployLoader(true);
    try {
        const response = await fetch('http://localhost:5000/deploy', { method: 'POST' });
        const result = await response.json();
        setDeployedUrl(result.url);
    } catch (error) {
        console.error("Error during deployment:", error);
    }
    setDeployLoader(false);
};
 

  return (
    <DndProvider backend={HTML5Backend}>
      <h2 style={{marginLeft: '300px'}}>POC of Auto Deployment</h2>
      <div style={{ display: 'flex', gap: '20px',
       }}>
        {/* Sidebar with draggable items */}
        {activeTheme === 0 ? 
        <div style={{marginLeft: '300px'}}>
           <h3>Select Theme</h3>
           <h5 onClick={()=>{setActiveTheme(1)}} style={{cursor: 'pointer'}}>1</h5>
           <h5 onClick={()=>{setActiveTheme(2)}} style={{cursor: 'pointer'}}>2</h5>
        </div> : ''}
       { !dataSaved && activeTheme !== 0 ? <div style={{ width: '200px', marginLeft: '100px' }}>
          <h4>Fields</h4>
          <DraggableItem2 type={ItemTypes.PARAGRAPH} content="Paragraph" value='Lorem ipsum dolor sit amet...'/>
          <DraggableItem2 type={ItemTypes.IMAGE} content="Image" value=''/>
          <DraggableItem2 type={ItemTypes.HEADING} content="Heading" value='Heading'/>
        </div> : ''}
       {activeTheme === 1 && !dataSaved && <Theme1 ItemTypes={ItemTypes} aboutItems={aboutItems} skillsItems={skillsItems} setAboutItems={setAboutItems} setSkillsItems={setSkillsItems} /> }
       {activeTheme === 2 && !dataSaved && <Theme2 ItemTypes={ItemTypes} aboutItems={aboutItems} skillsItems={skillsItems} setAboutItems={setAboutItems} setSkillsItems={setSkillsItems} /> }
       {dataSaved && activeTheme === 1 && <FinalTheme1 ItemTypes={ItemTypes} aboutItems={aboutItems} skillsItems={skillsItems}/>}
      </div>
      {!dataSaved && activeTheme !== 0 && <button style={{marginLeft: '500px', marginTop: '20px'}} onClick={()=>{setDataSaved(true)}}>Save</button> }
      {dataSaved && activeTheme !== 0 && deployedUrl === '' && <button style={{marginLeft: '500px', marginTop: '20px'}} onClick={handleAutoDeploy}>{deploayLoader ? 'Loading...' : 'Deploy'}</button> }
      {deployedUrl !== '' ? <p>Link of Live Resume: <span style={{color: 'skyblue', cursor: 'pointer'}}><a href={`https://${deployedUrl}`} target="_blank" rel="noopener noreferrer">{deployedUrl}</a></span></p> : ''}
    </DndProvider>
  );
}

