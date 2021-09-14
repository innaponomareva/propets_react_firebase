import React from 'react';
import Dropdown from '../dropdown/Dropdown';


const Walking = () => {

  

  const array = ['dog', 'cat', 'parrot', 'mouse']
  return(
    <div style={{width:'300px'}}>
      <Dropdown array={array} />
    </div>
  )

}

export default Walking;