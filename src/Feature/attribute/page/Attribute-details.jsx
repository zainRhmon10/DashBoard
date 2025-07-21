import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  CardMedia,
  Divider,
} from '@mui/material';
import { getAttribute } from '../services/attribute';
import image from "../../../assets/images/image3.png.png";
import { AuthContext } from '../../../context/AuthContext';

const AttributeDetails = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [ attribute, setAttribute] = useState(null);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttribute = async () => {
      try {
        const data = await getAttribute(token, id);
        setAttribute(data);
      } catch (error) {
        console.error('Failed to fetch attribute:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttribute();
  }, [id, token]);

  if (loading)
    return (
      <Box textAlign="center" display="flex" justifyContent="center" height="100%" alignItems={'center'}>
        <Typography variant='h2'>Loading...</Typography>
      </Box>
    );

  if (!attribute) return <Typography>Attribute not found</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" gutterBottom textAlign="center">
        Food Additives
      </Typography>
      <Typography variant="h5" textAlign="center" color="text.secondary" mb={4}>
  Learn more about this food customization option and its values.
</Typography>

      <Grid container spacing={0} justifyContent="center" alignItems="center" position="relative" wrap='nowrap'>
  {/* الصورة على اليسار وتتداخل فوق الورقة */}
  <Grid item xs={12} md={4} sx={{ zIndex: 2, position: 'relative' }} wrap="nowrap">
    <CardMedia
      component="img"
      image={image}
      alt="Food"
      sx={{
        borderRadius: 2,
        width: '100%',
        height: 'auto',
        position: 'relative',
        top: 0,
        left: 0,
        mt: 4,
        ml: { md: -6 }, // يجعل الصورة تدخل على الـ Paper
      }}
    />
  </Grid>

  {/* الورقة على اليمين وتمتد للخلف تحت الصورة */}
  <Grid item xs={12} md={7} sx={{ zIndex: 1 }}>
    <Paper

      sx={{
        background :"#F5F8FD",
        
        borderRadius :"20px",
        p: 4,
         width: { xs: '100%', md: '900px' }, // زيادة العرض على الشاشات الكبيرة
    minHeight: '500px', // زيادة ا
        position: 'relative',
        ml: { md: -40 }, // يجعل الورقة تتحرك تحت الصورة
        pl: { md: 50 }, // يدفع المحتوى لليمين داخل الورقة
      }}
    >
      <Box display={'flex'} flexDirection={'column'} >
        
      <Typography variant='h2' sx={{fontWeight :'bold', mb :"15px"}}>
        Describtion
      </Typography>
      <Typography variant='h3' >
        Name
      </Typography>
       <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb='10px'>
        <Typography variant='h3' sx={{color :' gray'}} >
         {attribute.name.en}  
      </Typography>
      <Typography variant='h3' color='secondary'>
         {attribute.name.ar}
      </Typography>
    
          
       </Box>
       <Divider  sx={{mt: '15px', mb:'12px'}}/>

      
       <Box display={'flex'} flexDirection={'row'} gap={2}>
        <Typography variant='h3' >
        Type : 
      </Typography>
      <Typography variant='h3' sx={{color :'gray'}}>
         {attribute.type}  



      </Typography>
       </Box>

       

       <Divider  sx={{mt: '15px', mb:'8px'}}/>
       
      

      <Typography variant="h3" mb="5px">
        Options
      </Typography>
      <ul>
        {attribute.options.map((opt) => (
          <li key={opt.id}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mb='10px'>
        <Typography variant='h3' sx={{color :'gray'}}>
         {opt.name.en}  
      </Typography>
      <Typography variant='h3' color='secondary'>
        {opt.name.ar}
      </Typography>

      
      

       </Box>
          </li>
        ))}
      </ul>
       <Divider  sx={{mt: '15px', mb:'15px'}}/>

       <Box display={'flex'} flexDirection={'row'} gap={2}>


      <Typography variant='h3' >
        Created at :
      </Typography>
      <Typography variant='h3' sx={{color :'gray'}}>
         {attribute.created_at}  



      </Typography>
      </Box>


      </Box>
         </Paper>
  </Grid>
</Grid>

    </Box>
  );
};

export default AttributeDetails;
// attribute.created_at