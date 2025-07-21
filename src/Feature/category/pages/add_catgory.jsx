import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import background3 from '../../../assets/images/ChatGPT Image 29 يونيو 2025، 02_00_04 م.png'
import { useContext, useState } from "react";
import ImageDefault from "../../../assets/images/camera-category.jpg";
import image1 from "../../../assets/images/featured-arae-1.2-280x460.jpg.png";
import image2 from "../../../assets/images/featured-arae-2.2-280x460.jpg.png";
import { AuthContext } from "../../../context/AuthContext";
import { addCategory } from "../services/category";

const AddCategory = () => {
  const initialFormState = {
    image: null,
    imagePreview: null,
    nameEN: "",
    nameAR: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const { token } = useContext(AuthContext);

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

  const Addcategory =async () =>{
    const form = new FormData();
    form.append('name[en]' ,formData.nameEN);
    form.append('name[ar]' , formData.nameAR);
    form.append('status' ,  formData.status=='Enable' ? 1:0);

    if(formData.image){
        form.append('image' , formData.image)
    }
    
    try {
          const response =  await addCategory(token, form);
          if(response.status == 201){
          window.location.reload(); 

          }
        } catch (error) {
          console.error("Failed to update attribute:", error);
        }
    
  }


  return (
    <Box
      display={"flex"}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >

        <Box>

        </Box>
      <Box
        display={"flex"}
        component="img"
        src={background3}
        position={"absolute"}
        alt="background1"
        sx={{
          
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      
      
      <Box
        display={"flex"}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(17, 17, 17, 0.15)",
          zIndex: 1,
        }}
      />

      <Box sx={{ p: 4, zIndex: 2 }}>
        <Grid container spacing={0} alignItems="center" wrap="nowrap">
          <Grid item xs={12} md={6} sx={{ mt: "90px", ml: "70px" }}>
            <Typography
              variant="h1"
              gutterBottom
              textAlign="center"
              sx={{
                background: "orange",
                borderRadius: 20,
                width: "350px",
                ml: "70px",
                mb: "40px",
              }}
            >
              Add New Category
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              gap={3}
              sx={{
                mr: "200px",
              }}
            >
              <Avatar
                src={formData.imagePreview || ImageDefault}
                alt="User Avatar"
                sx={{ width: 150, height: 150 }}
              />
              <Box display={"flex"} flexDirection={"column"} gap={3}>
                <Typography variant="h4">Do you want add image ?</Typography>
                <Box display={"flex"} flexDirection={"row"} gap={2}>
                  <Typography variant="h3">Click here...</Typography>
                  <Button
                    sx={{
                      width: "120px",
                      borderColor: "secondary.main",
                      color: "secondary.main",
                      "&:hover": {
                        borderColor: "secondary.dark",
                        color: "secondary.dark",
                      },
                    }}
                    variant="outlined"
                    component="label"
                  >
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
            <Box
              display="flex"
              flexDirection="column"
              sx={{
    width: "100%",
    maxWidth: "500px",
  }}
            >
              <Box display="flex" flexDirection="row" gap={2}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Name (en)"
                  name="nameEN"
                  value={formData.nameEN}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Name (ar)"
                  name="nameAR"
                  value={formData.nameAR}
                  onChange={handleChange}
                />
              </Box>

              <TextField
                margin="normal"
                name="status"
                label="status"
                select
                fullWidth
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="Enable">Enable</MenuItem>
                <MenuItem value="Disable">Disable</MenuItem>
              </TextField>

              <Button
                          variant="contained"
                          color="primary"
                          sx={{ fontSize: "20px", mt: 6, width: "120px", height: "50px" }}
                          onClick={Addcategory}
                        >
                          add
                        </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              textAlign="center"
              display="flex"
              gap={4}
              alignItems="flex-start" // ← هذا يضبط محاذاة الصور من الأعلى
            >
              <img
                src={image1}
                alt="Attribute Visual"
                style={{
                  width: "37%",
                  maxWidth: "500px",
                  borderRadius: "12px",
                  marginTop: "50px",
                }}
              />

              <img
                src={image2}
                alt="Attribute Visual"
                style={{
                  width: "37%",
                  maxWidth: "500px",
                  borderRadius: "12px",
                  marginTop: "200px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddCategory;
