import { Button, TextField } from "@mui/material";
import { images } from "../assets/Images";
import './DataSec.css';
import { DatePicker } from 'antd';
// import { Button } from 'antd';
import { Slider, Switch } from 'antd';
import { useState } from "react";

export default function DataSec({index, ItemTypes, aboutItems, item}){
    const [disabled, setDisabled] = useState(false);
  const onChange = (checked) => {
    setDisabled(checked);
  };
    return(
        <div key={index} className="bg-danger" style={{ width: item.type === ItemTypes.PARAGRAPH ? '50%' : item.type === ItemTypes.HEADING ? '100%' : '30%' }}>
                 {item.type === 'heading' &&  <input type="text" placeholder="Enter text" style={{border: 'none', outline: 'none', fontSize: '30px'}} defaultValue={item?.value} disabled />}
                 {item.type === 'paragraph' && <textarea className='bg-danger' type="text" placeholder="Enter text" style={{fontSize: '14px', border: 'none', outline: 'none', overflow: 'hidden', overflowY: 'hidden', resize: 'none', height: 'auto' }} defaultValue={item?.value}  onInput={(e) => e.target.style.height = (e.target.scrollHeight-10) + 'px'} disabled/>}
                 {item.type === 'image' && <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd' }}>
                 <label htmlFor={`uploadImageAbout${index}`} className="upload-profile-img overflow-hidden">
                                <input  type="file" id={`uploadImageAbout${index}`}  accept="image/*"  hidden  disabled />
                           <img src={aboutItems[index]?.value ? aboutItems[index]?.value : images.imageIcon} alt='profile' className={`img-fluid cursor-pointer w-28 rounded-full border border-1 border-blue-200 h-28 2xl:w-36 2xl:h-36 }`} />
                          </label>
                  </div>}
                  {/* <img src='data:image/png;base64,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'/> */}
                  <Button variant="contained" type='Submit' className='submit-btn'>Submit</Button>
                  <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                  {/* <Button type="primary">Primary Button</Button> */}
                  {/* <DatePicker /> */}
                  {/* <Slider defaultValue={30} disabled={disabled} />
      <Slider range defaultValue={[20, 50]} disabled={disabled} />
      Disabled: <Switch size="small" checked={disabled} onChange={onChange} /> */}
                  <button className="btn btn-danger">Click Me</button>
              </div>
    )
}