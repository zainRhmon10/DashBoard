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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddAPhoto, BrunchDining, DinnerDining, EmojiFoodBeverage, Fastfood, Icecream, LocalCafe, LocalPizza, LunchDining, PostAdd, RamenDining, Restaurant, SetMeal, SoupKitchen } from "@mui/icons-material";
import { foodIcons } from "./icons";

export const EditDialogTag = ({ onClose, open, onconfirm   }) => {
  const initialFormState = {
    nameEN: "",
    nameAR: "",
    icon: "",
  };

  const [formData, setFormData] = useState(initialFormState);


  useEffect(() => {
  if (!open) {
    setFormData(initialFormState); 
  }
}, [open]);
  

 const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'icon') {
    const selected = foodIcons.find(icon => icon.name === value);
    setFormData((prev) => ({ ...prev, icon: selected ? selected.emoji : "" }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


  
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
          height: "70%",
          maxWidth: "100%",
        },
      }}
    >
       <DialogTitle sx={{ fontSize: "30px"  ,color:"green"}}><PostAdd fontSize="20" /> Edit Attribute</DialogTitle>
       
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

          <Box mt={2}>
  <Box mb={1} fontWeight="bold">Select a Food Icon:</Box>
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
