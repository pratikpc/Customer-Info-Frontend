import React, { useState } from 'react';
import { Token } from './AuthCheck';
import MaterialTable from 'material-table';
import { v4 as uuidv4 } from 'uuid';

import useFetch from './data/Fetch';
import useRefresh from './data/Refresh';
import Open from './data/Open';

import DeleteForever from '@material-ui/icons/DeleteForever';
import Add from '@material-ui/icons/AddRounded';
import Refresh from '@material-ui/icons/RefreshRounded';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   root: {
      '& .MuiTextField-root': {
         margin: theme.spacing(1)
      }
   },
   button: {
      margin: theme.spacing(1)
   }
}));

export default function Landing() {
   const { sendRequest } = useFetch();
   const [custInfo, setCustInfo] = useState([]);
   const classes = useStyles();
   const [inputFields, setInputFields] = useState([]);

   const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log('InputFields', inputFields);
   };

   const handleChangeInput = (id: any, event: any) => {
      // const newInputFields = inputFields.map((i: any) => {
      // //    if (id === i.id) {
      // //       i[event.target.name] = event.target.value;
      // //    }
      // //    return i;
      // // });

      // // setInputFields(newInputFields);
   };

   const handleAddFields = () => {
      // setInputFields(Object.assign(inputFields[0], {key: ''}));
   };

   const handleRemoveFields = (id: any) => {
      const values = [...inputFields];
      console.log(values);
      // values.splice(
      //    values.findIndex(value => value === id),
      //    1
      // );
      setInputFields(values);
   };

   React.useEffect(() => {
      async function PerformAsync() {
         console.log(await Token());
         const results = await sendRequest(`customer`);
        //  results.map((results: any) => Object.assign(results, { id: uuidv4() }))
         console.log(JSON.stringify(results));
         setInputFields(results);
      }
      PerformAsync();
   }, []);
   return (
      <>
         <Container>
            <h1>Add New Member</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
            {console.log(inputFields)}
               {inputFields.map((inputField: any) => (
                  <div key={inputField}>
                    {console.log(typeof(inputField))}
                    {Object.keys(inputField).map((key: any, value: any) => {console.log(key); return "test"})}
                     <TextField
                        name="Keys"
                        label="Keys"
                        variant="filled"
                        value={Object.keys(inputField)[0]}
                        onChange={event =>
                           handleChangeInput(inputField, event)
                        }
                     />
                     <TextField
                        name="Values"
                        label="Values"
                        variant="filled"
                        value={inputField}
                        onChange={event =>
                           handleChangeInput(inputField, event)
                        }
                     />
                     <IconButton
                        disabled={inputFields.length === 1}
                        onClick={() => handleRemoveFields(inputField)}
                     >
                        <RemoveIcon />
                     </IconButton>
                     <IconButton onClick={handleAddFields}>
                        <AddIcon />
                     </IconButton>
                  </div>
               ))}
               <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={<Icon>send</Icon>}
                  onClick={handleSubmit}
               >
                  Send
               </Button>
            </form>
         </Container>
      </>
   );
}
