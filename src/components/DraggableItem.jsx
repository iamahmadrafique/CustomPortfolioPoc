// src/components/DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { images } from '../assets/Images';

const DraggableItem = ({ id, type, label} ) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        border: '1px solid gray',
        marginBottom: '8px',
        cursor: 'move',
      }}
    >
      {type === 'paragraph' && <p>{label}</p>}
      {type === 'paragraphFull' && <p>{label}</p>}
      {type === 'heading' && <h2>{label}</h2>}
      {type === 'image' && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}><img src={images?.imageIcon} style={{width: '100px', height: '100px'}}/>{label}</div>}
    </div>
  );
};

export default DraggableItem;
