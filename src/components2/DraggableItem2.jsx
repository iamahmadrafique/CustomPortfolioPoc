
import React from 'react';
import { useDrag } from 'react-dnd';
import { images } from '../assets/Images';
export default function DraggableItem2({ type, content, value }) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type,
      item: { type, content, value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    return (
      <div 
        ref={drag} 
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move', padding: '8px', border: '1px solid #ccc', marginBottom: '8px' }}
      >
        {type === 'paragraph' && <p>{content}</p>}
      {type === 'heading' && <h2>{content}</h2>}
      {type === 'image' && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><img src={images?.imageIcon} style={{width: '100px', height: '100px'}}/>{content}</div>}
      </div>
    );
  }
  