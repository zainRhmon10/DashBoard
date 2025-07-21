import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UseZones } from "../hook/get_zones";
import { getZonesColumns } from "../component/zones_columns";
import { DialolgCoords } from "../component/Dialog_coords";
import { DeliveryDining } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import dataGridStyles from "../../../components/Data-grid-sx";
import { chageStatusZone, deleteZone } from "../services/zone";
import { DeleteDialogZone } from "../component/Dialog_delete";


const DeliveryZones = () => {
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const { rows, loading, deleteLocal, refresh }   = UseZones(token);

    const [openDialogCoords, setOpenDialogCoords] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState([]);


  const [openDiaolgDelete , setopenDialogDelete] = useState(false);
      const [deleteId, setDeleteId] = useState(null);
       const [loadingDelete, setLoadingDelete] = useState(false);

  const handleViewCoordinates = useCallback((coords) => {
    setSelectedCoords(coords);
    setOpenDialogCoords(true);
  },[]);


  const handleChangeStatus = useCallback ( async (id) => {
    
    try{
      await chageStatusZone(token,id);
      refresh();
    }catch(e){
      console.log(e);
    }
     
  },[token,refresh])
 




     const handleEditClick = useCallback((id) => {
         navigate(`/zone/${id}`);
         }, []);
    
         const handleDeleteClick = useCallback((id) => {
          setDeleteId(id);
          setopenDialogDelete(true);
        }, []);


        const handleDeleteConfirm = async () => {
              try {
                setLoadingDelete (true);
                await deleteZone(token,deleteId);
                deleteLocal(deleteId);
                setopenDialogDelete(false);
                setDeleteId(null);
              }catch (error) {
              alert("Failed to delete attribute:", error);
            } finally {
              setLoadingDelete(false);
            }
        
            }


   const columns = useMemo(() =>
            getZonesColumns({
               onEditClick: handleEditClick,
           onDeleteClick: handleDeleteClick,
           onViewCoordinates : handleViewCoordinates,
           onChangeStatus:handleChangeStatus
           }
           ),
           [handleEditClick ,  handleDeleteClick ,handleViewCoordinates,handleChangeStatus]
       )



    
    return (
         <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          backgroundColor: "primary.dark",
          p: 2,
          width: {
            xs: 600,
            sm: 750,
            md: 900,
            lg: 1050,
            xl: 1200,
          },
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        < Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <DeliveryDining sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2rem" }}>
              Zones Management
            </Typography>
          </Box>
        </Box>

        {loading  ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="common"/>
          </Box>
        ) : (
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 8, 10, 20]}
              disableRowSelectionOnClick
              rowHeight={50}
            
               sx={dataGridStyles}
            />
          </Box>
        )}

        <DialolgCoords
        data={selectedCoords}
        open={openDialogCoords}
        onclose={() => setOpenDialogCoords(false)}
        
        />
        <DeleteDialogZone
        open={openDiaolgDelete}
        onclose={() => setopenDialogDelete(false)}
        onconfirm={handleDeleteConfirm}
        loading={loadingDelete}
        />
    
        {/* <EditDialogCategory
                  open={openDialog}
                  onClose={handleDialogClose}
                  onconfirm={handleDialogSave}
                /> */}
      </Paper>
    </Box>
    );
}
 
export default DeliveryZones;