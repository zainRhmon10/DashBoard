import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AddAPhoto, PostAdd } from "@mui/icons-material";
import dialogImage from '../../../assets/images/camera-category.jpg'

export const EditDialogCategory = ({ onClose, open, onconfirm   }) => {
  const initialFormState = {
    image: null,
    imagePreview: null,
    nameEN: "",
    nameAR: "",
    status: "",
  };

  const [formData, setFormData] = useState(initialFormState);


  useEffect(() => {
  if (!open) {
    setFormData(initialFormState); 
  }
}, [open]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleimageUpload = (e) => {
    const file = e.target.files[0];
    if(file) {
      setFormData ((prev) => ({
        ...prev,
        image : file ,
        imagePreview : URL.createObjectURL(file),
      }))
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: {
            xs: "90vw",
            sm: "80vw",
            md: "600px",
            lg: "600px",
            xl: "600px",
          },
          height: "80%",
          maxWidth: "100%",
        },
      }}
    >
      <Box sx={{position :'relative'}}>
        <Box
        component={'img'}
        src={formData.imagePreview || dialogImage}
        alt="User Avatar"
        
          sx={{ width:'100%', height: 250, 

            objectFit :'cover'
          }}
       />
        <input
    accept="image/*"
    type="file"
    id="image-upload"
    hidden
    onChange={handleimageUpload}
  />

  {/* الزر المرتبط بـ input */}
  <label htmlFor="image-upload">
    <IconButton
      component="span"
      sx={{
        position: "absolute",
        bottom: 2,
        right: 40,
        backgroundColor: "white",
        width: 50,
        height: 50,
        ":hover": { backgroundColor: "#eee" },
      }}
    >
      <AddAPhoto fontSize="large" />
    </IconButton>
  </label>       
  </Box>
          
       
      <DialogContent>
        <Box display="flex" flexDirection="column">
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
        </Box>
      </DialogContent>

      <DialogActions>
       <Button onClick={onClose} color="primary">
  Cancel
</Button>

        <Button
          onClick={() =>
             onconfirm(formData)}
          color="success"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
