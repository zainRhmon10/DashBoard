import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox, Grid, Container } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getAllPermissions, createRole, getRoleById, updateRole } from '../../services/Role';
import { AuthContext } from "../../context/AuthContext"; 
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import { Snackbar, Alert } from '@mui/material';



//this the most hard one listen carefull
const AddRole = () => {
  const { roleId } = useParams();
  const isEditMode = Boolean(roleId);
  const [nameEn,setNameEn] = useState('');
  const [nameAr,setNameAr] = useState('');
  const [status,setStatus] = useState(1);
  
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "secondary.dark" },
      "&:hover fieldset": { borderColor: "secondary.dark" },
      "&.Mui-focused fieldset": { borderColor: "secondary.dark" },
    },
    "& .MuiInputLabel-root": { color: "secondary.dark" },
    "& .MuiInputLabel-root.Mui-focused": { color: "secondary.dark" },
    "& .MuiInputBase-input": {
      color: "secondary.dark",
      caretColor: "#997f35",
    },
  };

  const [permissionList, setPermissionList] = useState([]);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };


  const handlePermissionChange = (key) => {
    setSelectedPermissions(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key]
    );
  }

  // fetch permissions and role data (if in edit mode)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // fetch all permissions
        const permissionsResponse = await getAllPermissions(token);
        const permData = permissionsResponse?.data?.permissions;
        const permArray = Object.entries(permData).map(([key, label]) => ({
          key,
          label,
        }));
        setPermissionList(permArray);
        

        
        if (isEditMode) {
          const roleResponse = await getRoleById(token, roleId);
          const role = roleResponse.data.role;
          
          // here update the textfield and status 
          setNameAr(role.name.ar);
          setNameEn(role.name.en);
          setStatus(role.status.toString());
          
          //  handle both array and object permission formats
          let permissions = [];
          if (Array.isArray(role.permissions)) {
            permissions = role.permissions;
          } 
          // handle object format
          else if (role.permissions && typeof role.permissions === 'object') {
            permissions = Object.keys(role.permissions).filter(
              key => role.permissions[key] === true
            );
          }
          
          setSelectedPermissions(permissions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showSnackbar(
          `Failed to load ${isEditMode ? "edit" : "add"} role page. Please try again.`, 
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, roleId, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    
    try {
      if (!nameEn || !nameAr) {
        showSnackbar("Please fill in all required fields", "error");
        return;
      }
      
      // pPrepare the role data object for API call
      const payload = {
        name_en: nameEn,
        name_ar: nameAr,
        status: status,
        permissions: selectedPermissions
      };
      
      if (isEditMode) {
        // update existing role
        await updateRole(token, payload, roleId);
        showSnackbar("Role updated successfully!");
      } else {
        // create new role
        await createRole(token, payload);
        showSnackbar("Role created successfully!");
      }
      
      navigate('/roles');
      
    } catch (error) {
      console.error(`${isEditMode ? "Update" : "Create"} failed:`, error);
      const errorMessage = error.response?.data?.message || 
        `Failed to ${isEditMode ? "update" : "create"} role. Please try again.`;
      showSnackbar(errorMessage, "error");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <Snackbar
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
      
      <Container maxWidth="lg">
        <Box my={5}>
          <Paper
            elevation={8}
            sx={{ backgroundColor: "primary.dark", p: { xs: 2, sm: 4 } }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={4}
              flexWrap="wrap"
            >
              <ControlPointOutlinedIcon sx={{ fontSize: 32 }} />
              <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2rem" }}>
                {isEditMode ? "Edit Role" : "Add New Role"}
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                {/* English Name */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="English Name"
                    value={nameEn}
                    onChange={e => setNameEn(e.target.value)}
                    fullWidth
                    sx={inputStyles}
                  />
                </Grid>
                
                {/* Arabic Name */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Arabic Name"
                    value={nameAr}
                    onChange={e => setNameAr(e.target.value)}
                    fullWidth
                    inputProps={{ dir: "rtl" }}
                    sx={inputStyles}
                  />
                </Grid>
                
                {/* Status Switch */}
                <Grid item xs={12} sm={2}>
                  <FormControlLabel
                    control={
                      <Switch 
                        color="secondary"
                        checked={status === "1"}
                        onChange={e => setStatus(e.target.checked ? "1" : "0")}
                      />
                    }
                    label="Active"
                  />
                </Grid>
                
                {/* Submit Button */}
                <Grid item xs={12} sm={2}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : isEditMode ? (
                      "UPDATE"
                    ) : (
                      "ADD"
                    )}
                  </Button>
                </Grid>
              </Grid>

              <Box mt={4}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel
                    component="legend"
                    sx={{
                      ml: "1rem",
                      fontSize: "1.4rem",
                      color: "text.primary",
                      "&.Mui-focused": {
                        color: "text.primary",
                      },
                    }}
                  >
                    Permissions:
                  </FormLabel>
                  
                  <Grid container spacing={2} mt={1}>
                    {loading ? (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="200px"
                        width="100%"
                      >
                        <CircularProgress color="common" />
                      </Box>
                    ) : (
                      permissionList.map(({ key, label }) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={key} width={250}>
                          <FormControlLabel
                            sx={{
                              width: "100%",
                              "& .MuiFormControlLabel-label": {
                                fontSize: "1.2rem",
                              },
                            }}
                            control={
                              <Checkbox
                                size="large"
                                sx={{
                                  "& .MuiSvgIcon-root": { fontSize: "30px" },
                                  "&.Mui-checked": { color: "secondary.dark" },
                                  "&.Mui-focused": { color: "secondary.dark" },
                                }}
                                checked={selectedPermissions.includes(key)}
                                onChange={() => handlePermissionChange(key)}
                              />
                            }
                            label={label}
                          />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </FormControl>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default AddRole;

//rem this didn't finished yet there is a problem in edit (permissions) they didn't show fix it