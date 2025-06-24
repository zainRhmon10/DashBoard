import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import AdminDetails from './AdminDetails';
import { getAdminById } from '../../services/admin';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress, Box, Alert } from '@mui/material';

const AdminDetailsPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmin = async () => {
  if (!token || !id) return;
  
  setLoading(true);
  setError(null);
  
  try {
    const res = await getAdminById(token, id);
    
    // تحقق من وجود البيانات في المسار الصحيح
    if (res.data && res.data.admin) {
      setAdmin(res.data.admin);
    } else {
      setError('Invalid response structure from server');
    }
  } catch (err) {
    console.error('Error fetching admin:', err);
    setError('Failed to load admin details. Please try again.');
    
    // تفاصيل الخطأ من الخادم إن وجدت
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAdmin();
  }, [id, token]);

  // Callback function to refresh admin data after updates
  const handleAdminUpdate = () => {
    fetchAdmin();
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
        
      >
        <CircularProgress size={60} color="common"/>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert severity="error" sx={{ maxWidth: 500, mx: 'auto' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!admin) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert severity="warning" sx={{ maxWidth: 500, mx: 'auto' }}>
          Admin not found.
        </Alert>
      </Box>
    );
  }

  return (
    <AdminDetails 
      admin={admin} 
      onAdminUpdate={handleAdminUpdate}
    />
  );
};

export default AdminDetailsPage;