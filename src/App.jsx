// import './App.css'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import Sidebar from './components/Sidebar'
// import DropArea from './components/DropArea'

// function App() {

//   return (
//     <DndProvider backend={HTML5Backend}>
//      <div style={{ display: 'flex' }}>
//       <Sidebar />
//        <DropArea />
//     </div>
//   </DndProvider>
//   )
// }

// export default App


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
          }
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

  const handleAutoDeploy = () => {
    const htmlContent = ReactDOMServer.renderToString(<FinalTheme1 ItemTypes={ItemTypes} aboutItems={aboutItems} skillsItems={skillsItems}/>);
    deployToVercel(htmlContent)
  }

  const goToResume = () => {
    window.open(deployedUrl, '_blank',);
  }
 

  return (
    <DndProvider backend={HTML5Backend}>
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

