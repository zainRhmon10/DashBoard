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
import background3 from "../../../assets/images/ChatGPT Image 29 يونيو 2025، 02_00_04 م.png";
import { useContext, useState } from "react";
import ImageDefault from "../../../assets/images/camera-category.jpg";
import image1 from "../../../assets/images/featured-arae-1.2-280x460.jpg.png";
import image2 from "../../../assets/images/featured-arae-2.2-280x460.jpg.png";
import { addCategory } from "../../category/services/category";
import { AuthContext } from "../../../context/AuthContext";
import { addNewTag } from "../services/api";
import {
  BrunchDining,
  DinnerDining,
  EmojiFoodBeverage,
  Fastfood,
  Icecream,
  LocalCafe,
  LocalPizza,
  LunchDining,
  RamenDining,
  Restaurant,
  SetMeal,
  SoupKitchen,
} from "@mui/icons-material";
import { foodIcons } from "../component/icons";

const AddTag = () => {
  const initialFormState = {
    nameEN: "",
    nameAR: "",
    icon: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'icon') {
      const selected = foodIcons.find(icon => icon.name === value);
      setFormData((prev) => ({ ...prev, icon: selected ? selected.emoji : "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  

  const Addtag = async () => {
    const form = new FormData();
    form.append("name[en]", formData.nameEN);
    form.append("name[ar]", formData.nameAR);
    form.append("icon", formData.icon);

    try {
       const response = await addNewTag(token, form);
      if(response.status == 201){
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update attribute:", error);
    }
  };

  return (
    <Box
      display={"flex"}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        overflowX: "auto",
      }}
    >
      <Box></Box>
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
        <Grid container spacing={10} alignItems="center" wrap="nowrap">
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
              Add New Tag
            </Typography>

            <Typography variant="h5" textAlign="left" mb={4} mt={3}>
              Define a new tag to categorize or label food items for easier
              filtering and organization.
              <br /> Tags can represent themes like Spicy, Vegetarian,
              Gluten-Free, or Kids Menu .
            </Typography>

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

              <Box mt={2}>
                <Box mb={1} fontWeight="bold">
                  Select a Food Icon:
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  <TextField
                    select
                    label="Select Icon"
                    name="icon"
                    value={
                      foodIcons.find(i => i.emoji === formData.icon)?.name || ""
                    }
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    {foodIcons.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <span style={{ fontSize: "1.5rem" }}>{option.emoji}</span>
                          {option.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: "20px", mt: 6, width: "120px", height: "50px" }}
                onClick={Addtag}
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
              alignItems="flex-start"
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

export default AddTag;
