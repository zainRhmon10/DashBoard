import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Divider } from '@mui/material';
import ZoneMap from '../component/zone_map';
import { AddLocation, AddLocationAlt, Create, DataExploration } from '@mui/icons-material';
import { createZone } from '../services/zone';
import { AuthContext } from '../../../context/AuthContext';
import { grey } from '@mui/material/colors';

const AddZone = () => {

  const {token} = useContext(AuthContext);
  const [clearPolygon, setClearPolygon] = useState(null);
  const [formData, setFormData] = useState({
    nameEN: '',
    nameAR: '',
    status: '',
    coordinates: [],
  });
  const[loading,setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePolygonComplete = (coords) => {
    setFormData((prev) => ({ ...prev, coordinates: coords }));
  };

  const handleSubmit = async() => {
   const payload = {
    name: {
      en: formData.nameEN,
      ar: formData.nameAR
    },
    status: formData.status,
    coordinates:  JSON.stringify(formData.coordinates),
  };
    try{
       const response = await createZone(token, payload);
      setLoading(true);
      if(response.status == 201){
        window.location.reload(); 
      }

    }catch(e){
       console.error("Failed to update attribute:", e);

    }finally{
      setLoading(false)
    }
  };

  return (
    <Box
    display={'flex'}
    flexDirection={'column'}
    ml={10}
    mt={3}

    sx={{
      width:'100%',
      height : '100%',
    }}
    
    >
      <Box display={"flex"} flexDirection={"row"} justifyContent={'space-between'}  gap={2} sx={{mb:2, width:'85%'}} >

        <Box
        display={'flex'}
        gap={2}

        >
          <Box
          textAlign="center"
          justifyContent="center"
          sx={{
            backgroundColor: "rgba(230, 145, 18, 0.16)", 
            height: 50,
            width:50,
            pt: 0.2,
            borderRadius: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddLocationAlt fontSize="large" sx={{ color: "orange" }} />
        </Box>
        <Typography variant="h3" sx={{mt:1.5}}>
          Create New Zone
        </Typography>
              
        </Box> 
         <Button
    variant="outlined"
    sx={{height:'45px',
      mr:'25px',
      mt:'5px'
    }}
    color="error"
    onClick={() => clearPolygon && clearPolygon()}
    disabled={!clearPolygon}
  >
    Delete Polygon
  </Button>
      </Box>      
      <Divider
      sx={{width:'85%', mb: 3 ,color:grey[200] , boxShadow:3}}
      />
      

      <ZoneMap
       onPolygonComplete={handlePolygonComplete} 
      setClearPolygonFn={setClearPolygon}
      />
<Box 
  mt={2}
  mb={1}
  display="flex"
  flexDirection="row"
  justifyContent="space-between"
  sx={{ width: '85%' }}
>
  <Box
    display="flex"
    flexDirection="row"
    gap={2}
    sx={{ width: '36%' }} 
  >
    <TextField
      fullWidth
      label="Zone Name (EN)"
      name="nameEN"
      value={formData.nameEN}
      onChange={handleChange}
    />
    <TextField
      fullWidth
      label="Zone Name (AR)"
      name="nameAR"
      value={formData.nameAR}
      onChange={handleChange}
    />
    <TextField
        fullWidth
        select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        sx={{ mb: 2 ,
           width:'60%'
        }}
      >
        <MenuItem value="1">Enable</MenuItem>
        <MenuItem value="0">Disable</MenuItem>
      </TextField>

      

  </Box>

  


</Box>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        
        sx={{ 
          width : '10%',
          fontSize:'17px',
          mb:'10px'
         }}
      >
        {loading ? 'Submitting...' : 'Add Zone'}
       </Button>

      
    </Box>
  );
};

export default AddZone;
