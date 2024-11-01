import { useDrop } from "react-dnd";

export default function DropZone2({ accept, onDrop, children, style }) {
    const [{ isOver }, drop] = useDrop(() => ({
      accept,
      drop: (item) => onDrop(item),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));
  
    return (
      <div 
        ref={drop} 
        style={{
          ...style,
          backgroundColor: isOver ? '#f0f0f0' : 'white',
          padding: '10px',
          minHeight: '50px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
        className='backgroundImage'
      >
        {children}
      </div>
    );
  }
  