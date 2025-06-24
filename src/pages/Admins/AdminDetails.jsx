import { useContext, useEffect, useState } from 'react';
import { getRoleById ,getRoles} from '../../services/Role';
import { updateAdmin, changeStatus } from '../../services/admin.js';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  MenuItem,
  Paper,
  Container
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
  PhotoCamera as PhotoIcon,
  PowerSettingsNew as PowerIcon,
  Shield as ShieldIcon
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

const AdminDetails = ({ admin, onAdminUpdate }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { token } = useContext(AuthContext);
  const [Roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    role_id: admin?.role_id || '',
    status: admin?.status || 1,
    image: null,
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
      const fetchRoles = async () => {
        try {
          const response = await getRoles(token);
          console.log("Roles API response:", response.data); 
          const roles = response.data.roles || response.data.data || [];
          setRoles(roles);
        } catch (error) {
          console.error('Error fetching roles:', error);
          setRoles([]);
        }
      };
  
      if (token) fetchRoles();
    }, [token]);
  

  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name || '',
        email: admin.email || '',
        role_id: admin.role_id || '',
        status: admin.status || 1,
        image: null,
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleStatusChange = (e) => {
    setForm((prev) => ({
      ...prev,
      status: e.target.checked ? 1 : 0,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
   

    try {
      console.log(form);
      await updateAdmin(token, form, admin.id);
      setOpen(false);
      showSnackbar('Admin updated successfully!');
      
      if (onAdminUpdate) {
        onAdminUpdate();
      }
    } catch (error) {
      console.error('Failed to update admin:', error);
      showSnackbar('Failed to update admin', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    setStatusLoading(true);
    try {
      await changeStatus(token, admin.id);
      showSnackbar(`Admin status changed to ${admin.status === 1 ? 'Inactive' : 'Active'}`);
      
      if (onAdminUpdate) {
        onAdminUpdate();
      }
    } catch (error) {
      console.error('Failed to change status:', error);
      showSnackbar('Failed to change admin status', 'error');
    } finally {
      setStatusLoading(false);
    }
  };

  const getStatusChip = (status) => {
    return (
      <Chip
        label={status === 1 ? 'Active' : 'Inactive'}
        color={status === 1 ? 'success' : 'error'}
        variant="filled"
        size="medium"
      />
    );
  };

  useEffect(() => {
    const fetchRoleName = async () => {
      try {
        const res = await getRoleById(token, admin.role_id);
        const name = res?.data?.role?.name?.en; 
        setRoleName(name || `Role ${admin.role_id}`);
      } catch (error) {
        console.error('Error fetching role name:', error);
        setRoleName(`Role ${admin.role_id}`);
      }
    };

    if (admin?.role_id && token) {
      fetchRoleName();
    }
  }, [token, admin?.role_id]);

  if (!admin) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "60vh" }}
      >
        <Typography variant="h4" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: 'primary.dark'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={admin.image ? `http://localhost:8000/api/images${admin.image}` : undefined}
              sx={{
                width: 100,
                height: 100,
                fontSize: '2rem'
              }}
            >
              {!admin.image && <PersonIcon sx={{ fontSize: '2.5rem' }} />}
            </Avatar>
            
            <Box>
              <Typography variant="h4" fontWeight="600" color="text.primary" gutterBottom>
                {admin.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {admin.email}
              </Typography>
              <Box display="flex" gap={1} alignItems="center">
                {getStatusChip(admin.status)}
                {roleName && (
                  <Chip 
                    icon={<ShieldIcon />}
                    label={roleName} 
                    variant="outlined"
                    color="secondary.main"
                  />
                )}
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Button 
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setOpen(true)}
              sx={{
                
                '&:hover': {
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              Edit
            </Button>
            <Button 
              variant="outlined"
              startIcon={<PowerIcon />}
              onClick={handleStatusToggle}
              disabled={statusLoading}
              color={admin.status === 1 ? 'error' : 'success'}
            >
              {statusLoading ? 'Updating...' : admin.status === 1 ? 'Deactivate' : 'Activate'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Edit Dialog */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main',
          fontWeight: 600,
        }}>
          Edit Admin Profile
        </DialogTitle>
        <DialogContent sx={{ p: 3 ,backgroundColor:'primary.main'}}>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
               
                label="Full Name"
                name="name"
                fullWidth
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
              name="role_id"
              label="Role"
              select
              fullWidth
              value={form.role_id}
              onChange={handleChange}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.status === 1}
                      onChange={handleStatusChange}
                       color="secondary"
                    />
                  }
                  label={form.status === 1 ? 'Active' : 'Inactive'}
                />
              </Box>
            </Grid>
            
                     
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  component="label" 
                  startIcon={<PhotoIcon />}
                  color="secondary"
                >
                  Upload Profile Picture
                  <input 
                    hidden 
                    accept="image/*" 
                    type="file" 
                    name="image" 
                    onChange={handleChange} 
                  />
                </Button>
                {form.image && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Selected: {form.image.name}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 ,backgroundColor:'primary.main'}}>
          <Button onClick={() => setOpen(false)} sx={{color:'primary.light'}}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "secondary",
              '&:hover': {
                backgroundColor: "primary.dark",
              }
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' ,backgroundColor:'primary.dark',width:"30rem"} }>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <PersonIcon sx={{ fontSize: '4rem', mr: 2, }} />
                <Typography variant="h5" fontWeight="600" fontSize={'1.5rem'} >
                  Personal Information
                </Typography>
              </Box>
              <Box sx={{ pl: 1 }}>
                <Box mb={2}>
                  <Typography variant="subtitle2" color="text.secondary" fontSize={"1.4rem"}>Name</Typography>
                  <Typography variant="h6" fontSize={"1.2rem"}>{admin.name}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle2" color="text.secondary" fontSize={"1.4rem"}>Role ID</Typography>
                  <Typography variant="h6" fontSize={"1.2rem"}>#{admin.role_id}</Typography>
                </Box>
                {roleName && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" fontSize={"1.4rem"}>Role</Typography>
                    <Typography variant="h6" fontSize={"1.2rem"}>{roleName}</Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' ,backgroundColor:'primary.dark',width:"30rem"}}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={3}>
                <EmailIcon sx={{ fontSize: '4rem', mr: 2,}} />
                <Typography variant="h5" fontWeight="600" fontSize={'1.5rem'}>
                  Contact Information
                </Typography>
              </Box>
              <Box sx={{ pl: 1 }}>
                <Box mb={2}>
                  <Typography variant="subtitle2" color="text.secondary" fontSize={"1.4rem"}>Email</Typography>
                  <Typography variant="h6" fontSize={"1.2rem"}>{admin.email}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="subtitle2" color="text.secondary" fontSize={"1.4rem"}>Status</Typography>
                  <Typography variant="h6" fontSize={"1.2rem"}>
                    {admin.status === 1 ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
                {admin.created_at && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" fontSize={"1.4rem"}>Member Since</Typography>
                    <Typography variant="h6" fontSize={"1.2rem"}>
                      {new Date(admin.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Notification Snackbar */}
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
    </Container>
  );
};

export default AdminDetails;