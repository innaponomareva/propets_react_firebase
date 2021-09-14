import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';


const Dropdown = ({name, array}) => {
  const [state, setState] = useState(array[0]);

  
  
  
  const onFieldClickHandler = () => {
    document.querySelector(`.dropdown.${name}`).classList.toggle('hidden');
    document.querySelector(`.chevron_down.${name}`).classList.toggle('hidden');
    document.querySelector(`.chevron_up.${name}`).classList.toggle('hidden');
  }
  const onLiClickHandler = (event) => {
    if(event.target.tagName === 'LI'){
      //document.querySelector(`.dropdown_input.${name}`).value = event.target.innerHTML;
      setState(event.target.innerHTML)
      document.querySelector(`.dropdown.${name}`).classList.add('hidden');
      document.querySelector(`.chevron_down.${name}`).classList.toggle('hidden');
      document.querySelector(`.chevron_up.${name}`).classList.toggle('hidden');
    }
  }


  useEffect(()=>{
    const clickOutside = (event) => {
      if(event.target.classList.contains('inner_component')
      || event.target.classList.contains('outer_row')
      || event.target.classList.contains('inner_row')
      || event.target.classList.contains('form-label')
      || event.target.classList.contains('input_box')
      || event.target.tagName === 'IMG'
      ){
        if(!document.querySelector(`.dropdown.${name}`).classList.contains('hidden')){
          document.querySelector(`.dropdown.${name}`).classList.add('hidden');
          document.querySelector(`.chevron_up.${name}`).classList.toggle('hidden');
          document.querySelector(`.chevron_down.${name}`).classList.toggle('hidden');
        }
      }
    }
    window.addEventListener('click', clickOutside);
    return ()=>{
      window.removeEventListener('click', clickOutside);
    }
    // eslint-disable-next-line
  },[])


  return(
    <div key={name} className={`dropdown_box ${name}`} >
    <Form.Control
      className={`dropdown_input ${name}`}
      name={name}
      type="text"
      value={state}
      onChange={()=>{}}
    />
    <span className={`chevron_down ${name}`}><FontAwesomeIcon icon={faChevronDown}/></span>
    <span className={`chevron_up ${name} hidden`}><FontAwesomeIcon icon={faChevronUp}/></span>
    <div className={`click_field ${name}`} onClick={onFieldClickHandler} />
    <ul className={`dropdown hidden ${name}`}>
      {array.map((item,index) => <li key={index} onClick={onLiClickHandler}>{item}</li>)}
    </ul>
    
    </div>
  )
}

export default Dropdown;