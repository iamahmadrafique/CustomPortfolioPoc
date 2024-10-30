import { images } from '../assets/Images';

export default function FinalTheme1({ItemTypes, aboutItems, skillsItems}){

    return(
      <>
        <div style={{ flexGrow: 1, width: '500px', marginLeft: '300px', minHeight: '500px', backgroundColor: 'white', border: '1px solid black', padding: '10px'}}>
          <h2>About Section</h2>
          <div 
        style={{
          backgroundColor: 'white',
          padding: '10px',
          minHeight: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
            {aboutItems?.map((item, index) => (
              <div key={index} style={{ width: item.type === ItemTypes.PARAGRAPH ? '50%' : item.type === ItemTypes.HEADING ? '100%' : '30%' }}>
                 {item.type === 'heading' && <input type="text" placeholder="Enter text" style={{border: 'none', outline: 'none', fontSize: '30px'}} defaultValue={item?.value} disabled />}
                 {item.type === 'paragraph' && <textarea type="text" placeholder="Enter text" style={{fontSize: '14px', border: 'none', outline: 'none', overflow: 'hidden', overflowY: 'hidden', resize: 'none', height: 'auto' }} defaultValue={item?.value}  onInput={(e) => e.target.style.height = (e.target.scrollHeight-10) + 'px'} disabled/>}
                 {item.type === 'image' && <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd' }}>
                 <label htmlFor={`uploadImageAbout${index}`} className="upload-profile-img overflow-hidden">
                                <input  type="file" id={`uploadImageAbout${index}`}  accept="image/*"  hidden  disabled />
                           <img src={aboutItems[index]?.value ? aboutItems[index]?.value : images.imageIcon} alt='profile' style={{width: '100px', height: '100px',}} className={`img-fluid cursor-pointer w-28 rounded-full border border-1 border-blue-200 h-28 2xl:w-36 2xl:h-36 }`} />
                          </label>
                  </div>}
              </div>
            ))}
          </div>

          <h2>Skills Section</h2>
          <div 
        style={{
          backgroundColor: 'white',
          padding: '10px',
          minHeight: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
            {skillsItems?.map((item, index) => (
              <div key={index} style={{ width: item.type === ItemTypes.PARAGRAPH ? '50%' : item.type === ItemTypes.HEADING ? '100%' : '30%' }}>
                     {item.type === 'heading' && <input type="text" placeholder="Enter text" defaultValue={item?.value} style={{border: 'none', outline: 'none', fontSize: '30px'}} disabled/>}
                 {item.type === 'paragraph' && <textarea type="text" placeholder="Enter text" defaultValue={item?.value} style={{fontSize: '14px', border: 'none', outline: 'none', overflow: 'hidden', overflowY: 'hidden', resize: 'none', height: 'auto', }}  onInput={(e) => e.target.style.height = (e.target.scrollHeight-10) + 'px'} disabled/>}
                 {item.type === 'image' && <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd' }}><label htmlFor={`uploadImage${index}`} className="upload-profile-img overflow-hidden">
                                <input  type="file" id={`uploadImage${index}`}  accept="image/*"  hidden  disabled  />
                           <img src={skillsItems[index]?.value ? skillsItems[index]?.value : images.imageIcon} alt='profile' style={{width: '100px', height: '100px',}} className={`img-fluid cursor-pointer w-28 rounded-full border border-1 border-blue-200 h-28 2xl:w-36 2xl:h-36 }`} />
                          </label></div>}
              </div>
            ))}
          </div>
        </div>
        
        </>
    )
}