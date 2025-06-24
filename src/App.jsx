import {Routes,Route} from 'react-router-dom';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import NewPassword from './pages/auth/NewPassword';
import Verfyemail from './pages/auth/Verfyemail';
import Layout from './layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { colorModeContext,useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import AddAdmin from './pages/Admins/AddAdmin';
import Admins from './pages/Admins/Admins';
import Faq from './pages/faq/Faq';
import Roles from './pages/Roles/Roles';
import AddRole from './pages/Roles/AddRole';
import Users from './pages/Users/Users';
import AddUser from './pages/Users/AddUser';
import UserPro from './pages/Users/UserPro';
import Attribute from './pages/attribute/attribute';
import AddAtribute from './pages/attribute/add-attribute';
import AttributeDetails from './pages/attribute/Attribute-details';
import AdminDetails from './pages/Admins/AdminDetails';
import AdminDetailsPage from './pages/Admins/AdminDetailsPage';



function App() {
      const [theme,colorMode] = useMode();
  

  return (
      <colorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>    
        <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path="/reset-password" element={<ResetPassword/>}/>
              <Route path="/new-password" element={<NewPassword/>}/>
              <Route path="/verfy-email" element={<Verfyemail/>}/>
              

              <Route path='/' element={
                  <ProtectedRoute>
                        <Layout/>
                  </ProtectedRoute>
              }> 
              <Route path='add-admin' element={<AddAdmin/>}/>
              <Route path='admins' element={<Admins/>}/>
              <Route path ='admin-details/:id' element = {<AdminDetailsPage/>}/>
              <Route path='faq' element={<Faq/>}/>
              <Route path='roles' element={<Roles/>}/>
              <Route path='add-role' element={<AddRole/>}/>
              <Route path='faq' element={<Faq/>}/>
              <Route path='users' element={<Users/>}/>
              <Route path='add-user' element={<AddUser/>}/>
              <Route path='user-pro/:id' element={<UserPro/>}/>
              <Route path='attribute' element={<Attribute/>} />
              <Route path='add-attribute' element={<AddAtribute/>} />
              <Route path= 'attribute/:id' element={<AttributeDetails/>}/>


              </Route>   

        </Routes>
        </ThemeProvider>
        </colorModeContext.Provider>
  )
}

export default App
