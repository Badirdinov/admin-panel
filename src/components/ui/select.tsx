import React from 'react';


//styles
import './ui.css';

interface IPropsSelect
    {
        value? : any
        options? : any
        onChange? : (e : React.ChangeEvent<HTMLSelectElement>) => void
        name? : any
    }

const CustomSelect = ({ value, name, options, onChange } : IPropsSelect) => {
    return (
      <>
          <select className='select' name={ name } onChange={ onChange }>
              { options.map((items : any) => (
                <option value={ items.id } key={ items.id }
                >{ items.name }</option>
              )) }
          </select>
      </>
    );
};

export default CustomSelect;
