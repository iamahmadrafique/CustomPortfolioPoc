// src/components/DropArea.js
import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import './DropArea.css';
import { images } from '../assets/Images';

const DropArea = () => {
  const [items, setItems] = useState([]);

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (item) => setItems((prevItems) => [...prevItems, item]),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleRemoveItem = (index) => {
    console.log('index is : ', index);
    let tempItems = [...items];
    console.log('tempItems is : ', tempItems);
    tempItems.splice(index, 1);
    console.log('tempItems after is : ', tempItems);
    setItems(tempItems);
  }

  useEffect(()=>{
    console.log('items is : ', items);
  },[items])

  return (
    <div 
    ref={drop}
    style={{
      display: 'flex',
      flexDirection: 'column',
        minHeight: '500px',
        width: '500px',
        backgroundColor: isOver ? '#f0f0f0' : 'white',
        border: '1px solid black',
      
    }}>
     <h3>Theme page A</h3>
    <div
      
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: '500px',
        width: '500px',
        
      }}
    >
     
      {items.map((item, index) => (
        <div key={index} style={{ padding: '2px', border: '1px solid gray', marginBottom: '2px', height: '100px'}}>
          <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}><img src={images?.crossIcon} className='crossIcon' onClick={()=>{handleRemoveItem(index)}} /></div>
          {item.type === 'heading' && <input type="text" placeholder="Enter text" className="heading-input" />}
          {item.type === 'paragraph' && <textarea type="text" placeholder="Enter text" className="paragraph-input-half"  onInput={(e) => e.target.style.height = (e.target.scrollHeight-10) + 'px'}/>}
          {item.type === 'paragraphFull' && <textarea type="text" placeholder="Enter text" className="paragraph-input"  onInput={(e) => e.target.style.height = (e.target.scrollHeight-10) + 'px'}/>}
          {item.type === 'image' && <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd' }}>Image Placeholder</div>}
        </div>
      ))}
    </div>
    </div>
  );
};

export default DropArea;
