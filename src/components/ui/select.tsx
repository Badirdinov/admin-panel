import React from 'react';


//styles
import './ui.css';

const CustomSelect = () => {
    return (
      <>
          <select className='select'>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
          </select>
      </>
    );
};

export default CustomSelect;
