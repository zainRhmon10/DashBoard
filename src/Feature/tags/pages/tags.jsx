import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useTags } from "../hooks/tags";
import { getTagsColumns } from "../component/columns";
import { LocalOffer, RestaurantMenu } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import dataGridStyles from "../../../components/Data-grid-sx";
import { useNavigate } from "react-router-dom";
import { deleteTag, editTag } from "../services/api";
import { DeleteDialogTag } from "../component/Dialog_Delete";
import { EditDialogTag } from "../component/Dialog_edit";

const Tags = () => {
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const { rows, loading, deleteLocal, refresh }   = useTags(token);

    const [openDiaolgDelete , setopenDialogDelete] = useState(false);
        const [deleteId, setDeleteId] = useState(null);
         const [loadingDelete, setLoadingDelete] = useState(false);


 const [openDialog, setOpenDialog] = useState(false);
       const [selectedRow, setSelectedRow] = useState(null);
     const [loadingEdit, setLoadingEdit] = useState(false);

     const handleEditClick = useCallback((row) => {
       setSelectedRow(row);
       setOpenDialog(true);
     }, []);

     const handleDialogClose  =() =>{
      setOpenDialog(false);
      setSelectedRow(null);
     }
    
         const handleDeleteClick = useCallback((id) => {
           setDeleteId(id);
           setopenDialogDelete(true);
        }, []);

        const handleDeleteConfirm = async () => {
              try {
                setLoadingDelete (true);
                await deleteTag(token,deleteId);
                deleteLocal(deleteId);
                setopenDialogDelete(false);
                setDeleteId(null);
              }catch (error) {
              alert("Failed to delete attribute:", error);
            } finally {
              setLoadingDelete(false);
            }
        
            }

            const handleDialogSave = async (formData) => {
                    const form = new FormData();
                    form.append("name[en]", formData.nameEN);
                    form.append("name[ar]", formData.nameAR);
                    form.append("icon", formData.icon);
                   
                    try {
                      setLoadingEdit(true);
                      await editTag(token, selectedRow.id, form);
                      handleDialogClose();
                      await refresh();
                    } catch (error) {
                      console.error("Failed to update category:", error);
                    } finally {
                      setLoadingEdit(false);
                    }
                  };

        


   const columns = useMemo(() =>
  getTagsColumns({
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  }),
  [handleEditClick, handleDeleteClick]
);

    



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
            <LocalOffer sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2rem" }}>
              Tags Management
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
              onRowClick={(params) => {
                navigate(`/tags/${params.id}`);
              }}
               sx={dataGridStyles}
            />
          </Box>
        )}
        <DeleteDialogTag 
        open={openDiaolgDelete}
        onclose={() => setopenDialogDelete(false)}
        onconfirm={handleDeleteConfirm}
        loading={loadingDelete}
        />
        
        <EditDialogTag
                  open={openDialog}
                  onClose={handleDialogClose}
                  onconfirm={handleDialogSave}
                />
      </Paper>
    </Box>


     );
}
 
export default Tags;

