import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostAdd, WorkOutlineOutlined } from "@mui/icons-material";
import {
  DeleteAttribute,
  editAttribute,
  getAllAtributte,
} from "../../services/attribute";
import {
  getColumnsAttribute,
  useAttributes,
} from "../../components/Atrribute-component/attribute-collection";
import { DataGrid } from "@mui/x-data-grid";
import { Navigate, useNavigate } from "react-router-dom";
import { DeleteDialogAttribute } from "../../components/Atrribute-component/Delete-attribute";
import { EditDialog } from "../../components/Atrribute-component/edit-attribute";

const Attribute = () => {
  const { token } = useContext(AuthContext);
  const { rows, loading, deleteLocal,refresh } = useAttributes(token);
  const navigate = useNavigate();

  const [openDialogDelete, setopenDialogDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setopenDialogDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoadingDelete(true);
      await DeleteAttribute(token, deleteId);
      deleteLocal(deleteId);
      setopenDialogDelete(false);
      setDeleteId(null);
      

    } catch (error) {
      alert("Failed to delete attribute:", error);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleDialogSave = async (formData) => {
    const form = new FormData();
    form.append("name[en]", formData.nameEN);
    form.append("name[ar]", formData.nameAR);
    form.append("type", formData.type);

    // إضافة الخيارات إذا وُجدت
    formData.options.forEach((option, index) => {
      form.append(`options[${index}][en]`, option.en);
      form.append(`options[${index}][ar]`, option.ar);
    });

    try {
      setLoadingEdit(true);
      await editAttribute(token, selectedRow.id, form);
      handleDialogClose();
      await refresh();
    } catch (error) {
      console.error("Failed to update attribute:", error);
    } finally {
      setLoadingEdit(false);
    }
  };

  const columns = getColumnsAttribute({
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick,
  });

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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <PostAdd sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2rem" }}>
              Attribute Collection
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
              paginationModel={{ page: 0, pageSize: 10 }}
              checkboxSelection
              onRowClick={(params) => {
                navigate(`/attribute/${params.id}`);
              }}
              sx={{
                border: 0,
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  alignItems: "center",
                  py: 1,
                  borderBottom: `1px solid primary.dark`,
                  fontSize: "15px",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "secondary.dark",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "secondary.dark",
                  borderBottom: `2px solid secondary.dark`,
                  minHeight: "64px !important",
                },
                "& .MuiCheckbox-root": {
                  color: "secondary.dark",
                  "&.Mui-checked": { color: "secondary.dark" },
                  transition: "color 0.2s ease",
                },
                "& .MuiDataGrid-row": {
                  transition: "background-color 0.2s ease",
                  "&:hover": { backgroundColor: "action.main" },
                },
              }}
            />
          </Box>
        )}
        <EditDialog
          open={openDialog}
          onClose={handleDialogClose}
          onconfirm={handleDialogSave}
        />
     
        <DeleteDialogAttribute
          open={openDialogDelete}
          onclose={() => setopenDialogDelete(false)}
          onconfirm={handleDeleteConfirm}
          loading={loadingDelete}
        />
      </Paper>
    </Box>
  );
};

export default Attribute;
