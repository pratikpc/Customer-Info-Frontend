import './App.css';
import { ShowIfAuth, ShowIfNoAuth, SignOut } from './components/AuthCheck';
import Login from './components/Login';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Userdata from './components/Userdata';
import AllData from './components/AllData';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/PowerSettingsNewRounded';

function App() {
   return (
      <>
         <ShowIfAuth>
            <div>
               <AppBar position="static">
                  <Toolbar>
                     <div style={{ textAlign: 'center' }}>
                        <Typography variant="h3" color="inherit">
                           Customer
                           <Typography variant="h6" color="inherit">
                              Information of All
                           </Typography>
                        </Typography>
                     </div>
                     <IconButton
                        style={{
                           alignItems: 'end',
                           position: 'absolute',
                           right: '2vw',
                           height: '100%'
                        }}
                        onClick={() => {
                           SignOut().then(() => {
                              window.location.href = `${process.env.PUBLIC_URL}/`;
                           });
                        }}
                     >
                        <div>
                           <LogoutIcon />
                           <br />
                           LOGOUT
                        </div>
                     </IconButton>
                  </Toolbar>
               </AppBar>
               <Userdata />
               <AllData />
            </div>
         </ShowIfAuth>
         <ShowIfNoAuth>
            <Login />
         </ShowIfNoAuth>
      </>
   );
}

export default App;
