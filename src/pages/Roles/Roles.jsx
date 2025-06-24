import { useState, useMemo, useCallback , useEffect , useContext} from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getRoles , changeStatus , deleteRole} from '../../services/Role';
import { AuthContext } from "../../context/AuthContext.jsx";
import { Chip } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from 'react-router-dom';

const Roles = () => {
  const {token} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading ,setLoading] = useState(false);
  const [rolesData,setRolesData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);



    const showSnackbar = (message, severity = "success") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    };



  useEffect(
    ()=>{
      const handleGetRoles = async ()=>{
        setLoading(true);
        try{
          const res = await getRoles(token);
          setRolesData(res.data.roles);
        }catch(err){
          showSnackbar("Failed to load Roles. Please try again.", "error");
          console.log(err);
        }finally{
          setLoading(false);
        }

      };
      handleGetRoles();

  },[token]);


  const handlePermissionsClick = useCallback((event, permissions) => {
    setAnchorEl(event.currentTarget);
    setSelectedPermissions(permissions);
  }, []);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedPermissions([]);
  };

   const handleDelete = useCallback((roleId) => {
    setDeletingId(roleId);
    setDeleteConfirmOpen(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deletingId) return;
    
    setDeleteLoading(true);
    try {
      await deleteRole(token, deletingId);
      setRolesData(prev => prev.filter(role => role.id !== deletingId));
      showSnackbar("Role deleted successfully!");
    } catch (error) {
      console.error('Delete role error:', error);
      showSnackbar("Failed to delete role", "error");
    } finally {
      setDeleteLoading(false);
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    }
  }, [deletingId, token]);

   const handleEdit = useCallback((roleId) => {
    navigate(`/add-role/${roleId}`);
  }, [navigate]);

 

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 100, headerClassName: 'header-cell' },
    { field: 'name', headerName: 'Name', width:100, headerClassName: 'header-cell' },
    { field: 'created_at', headerName: 'Created at', flex:1, headerClassName: 'header-cell' },
    {
      field: 'permissions',
      headerName: 'Permissions',
      flex:2,
      headerClassName: 'header-cell',
      renderCell: (params) => {
        const maxVisible = 2;
        const visiblePermissions = params.value.slice(0, maxVisible);
        const remainingCount = params.value.length - maxVisible;

        return (
          <Box
            sx={{
              cursor: 'pointer',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              py: 1,
            }}
            onClick={(e) => handlePermissionsClick(e, params.value)}
          >
            {visiblePermissions.map((permission, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                }}
              >
                {permission}
              </Typography>
            ))}
            {remainingCount > 0 && (
              <Typography
                variant="body2"
                sx={{ fontSize: '0.9rem' }}
              >
                + {remainingCount} more
              </Typography>
            )}
          </Box>
        );
      }
    },
 {
  field: 'status',
  headerName: 'Status',
  width: 150,
  renderCell: (params) => {
    const status = params.row.status;
    const handleStatusClick = async () => {
      try {
        await changeStatus(token, params.id);
        const res = await getRoles(token);
        setRolesData(res.data.roles);
        showSnackbar("status changed.");
      } catch (error) {
        console.error('Failed to change status:', error);
        showSnackbar("Failed to change the status. Please try again.", "error");
      }
    };

    return (
      <Chip
        label={status === 1 ? 'Active' : status === 0 ? 'Banned' : 'Unknown'}
        color={status === 1 ? 'success' : status === 0 ? 'error' : 'default'}
        onClick={handleStatusClick}
        clickable
      />
    );
  },
},
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'header-cell',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            aria-label="edit"
             onClick={() => handleEdit(params.id)}
            sx={{ color: 'action.main', '&:hover': { backgroundColor: 'action.light' } }}
          >
            <EditOutlinedIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.id)}
            disabled={deleteLoading && deletingId === params.id}
            sx={{ color: 'error.main', '&:hover': { backgroundColor: 'action.main' } }}
          >
            {deleteLoading && deletingId === params.id ? (
              <CircularProgress size={20} color="error" />
            ) : (
              <DeleteOutlineOutlinedIcon sx={{ fontSize: 24 }} />
            )}
          </IconButton>
        </Box>
      )
    }
  ], [handlePermissionsClick, handleDelete, deleteLoading, deletingId]);

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

       <Dialog
        open={deleteConfirmOpen}
        onClose={() => !deleteLoading && setDeleteConfirmOpen(false)}
      >
        <DialogTitle sx={{ backgroundColor: "primary.dark" }}>Delete Role</DialogTitle>
        <DialogContent sx={{ backgroundColor: "primary.dark" }}>
          <DialogContentText>
            Are you sure you want to delete this role? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "primary.dark" }}>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)} 
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error"
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
       
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        transition: 'all 0.3s ease-in-out',
      }}
    >
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
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mb={3}
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <WorkOutlineOutlinedIcon sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: '2rem' }}>
              Roles Management
            </Typography>
          </Box>
          {/* <Box>
            <IconButton
              aria-label="delete all"
              onClick={handleDeleteAll}
              sx={{ color: 'error.main', '&:hover': { backgroundColor: 'action.main' } }}
            >
              <DeleteOutlineOutlinedIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Box> */}
        </Box>

        <Box sx={{ width: '100%' }}>
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
          <DataGrid
            rows={rolesData}
            columns={columns}
            autoHeight
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 8, 10, 20]}
            
            rowHeight={60}
            sx={{
              px:'1rem',
              width: {
                xs: 600, 
                sm: 750, 
                md: 900, 
                lg: 1050, 
                xl: 1200, 
              },
              maxWidth: '100%',
              border: 0,
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
                py: 1,
                borderBottom: `1px solid primary.dark`,
                fontSize: '1rem',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'secondary.dark',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'secondary.dark',
                borderBottom: `2px solid secondary.dark`,
                minHeight: '64px !important',
              },
              '& .MuiCheckbox-root': {
                color: 'secondary.dark',
                '&.Mui-checked': { color: 'secondary.dark' },
                transition: 'color 0.2s ease',
              },
              '& .MuiDataGrid-row': {
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: 'action.main' },
              },
            }}
          />)}
        </Box>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          disableRestoreFocus
        >
          <Box sx={{ p: 2.5, maxWidth: 300, backgroundColor: 'primary.dark' }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, fontSize: '1.25rem' }}
            >
              All Permissions
            </Typography>
            {selectedPermissions.map((permission, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  '&:not(:last-child)': { mb: 1 },
                }}
              >
                • {permission}
              </Typography>
            ))}
          </Box>
        </Popover>
      </Paper>
    </Box></>
  );
};

export default Roles;