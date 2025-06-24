import { useState, useContext, useEffect,useCallback } from 'react';
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { createAdmin } from '../../services/admin';
import { getRoles } from '../../services/Role';
import image from "../../assets/images/Leaf_01.png";
import { textFieldStyle } from '../../components/textFieldStyle';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddAdmin = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { token } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [Roles, setRoles] = useState([]);

  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    image: null,
    imagePreview: null,
    status: 'active',
    role_id: 1
  });
  
 const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles(token);
        console.log("Roles API response:", response.data); // Debug only
        const roles = response.data.roles || response.data.data || [];
        setRoles(roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles([]);
      }
    };

    if (token) fetchRoles();
  }, [token]);

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!adminData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!adminData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!adminData.password) newErrors.password = 'كلمة المرور مطلوبة';
    if (adminData.password !== adminData.password_confirmation) {
      newErrors.password_confirmation = 'كلمتا المرور غير متطابقتين';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Field handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  // ✅ Submit
  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await createAdmin(token, adminData);
     showSnackbar('admin added successfully!');
      setAdminData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        image: null,
        imagePreview: null,
        status: 'active',
        role_id: 1
      });
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
      showSnackbar('Failled to add admin.','error');
    }
  };

  return (
    <><Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert
              severity={snackbarSeverity}
              onClose={() => setSnackbarOpen(false)}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>


    <Box display="flex" flexDirection="row">
      <Box
        flexDirection="column"
        gap={3}
        sx={{
          alignContent: 'center',
          mt: "30px",
          py: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {/* Avatar & Upload */}
        <Box display="flex" alignItems="center" gap={3} sx={{ mr: '200px' }}>
          <Avatar
            src={adminData.imagePreview || ''}
            alt="User Avatar"
            sx={{ width: 200, height: 200 }}
          />
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h3">Do you want to add an image profile?</Typography>
            <Box display="flex" flexDirection="row" gap={2}>
              <Typography variant="h2">Click here...</Typography>
              <Button  sx={{
    width: '120px',
    borderColor: 'secondary.main',
    color: 'secondary.main',
    '&:hover': {
      borderColor: 'secondary.dark',
      color: 'secondary.dark',
    }
  }} variant="outlined" component="label">
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Form */}
        <Paper
          elevation={8}
          sx={{
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
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography sx={{ mb: "20px" }} variant="h1" textAlign="center">
              Add New Admin
            </Typography>

            <TextField
              fullWidth
              required
              label="Full Name"
              name="name"
              value={adminData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={adminData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              value={adminData.password_confirmation}
              onChange={handleChange}
              error={Boolean(errors.password_confirmation)}
              helperText={errors.password_confirmation}
              sx={textFieldStyle}
            />

            <TextField
              name="status"
              label="Status"
              select
              fullWidth
              value={adminData.status}
              onChange={handleChange}
              sx={textFieldStyle}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="banned">Banned</MenuItem>
            </TextField>

            <TextField
              name="role_id"
              label="Role"
              select
              fullWidth
              value={adminData.role_id}
              onChange={handleChange}
              sx={textFieldStyle}
            >
              {Roles.length === 0 ? (
                <MenuItem disabled>Loading roles...</MenuItem>
              ) : (
                Roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name?.en || role.name || `Role ${role.id}`}
                  </MenuItem>
                ))
              )}
            </TextField>

            <Button
              sx={{ width: "200px", height: "70px", fontSize: 20, mt: "25px" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Add Admin
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Side Image */}
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

    </Box></>
  );
};

export default AddAdmin;
