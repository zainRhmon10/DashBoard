import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ChangeStatus, DeleteUser, fetchUsers } from "../services/user";
import { useNavigate } from "react-router-dom";
import { ArrowDropDown, ManageAccounts, Search } from "@mui/icons-material";
import { DeleteDialog } from "../component/user_table";
import { debounce } from "lodash";
import { AuthContext } from "../../../context/AuthContext";

const UserCell = React.memo(({ name }) => (
  <Box>
    <Typography variant="subtitle2">{name || "—"}</Typography>
  </Box>
));

const Users = () => {
  const navigate = useNavigate();
  const [loadingUserId, setLoadingUserId] = React.useState(null);
  const [deleteloading, setDeleteLoading] = React.useState(null);

  const { token } = React.useContext(AuthContext);
  const [rows, setRows] = React.useState([]);
  const [DialogOpen, SetDialogOpen] = React.useState(false);
  const [selectUserId, SetselectUserId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const [rowCount, setRowCount] = React.useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [searchText, setSearchText] = React.useState("");

  const debouncedFetch = React.useRef(
    debounce(async (model, search) => {
      try {
        setLoading(true);
        const { users, total } = await fetchUsers(
          token,
          model.page + 1,
          model.pageSize,
          search
        );
        setRows(
         users
        );
        setRowCount(total);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  React.useEffect(() => {
    if (!token) return;

    if (searchText.length === 0) {
      debouncedFetch(paginationModel, "");
    } else if (searchText.length >= 3) {
      debouncedFetch(paginationModel, searchText);
    } else {
      setRows([]);
      setRowCount(0);
    }
  }, [paginationModel, searchText, token]);

  const handleOpenDeleteDialog = (id) => {
    SetselectUserId(id);
    SetDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await DeleteUser(token, selectUserId);
      setRows((prev) => prev.filter((row) => row.id !== selectUserId));
      handleCancelDelete();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Error deleting user.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    SetDialogOpen(false);
    SetselectUserId(null);
  };

  const changeSearchText = (e) => setSearchText(e.target.value);

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "banned" : "active";
    setLoadingUserId(userId);
    try {
      await ChangeStatus(token, userId, newStatus);
      setRows((prev) =>
        prev.map((row) =>
          row.id === userId ? { ...row, status: newStatus } : row
        )
      );
    } catch (error) {
      console.error("Failed to change status:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const NoRowsOverlay = React.useCallback(
    () => (
      <Stack
        height="100%"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2 }}
      >
        <Typography variant="h6">
          {searchText.length > 0 && searchText.length < 3
            ? "type at least 3 cahrt to search"
            : searchText.length >= 3
            ? "not found user"
            : "failed to fetch data"}
        </Typography>
      </Stack>
    ),
    [searchText]
  );

  const columns = React.useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "user",
        headerName: "Name",
        flex: 1.5,
        renderCell: (params) => (
          <Box display="flex" alignItems="center" gap={2}>
            <UserCell name={params.row.name} />
          </Box> 
        ),
      },
      {
        field: "email",
        headerName: "Email",
        flex: 2.3,
        renderCell: (params) => params.row.email || "—",
      },
      {
        field: "orders_count",
        headerName: "Orders count",
        flex: 2,
        renderCell: (params) => params.row.orders_count ?? "—",
      },
      {
        field: "reservations_count",
        headerName: "Reservation Count",
        flex: 2.3,
        renderCell: (params) => params.row.reservations_count ?? "—",
      },
      {
        field: "wallet_balance",
        headerName: "Wallet balance",
        flex: 1.5,
        renderCell: (params) => params.row.wallet_balance ?? "—",
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1.5,
        renderCell: (params) =>
          loadingUserId === params.row.id ? (
            <Typography sx={{ ml: "10px" }}>waiting...</Typography>
          ) : (
            <Chip
              label={params.row.status === "active" ? "Active" : "Banned"}
              color={params.row.status === "active" ? "success" : "error"}
              size="small"
              onClick={() =>
                handleToggleStatus(params.row.id, params.row.status)
              }
              sx={{ cursor: "pointer", width: "80px" }}
            />
          ),
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        renderCell: (params) => (
          <Box display="flex" gap={1}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => navigate(`/user-pro/${params.row.id}`)}
            >
              <ManageAccounts color="success" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleOpenDeleteDialog(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [loadingUserId, navigate]
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <WorkOutlineOutlinedIcon sx={{ fontSize: 32 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, fontSize: "2rem" }}>
              Users Management
            </Typography>
          </Box>
          <Box mr={15} mt={1}>
            <TextField
              fullWidth
              variant="outlined"
              value={searchText}
              onChange={changeSearchText}
              placeholder="Search"
              sx={{
                borderRadius: 3,
                "& .MuiOutlinedInput-root": { borderRadius: 5 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="common"/>
          </Box>
        ) : (
          <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              rowHeight={50}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 15, 20]}
              rowCount={rowCount}
              paginationMode="server"
              slots={{
                noRowsOverlay: NoRowsOverlay,
                noResultsOverlay: NoRowsOverlay,
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

        <DeleteDialog
          onclose={handleCancelDelete}
          open={DialogOpen}
          onconfirm={handleConfirmDelete}
          loading={deleteloading}
        />
      </Paper>
    </Box>
  );
};

export default Users;
