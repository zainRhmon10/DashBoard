import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  colors,
  MenuItem,
  IconButton,
} from "@mui/material";
import image1 from "../../../assets/images/featured-arae-1.2-280x460.jpg.png";
import image2 from "../../../assets/images/featured-arae-2.2-280x460.jpg.png";
import { useContext, useState } from "react";
import { Add, RemoveCircleOutline } from "@mui/icons-material";
import { CreateAttribute } from "../services/attribute";
import { AuthContext } from "../../../context/AuthContext";
import background3 from '../../../assets/images/ChatGPT Image 29 يونيو 2025، 02_00_04 م.png'

const AddAttribute = () => {
  const { token } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // 1) type
    if (!formData.type) newErrors.type = "نوع الميزة مطلوب";

    // 2) names
    if (!formData.nameEN.trim()) newErrors.nameEN = "Name (en) مطلوب";
    if (!formData.nameAR.trim()) newErrors.nameAR = "Name (ar) مطلوب";

    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [formData, setFormData] = useState({
    nameEN: "",
    nameAR: "",
    type: "",
    options: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const addOption = () => {
    if (formData.options.length < 4) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, { en: "", ar: "" }],
      }));
    }
  };

  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const Addfeature = async () => {
    if (!validate()) return;
    const form = new FormData();
    form.append("name[en]", formData.nameEN);
    form.append("name[ar]", formData.nameAR);
    form.append("type", formData.type);

    formData.options.forEach((option, index) => {
      form.append(`options[${index}][en]`, option.en);
      form.append(`options[${index}][ar]`, option.ar);
    });

    try {
      await CreateAttribute(token, form);
      window.location.reload(); 
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

       <Box sx={{ p: 4 , zIndex:2}}>
      <Grid container spacing={15} alignItems="center" wrap="nowrap">
        {/* الفورم على اليسار */}
        <Grid item xs={12} md={6} sx={{ mt: "100px", ml: "80px" }}>
          <Typography
            variant="h1"
            gutterBottom
            textAlign="center"
            sx={{
              background: "orange",
              borderRadius: 20,
              width: "350px",
              ml: "70px",
            }}
          >
            Add New Feature
          </Typography>

          <Typography variant="h5" textAlign="center" mb={4} mt={3}>
            Define a new product feature like size, extra toppings, or sauce
            preferences.s
          </Typography>

          <Box display={"flex"} flexDirection={"column"} sx={{
    width: "100%",
    maxWidth: "500px",
  }}>
            <TextField
              margin="normal"
              name="type"
              label="Type"
              select
              fullWidth
              value={formData.type}
              onChange={handleChange}
              error={Boolean(errors.type)}
              helperText={errors.type}
            >
              <MenuItem value="">-- Choose --</MenuItem>{" "}
              {/* فارغ لإجبار المستخدم */}
              <MenuItem value="basic">Basic</MenuItem>
              <MenuItem value="additional">Additional</MenuItem>
            </TextField>
            <Box display="flex" flexDirection="row" gap={2}>
              <TextField
                margin="normal"
                fullWidth
                label="Name (en)"
                name="nameEN"
                value={formData.nameEN}
                onChange={handleChange}
                error={Boolean(errors.nameEN)}
                helperText={errors.nameEN}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Name (ar)"
                name="nameAR"
                value={formData.nameAR}
                onChange={handleChange}
                error={Boolean(errors.nameAR)}
                helperText={errors.nameAR}
              />
            </Box>
            {formData.options.map((option, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={2}
                mt={1}
              >
                <TextField
                  fullWidth
                  label={`Option ${index + 1} (en)`}
                  value={option.en}
                  onChange={(e) =>
                    handleOptionChange(index, "en", e.target.value)
                  }
                />
                <TextField
                  fullWidth
                  label={`Option ${index + 1} (ar)`}
                  value={option.ar}
                  onChange={(e) =>
                    handleOptionChange(index, "ar", e.target.value)
                  }
                />
                <IconButton
                  onClick={() => removeOption(index)}
                  color="error"
                  aria-label="remove option"
                >
                  <RemoveCircleOutline />
                </IconButton>
              </Box>
            ))}

            {/* ADD BUTTON */}
            {formData.options.length < 4 && (
              <Box mt={2}>
                <Button
                  onClick={addOption}
                  startIcon={<Add />}
                  variant="outlined"
                  color="inherit"
                >
                  Add Option
                </Button>
              </Box>
            )}
          </Box>

          {/* يمكنك إضافة حقول أخرى هنا */}

          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: "20px", mt: 6, width: "120px", height: "50px" }}
            onClick={Addfeature}
          >
            add
          </Button>
        </Grid>

        {/* الصورة على اليمين */}
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

export default AddAttribute;
