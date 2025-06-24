import { useState, useMemo ,useContext, useEffect ,useCallback} from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import { Snackbar, Alert } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from "@mui/material/CircularProgress";
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Chip from '@mui/material/Chip';
import { AuthContext } from '../../context/AuthContext';
import { changeStatus ,getAdmins ,deleteAdmin} from '../../services/admin';
import { getRoles } from '../../services/Role';
import Avatar from '@mui/material/Avatar'
import { useNavigate } from 'react-router-dom';


const Admins = () => {
  
  const {token} = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [roles, setRoles] = useState([]);
  const [adminsData , setAdminsData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const navigate=useNavigate();



   const showSnackbar = (message, severity = "success") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    };


     useEffect(
      () => {
       const handleGetAdmins = async () => {
        setLoading(true);
    try {
      const response = await getAdmins(token);
      setAdminsData(response.data.admins.data); 
       const res = await getRoles(token);
      setRoles(res.data.roles);
      
    } catch (error) {
      console.error('Failed to fetch admins:', error);
      showSnackbar("Failed to fetch admins. Please try again.", "error");
    }finally{
      setLoading(false);
    }
  }
handleGetAdmins();}, [token]);


   const handleDelete = useCallback((roleId) => {
      setDeletingId(roleId);
      setDeleteConfirmOpen(true);
    }, []);


    const confirmDelete = useCallback(async () => {
        if (!deletingId) return;
        
        setDeleteLoading(true);
        try {
          await deleteAdmin(token, deletingId);
          setAdminsData(prev => prev.filter(admin => admin.id !== deletingId));
          showSnackbar("Admin deleted successfully!");
        } catch (error) {
          console.error('Delete role error:', error);
          showSnackbar("Failed to delete admin", "error");
        } finally {
          setDeleteLoading(false);
          setDeleteConfirmOpen(false);
          setDeletingId(null);
        }
      }, [deletingId, token]);


     const handleEdit = (adminId) => {
  navigate(`/admin-details/${adminId}`);
};


  
  // const handleDeleteAll = () => {};
  //feateur i don't know if you had time do it 



  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 100, headerClassName: 'header-cell'  },
    {
  field: 'image',
  headerName: 'Image',
  width: 100,
  headerClassName: 'header-cell',
  renderCell: (params) => {
    
    
    return (
      <Avatar 
        alt={params.row.name} 
        src={imgError ? null : params.value} 
        sx={{ width: 40, height: 40 }}
        imgProps={{ onError: () => setImgError(true) }}
      >
        {params.row.name?.charAt(0)}
      </Avatar>
    );
  }
},
    { field: 'name', headerName: 'Name', flex:1, headerClassName: 'header-cell' },
    {field:"email" ,headerName:"Email",flex:1, headerClassName: 'header-cell'},
 {
  field: "role_id",
  headerName: "Role",
  flex: 1,
  headerClassName: "header-cell",
  renderCell: (params) => {
    const role = roles.find((role) => role.id === params.value);
    return role ? role.name : "Unknown";
  },
},
    { field: 'created_at', headerName: 'Created at', flex:1, headerClassName: 'header-cell' },
{
  field: 'status',
  headerName: 'Status',
  width: 100,
  renderCell: (params) => {
    const status = params.row.status;
    const handleStatusClick = async () => {
      try {
        await changeStatus(token, params.id);
        const res = await getAdmins(token);
        setAdminsData(res.data.admins.data);
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
        )}
  
  ],[roles,handleDelete, deleteLoading, deletingId]);

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
        <DialogTitle sx={{ backgroundColor: "primary.dark" }}>Delete Admin</DialogTitle>
        <DialogContent sx={{ backgroundColor: "primary.dark" }}>
          <DialogContentText>
            Are you sure you want to delete this admin? This action cannot be undone.
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
            <AdminPanelSettings sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: '2rem' }}>
              Admins Managements
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
            rows={adminsData}
            columns={columns}
            autoHeight
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 8, 10, 20]}
            // checkboxSelection
            // disableRowSelectionOnClick
            rowHeight={60}
            sx={{
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
      </Paper>
    </Box>
    </>
  );
};

export default Admins;