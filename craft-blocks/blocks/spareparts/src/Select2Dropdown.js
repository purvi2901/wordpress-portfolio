import React, { useRef, useEffect } from 'react';
import $ from 'jquery';

const Select2Dropdown = ({ options, onChange, selectedValue  }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    $(selectRef.current).select2().on('change', (e) => {
      onChange(e.target.value);
      
    });

    return () => {
      $(selectRef.current).select2('destroy');
    };
  }, []);

  useEffect(() => {
    if (selectedValue && selectedValue.length > 0) {
      $(selectRef.current).val(selectedValue).trigger('change');
    }
  }, [selectedValue]);

  return (
    <select ref={selectRef} multiple className='custom-select2'>
      {options.map((option, index) => (
        <option key={index} value={option.id}>{option.name}</option>
      ))}
    </select>
  );
};

export default Select2Dropdown;
