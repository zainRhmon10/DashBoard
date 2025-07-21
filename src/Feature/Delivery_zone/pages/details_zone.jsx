import { Box, Button, Chip, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { EditZone, getDetailsZone } from "../services/zone";
import ZoneMapDetails from "../component/zone_mapDetails";
import { DataExploration, Explore } from "@mui/icons-material";
import { grey, orange } from "@mui/material/colors";

const DetailsZone = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const[loadingEdit , setLoadingEdit ] = useState(false);

  const [formData , setFormData ] = useState({
    nameEn : '' ,
    nameAr : '',
    status :'',
    coordinates :[]
    
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePolygonComplete = (coords) => {
    console.log("Updating coordinates in formData:", coords);
    setFormData((prev) => ({ ...prev, coordinates: coords }));

    
  };


  const fetchZone = async () => {
  try {
    const data = await getDetailsZone(token, id);
    setData(data);
    setFormData({
      nameEn: data.name.en,
      nameAr: data.name.ar,
      status: data.status,
      coordinates: data.coordinates,
    });
  } catch (err) {
    console.error("Failed to fetch zone:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchZone();
}, [id, token]);


  const handleEdit = async () => {
  setLoadingEdit(true);
   const payload = {
    name: {
      en: formData.nameEn,
      ar: formData.nameAr
    },
    status: formData.status,
    coordinates:  JSON.stringify(formData.coordinates),
  };
  console.log("Submitting coords:", formData.coordinates);
    console.log("Payload being submitted:", payload)

  try {
    const response = await EditZone(token, id, payload);
    console.log("Coordinates before update:", formData.coordinates);
console.log("Polygon coordinates inside handleEdit:", formData.coordinates);
    if(response.status == 200){
      await fetchZone();
      }
  } catch (e) {
    console.error("Failed to edit zone:", e);
  } finally {
    setLoadingEdit(false);
  }
};

  if (loading)
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems={"center"}
      >
        <Typography variant="h2">Loading...</Typography>
      </Box>
    );

  if (!data)
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems={"center"}
      >
        <Typography variant="h2">Failed to load zone details.</Typography>
      </Box>
    );

  return (
    <Box
      ml={10}
      mt={4}
      display={"flex"}
      flexDirection={"column"}
      sx={{
        width: "100%",
        height: "100%",
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
          <DataExploration fontSize="large" sx={{ color: "orange" }} />
        </Box>
        <Typography variant="h3" sx={{mt:1.5}}>
          {data.name.en} ({data.name.ar})
        </Typography>
              
        </Box>
                  <Chip
              
                label={data.status ? "Enabled" : "Disabled"
                }
                color={data.status  ? "success" : "error"}
                size="medium"
                sx={{ width: "10%", fontSize: 20, ml: "30%",mt:1.5 }}
              />
      </Box>
      <Divider
      sx={{width:'85%', mb: 3 ,color:grey[200] , boxShadow:3}}
      />

      <ZoneMapDetails coordinates={formData.coordinates}  onPolygonChange={handlePolygonComplete} />

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
      name="nameEn"
      value={formData.nameEn}
      onChange={handleChange}
    />
    <TextField
      fullWidth
      label="Zone Name (AR)"
      name="nameAr"
      value={formData.nameAr}
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
        onClick={handleEdit}
        disabled={loadingEdit}
        
        sx={{ 
          width : '10%',
          fontSize:'14px',
          mb:'10px'
         }}
      >
        {loadingEdit ? 'Submitting...' : 'Save change'}
       </Button>

    </Box>
  );
};

export default DetailsZone;
