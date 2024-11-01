import DataSec from './DataSec';

export default function FinalTheme1({ItemTypes, aboutItems, skillsItems}){

    return(
      <>
        <div style={{ flexGrow: 1, width: '500px', marginLeft: '300px', minHeight: '500px', backgroundColor: 'white', border: '1px solid black', padding: '10px',}}>
          <h2 className='text-red-400 text-xl font-semibold'>About Section</h2>
          <div 
        style={{
          padding: '10px',
          minHeight: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
        className='backgroundImage'
      >
            {aboutItems?.map((item, index) => (
              <DataSec index={index} ItemTypes={ItemTypes} aboutItems={aboutItems} item={item}/>
            ))}
          </div>

          <h2 className='text-green-400 text-xl font-semibold'>Skills Section</h2>
          <div 
        style={{
          backgroundColor: 'white',
          padding: '10px',
          minHeight: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
        className='backgroundImage'
      >
            {skillsItems?.map((item, index) => (
              <DataSec index={index} ItemTypes={ItemTypes} aboutItems={skillsItems} item={item}/>
            ))}
          </div>
        </div>
        
        </>
    )
}