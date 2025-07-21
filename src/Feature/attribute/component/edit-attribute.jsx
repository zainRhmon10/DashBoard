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
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { PostAdd } from "@mui/icons-material";

export const EditDialog = ({ onClose, open, onconfirm }) => {
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
      <DialogTitle sx={{ fontSize: "30px"  ,color:"green"}}><PostAdd fontSize="20" / > Edit Attribute</DialogTitle>
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
            name="type"
            label="Type"
            select
            fullWidth
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value="basic">Basic</MenuItem>
            <MenuItem value="additional">Additional</MenuItem>
          </TextField>

          {/* OPTIONS SECTION */}
          {formData.options.map((option, index) => (
            <Box key={index} display="flex" alignItems="center" gap={2} mt={1}>
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
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}

          {/* ADD BUTTON */}
          {formData.options.length < 4 && (
            <Box mt={2}>
              <Button
                onClick={addOption}
                startIcon={<AddIcon />}
                variant="outlined"
                color="inherit"
              >
                Add Option
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions >
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
       <Button
       
  onClick={() => onconfirm(formData)}
  color="success"
  variant="contained"
>
  Save
</Button>
      </DialogActions>
    </Dialog>
  );
};
