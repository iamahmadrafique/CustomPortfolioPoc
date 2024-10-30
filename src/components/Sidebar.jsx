// src/components/Sidebar.js
import React from 'react';
import DraggableItem from './DraggableItem';

const Sidebar = () => {
  const items = [
    { id: 1, type: 'heading', label: 'Heading' },
    { id: 2, type: 'paragraph', label: 'Half width Paragraph' },
    { id: 3, type: 'paragraphFull', label: 'Full width Paragraph' },
    { id: 4, type: 'image', label: 'Image' },
  ];

  return (
    <div style={{ width: '200px', padding: '16px', borderRight: '1px solid black' }}>
      <h3>Fields</h3>
      {items.map((item) => (
        <DraggableItem key={item.id} id={item.id} type={item.type} label={item.label} />
      ))}
    </div>
  );
};

export default Sidebar;
