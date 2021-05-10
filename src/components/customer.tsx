import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';


export function singleValue(props: {
   key: string;
   value: string;
   kedit: boolean;
   vedit: boolean;
   addbox: boolean;
   delbox: boolean;
   adde: () => void;
   dele: () => void;
   keychangeevent: (newKey: string)=>void;
   valchangeevent: (newValue: string)=>void;
}) {
   return (
      <>
         <TextField
            name="Keys"
            label="Keys"
            variant="filled"
            value={props.key}
            // onChange={event => handleChangeInput(event, i)}
         />
         <TextField
            name="Value"
            label="Value"
            variant="filled"
            value={props.value}
            // onChange={event => handleChangeInput(event, i)}
         />
         {/* {console.log(inputFields[0])} */}
         <IconButton
            // disabled={inputFields.length === 1}
            // onClick={() => handleRemoveFields(inputField)}
         >
            <RemoveIcon />
         </IconButton>
         {/* <IconButton onClick={handleAddFields}> */}
            <AddIcon />
         {/* </IconButton> */}
      </>
   );
}



{ Firstname: "rahim", lastname: "chunara" }

[{ key: "firstname",  value: "rahim" }
{ key: "lastname", value: "chunara" }]