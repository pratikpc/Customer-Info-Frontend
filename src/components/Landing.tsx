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

interface keyable {
   [key: string]: any;
}

const columns = [
   { field: 'name', headerName: 'Name', width: 180, editable: true },
   { field: 'age', headerName: 'Age', type: 'number', editable: true },
   {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
      editable: true
   },
   {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'dateTime',
      width: 220,
      editable: true
   }
];

export default function Landing() {
   const { sendRequest } = useFetch();
   const [inputFields, setInputFields] = useState<Array<keyable>>([{}]);
   const classes = useStyles();

   const handleChangeInput = (event: any, index: any) => {
      const newInputFields = inputFields.map((i: any) => {
         console.log(i);
         i[Object.keys(i)[index]] = event.target.value;
         return i;
      });

      setInputFields(newInputFields);
   };

   const handleSubmit = (e: any) => {
      e.preventDefault();
      sendRequest('customer', 'PUT', JSON.stringify(inputFields[0]), {
         'Content-Type': 'Application/json'
      });
      console.log(e);
      console.log('InputFields', inputFields);
   };

   const handleAddFields = () => {
      //   setInputFields())
   };

   React.useEffect(() => {
      async function PerformAsync() {
         try {
            console.log(await Token());
            const results = await sendRequest(`customer`);
            // results.map((results: any) => Object.assign(results, { id: uuidv4() }))
            console.log(JSON.stringify(results));
            setInputFields(results);
         } catch (err) {
            console.error(err);
         }
      }
      PerformAsync();
   }, []);

   return (
      <>
         <Container>
            <h1>Customer Detail</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
               {Object.keys(inputFields[0]).map((item, i) => (
                  <React.Fragment>
                     <div>
                        {console.log(inputFields)}
                        <TextField
                           name="Keys"
                           label="Keys"
                           variant="filled"
                           value={item}
                           // onChange={event => handleChangeInput(event, i)}
                        />
                        <TextField
                           name="Value"
                           label="Value"
                           variant="filled"
                           value={inputFields[0].item}
                           // onChange={event => handleChangeInput(event, i)}
                        />
                        {console.log(inputFields[0])}
                        <IconButton
                           disabled={inputFields.length === 1}
                           // onClick={() => handleRemoveFields(inputField)}
                        >
                           <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={handleAddFields}>
                           <AddIcon />
                        </IconButton>
                     </div>
                  </React.Fragment>
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
