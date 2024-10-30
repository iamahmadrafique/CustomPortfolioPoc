import { useEffect, useState } from 'react';
import DropZone2 from './DropZone2';
import { images } from '../assets/Images';
import axios from 'axios';

export default function Theme1({ItemTypes, aboutItems, skillsItems, setAboutItems, setSkillsItems}){

  const [loader, setLoader] = useState(false);
   
  const handleRemoveAboutItem = (index) => {
    console.log('index is : ', index);
    let tempItems = [...aboutItems];
    console.log('tempItems is : ', tempItems);
    tempItems.splice(index, 1);
    console.log('tempItems after is : ', tempItems);
    setAboutItems(tempItems);
  }

  const handleRemoveSkillsItem = (index) => {
    console.log('index is : ', index);
    let tempItems = [...skillsItems];
    console.log('tempItems is : ', tempItems);
    tempItems.splice(index, 1);
    console.log('tempItems after is : ', tempItems);
    setSkillsItems(tempItems);
  }

  const handleDrop = (section, item) => {
    if (section === 'about') {
      setAboutItems((prev) => [...prev, item]);
    } else if (section === 'skills') {
      setSkillsItems((prev) => [...prev, item]);
    }
  };

  const handleUploadFile = async (e, callFrom, index) => {
    console.log('callFrom is : ', callFrom);
    console.log('index is : ', index);

    try {
      const obj = { [e.target.name]: e.target.value };
      if (e.target.type === "file") {
        if (obj["attachments"] !== "") {
          var formData = new FormData();
          formData.append("file", e.target.files[0]);
          const response = await axios.post(
            `https://codexiatech.dev/hris/upload.php`, formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
              },
            }
          );
          if (response) {

            if(callFrom === 'about'){
              let tempAboutItems = aboutItems;
              tempAboutItems[index] = {...tempAboutItems[index], "value": response.data.fileUrl}
              setAboutItems(tempAboutItems);
              }else if(callFrom === 'skill'){
                let tempSkillsItems = skillsItems;
                tempSkillsItems[index] = {...tempSkillsItems[index], "value": response.data.fileUrl}
                setSkillsItems(tempSkillsItems);
              }
              setLoader(!loader);
          }
        }
      }
    } catch (err) {
      console.log('error in upload file is : ', err);
    }







    // if (e.target.files[0]) {
    //   const file = e.target.files[0];
    //   if (file) {
    //     const previewURL = URL.createObjectURL(file);
    //     if(callFrom === 'about'){
    //     let tempAboutItems = aboutItems;
    //     tempAboutItems[index] = {...tempAboutItems[index], "value": previewURL}
    //     setAboutItems(tempAboutItems);
    //     }else if(callFrom === 'skill'){
    //       let tempSkillsItems = skillsItems;
    //       tempSkillsItems[index] = {...tempSkillsItems[index], "value": previewURL}
    //       setSkillsItems(tempSkillsItems);
    //     }
    //     setLoader(!loader);
    //   }
    // }
  }

  const handleTextData = (value, callFrom , index) => {
    if(callFrom === 'about'){
      let tempAboutItems = aboutItems;
      tempAboutItems[index] = {...tempAboutItems[index], "value": value}
      setAboutItems(tempAboutItems);
    }else if (callFrom === 'skill'){
      let tempSkillItems = skillsItems;
      tempSkillItems[index] = {...tempSkillItems[index], "value": value}
      setSkillsItems(tempSkillItems);
    }
    
  }
  useEffect(()=>{

  },[loader])
  useEffect(()=>{
    console.log('aboutItems is : ', aboutItems);
  },[aboutItems])

  useEffect(()=>{
    console.log('skillsItems is : ', skillsItems);
  },[skillsItems])
    return(
      <>
        <div style={{ flexGrow: 1, width: '500px', minHeight: '500px', backgroundColor: 'white', border: '1px solid black', padding: '10px'}}>
          <h2>About Section</h2>
          <DropZone2
            accept={[ItemTypes.PARAGRAPH, ItemTypes.IMAGE, ItemTypes.HEADING]}
            onDrop={(item) => handleDrop('about', item)}
            style={{ minHeight: '200px' }}
          >
            {aboutItems?.map((item, index) => (
              <div key={index} style={{ width: item.type === ItemTypes.PARAGRAPH ? '50%' : item.type === ItemTypes.HEADING ? '100%' : '30%' }}>
                  <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}><img src={images?.crossIcon} className='crossIcon' onClick={()=>{handleRemoveAboutItem(index)}} /></div>
                 {item.type === 'heading' && <input type="text" placeholder="Enter text" className="heading-input" defaultValue={item?.value} onChange={(e)=>{handleTextData(e.target.value, 'about', index)}}/>}
                 {item.type === 'paragraph' && <textarea type="text" placeholder="Enter text" className="paragraph-input" defaultValue={item?.value}  onInput={(e) => e.target.style.height = (e.target.scrollHeight-10) + 'px'} onChange={(e)=>{handleTextData(e.target.value, 'about', index)}}/>}
                 {item.type === 'image' && <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd' }}>
                 <label htmlFor={`uploadImageAbout${index}`} className="upload-profile-img overflow-hidden">
                                <input  type="file" id={`uploadImageAbout${index}`}  accept="image/*"  hidden  onChange={(e) => {  handleUploadFile(e, 'about', index)  }}  />
                           <img src={aboutItems[index]?.value ? aboutItems[index]?.value : images.imageIcon} alt='profile' style={{width: '100px', height: '100px',}} className={`img-fluid cursor-pointer w-28 rounded-full border border-1 border-blue-200 h-28 2xl:w-36 2xl:h-36 }`} />
                          </label>
                  </div>}
              </div>
            ))}
          </DropZone2>

          <h2>Skills Section</h2>
          <DropZone2
            accept={[ItemTypes.PARAGRAPH, ItemTypes.IMAGE, ItemTypes.HEADING]}
            onDrop={(item) => handleDrop('skills', item)}
            // style={{ border: '1px dashed gray', }}
          >
            {skillsItems?.map((item, index) => (
              <div key={index} style={{ width: item.type === ItemTypes.PARAGRAPH ? '50%' : item.type === ItemTypes.HEADING ? '100%' : '30%' }}>
                 <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}><img src={images?.crossIcon} className='crossIcon' onClick={()=>{handleRemoveSkillsItem(index)}} /></div>
                     {item.type === 'heading' && <input type="text" placeholder="Enter text" defaultValue={item?.value} className="heading-input" onChange={(e)=>{handleTextData(e.target.value, 'skill', index)}}/>}
                 {item.type === 'paragraph' && <textarea type="text" placeholder="Enter text" defaultValue={item?.value} className="paragraph-input"  onInput={(e) => e.target.style.height = (e.target.scrollHeight-10) + 'px'} onChange={(e)=>{handleTextData(e.target.value, 'skill', index)}}/>}
                 {item.type === 'image' && <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd' }}><label htmlFor={`uploadImage${index}`} className="upload-profile-img overflow-hidden">
                                <input  type="file" id={`uploadImage${index}`}  accept="image/*"  hidden  onChange={(e) => {  handleUploadFile(e, 'skill', index)  }}  />
                           <img src={skillsItems[index]?.value ? skillsItems[index]?.value : images.imageIcon} alt='profile' style={{width: '100px', height: '100px',}} className={`img-fluid cursor-pointer w-28 rounded-full border border-1 border-blue-200 h-28 2xl:w-36 2xl:h-36 }`} />
                          </label></div>}
              </div>
            ))}
          </DropZone2>
        </div>
        
        </>
    )
}