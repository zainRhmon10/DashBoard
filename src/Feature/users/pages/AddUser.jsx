import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import {  useContext } from 'react';

import image from "../../../assets/images/Leaf_01.png";
import { useTheme } from '@emotion/react';
import { AuthContext } from '../../../context/AuthContext';
import { createUser } from '../services/user';



const AddUser = ({ onUserAdd }) => {
  const { token } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
   
  const validate = () => {
  const newErrors = {};

  if (!formData.firstname.trim()) newErrors.firstname = 'الاسم الأول مطلوب';
  if (!formData.lastname.trim())  newErrors.lastname  = 'اسم العائلة مطلوب';
  if (!formData.email.trim())     newErrors.email     = 'البريد الإلكتروني مطلوب';
  if (!formData.mobile.trim())    newErrors.mobile    = 'رقم الجوال مطلوب';

  if (!formData.password)         newErrors.password  = 'كلمة المرور مطلوبة';
  if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;   // لا أخطاء؟
};


  const [formData, setFormData] = useState({
    firstname: '',
    lastname : '',
    email: '',
    mobile: '',
    password :'',
    confirmPassword :'',
    image: null,
    imagePreview: null,
    status: 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async() =>  {
     if (!validate()) return; 
    const form = new FormData() ;

     form.append('first_name', formData.firstname);
     form.append('last_name' ,formData.lastname);
     form.append('email' ,formData.email);
     form.append('mobile' ,formData.mobile);
     form.append('password', formData.password);
     form.append('password_confirmation' , formData.confirmPassword);
     form.append('status', formData.status === 'active' ? "1" : "0");

     if(formData.image){
      form.append('image', formData.image);
     }

     try{
      await createUser(token , form);

       alert('✅ User added successfully!');


        setFormData({
      firstname: '',
      lastname:'',
      email: '',
      mobile :'',
      password:'',
      confirmPassword:'',
      image: null,
      imagePreview: null,
      status: 'active',
    });

      
     }catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
      alert('❌ Failed to add user. Check console for details.');
    }
   

   
  };

  return (

    <Box display={'flex'} flexDirection={'row'}>


    
     <Box
     flexDirection={'column'}
     gap={3}
          sx={{
            alignContent:'center',
            // minHeight:"100vh",
            mt:"30px",
            py: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            transition: 'all 0.3s ease-in-out',
          }}
        >

          <Box display="flex" alignItems="center" gap={3}
          sx={{
            mr:'200px'
          }}
          
          >
        <Avatar
          src={formData.imagePreview || ''}
          alt="User Avatar"
          sx={{ width: 200, height: 200 }}
        />
        <Box display={"flex"} flexDirection={"column"} gap={3}>
          <Typography variant='h3' >
            Do you want add image profile ?   
            </Typography>
            <Box display={"flex"} flexDirection={'row'} gap={2}>

              <Typography variant='h2'>
              Click here...</Typography> 
            <Button
        sx={{
    width: '120px',
    borderColor: 'secondary.main',
    color: 'secondary.main',
    '&:hover': {
      borderColor: 'secondary.dark',
      color: 'secondary.dark',
    }
  }}
        variant="outlined" component="label">
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
            </Box>

        </Box>
        
        
      </Box>
         <Paper
        elevation={8}
        sx={{
          // height:"300px",
          backgroundColor: 'primary.dark',
          p: 2,
          width: {
            xs: 600,
            sm: 750,
            md: 900,
            lg: 1050,
            xl: 1200,
          },
          maxWidth: '60%',
          boxSizing: 'border-box',
        }}
      >

        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <Typography sx={{mb:"20px"}} variant='h1'textAlign={'center'} >
            Add New User
          </Typography>

          <Box display={'flex'} flexDirection={'row'} gap={2}>
            <TextField
           
        fullWidth
        required
        label="First name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}

        error={Boolean(errors.firstname)}       
        helperText={errors.firstname}   
        
      />

       <TextField
       required
           
        fullWidth
        label="Last name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        error={Boolean(errors.lastname)}       
        helperText={errors.lastname}
        
      />
          </Box>

           

    <Box display={'flex'} flexDirection={'row'} gap={2}>
            <TextField
           
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={Boolean(errors.email)}      
        helperText={errors.email}
        
      />

       <TextField
           
        fullWidth
        label="Phone"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        error={Boolean(errors.mobile)}       
        helperText={errors.mobile}
        
      />
          </Box>

          <Box display={'flex'} flexDirection={'row'} gap={2}>
            <TextField
           
        fullWidth
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}       
        helperText={errors.password}
      />

       <TextField
           
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={Boolean(errors.confirmPassword)}       
        helperText={errors.confirmPassword}
        
      />

     
          </Box>

           <TextField
              name="status"
              label="Status"
              select
              fullWidth
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="banned">Banned</MenuItem>
            </TextField>
          

      


            <Button
            sx={(theme) => ({
    width: "200px",
    height: "70px",
    fontSize: 20,
    mt: "25px",
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  })}
  variant="contained"
  color="primary"
  onClick={handleSubmit}
>
  Add User
</Button>
          
          

        </Box>

          </Paper>



        </Box>
        <Box display={'flex'} sx={{
          mt:"30px", ml:'40px',
          width:'300px',
          height:'200px'
        }}>
        <img
      src={image} // استبدل هذا بمسار صورتك
      alt="Side visual"
      style={{
        height: 'auto',
        borderRadius: '16px',
        objectFit: 'cover',
      }}
    />
    </Box>
        </Box>

   
  );
};

export default AddUser;
