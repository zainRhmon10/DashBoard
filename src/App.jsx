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
import AdminDetails from './pages/Admins/AdminDetails';
import AdminDetailsPage from './pages/Admins/AdminDetailsPage';
import Tags from './Feature/tags/pages/tags';
import AddTag from './Feature/tags/pages/add_tags';
import DetailsTag from './Feature/tags/pages/details';
import AddCategory from './Feature/category/pages/add_catgory';
import Categories from './Feature/category/pages/categories';
import CategoryDetaiels from './Feature/category/pages/detaiels';
import Attribute from './Feature/attribute/page/attribute';
import AddAttribute from './Feature/attribute/page/add-attribute';
import AttributeDetails from './Feature/attribute/page/Attribute-details';
import Users from './Feature/users/pages/Users';
import AddUser from './Feature/users/pages/AddUser';
import UserPro from './Feature/users/pages/UserPro';
import DeliveryZones from './Feature/Delivery_zone/pages/Delivery-zones';
import AddZone from './Feature/Delivery_zone/pages/add_zone';
import DetailsZone from './Feature/Delivery_zone/pages/details_zone';



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
              <Route path='add-attribute' element={<AddAttribute/>} />
              <Route path= 'attribute/:id' element={<AttributeDetails/>}/>
              <Route path= 'category' element={<Categories/>} />
              <Route path= 'add-category' element={<AddCategory />} />
              <Route path = 'category/:id' element ={<CategoryDetaiels/>} />
              <Route path ='tags' element={<Tags/>}/>
              <Route path ='add-tags' element={<AddTag/>}/>
              <Route path ='tags/:id' element={<DetailsTag/>}/>
              <Route path ='zones' element={<DeliveryZones/>} />
              <Route path= 'add-zone' element={<AddZone />} />
              <Route path ='zone/:id' element={<DetailsZone/>} />



              </Route>   

        </Routes>
        </ThemeProvider>
        </colorModeContext.Provider>
  )
}

export default App
