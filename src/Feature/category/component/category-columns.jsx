import { Avatar, Box, Typography, IconButton, Chip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export const getCategoriesColumns = ({ onEditClick, onDeleteClick }) => [
    {field :'id' , headerName : 'ID' , flex :1 },
  {
    field: "name_with_image",
    headerName: "Name",
    renderCell: (params) => (
      <Box display={"flex"} alignItems={"center"} gap={1.7}>
        <Avatar
        sx={{width:40,
            height : 40
        }}
          src={`http://localhost:8000/api/images/${params.row.image}`}
          alt={params.row.name}
        />
        <Typography sx={{fontSize :16}}>{params.row.name}</Typography>
      </Box>
    ),
    flex: 2,
  },
  { field: "products_count", headerName: "Products count", flex: 2 },
  { field: "orders_count", headerName: "Orders count", flex: 2 },
  { field: "created_at", headerName: "Created at", flex: 2 },
  {
    field: "status",
    headerName: "Status",
    flex: 1.5,
    renderCell: (params) => (
      <Chip

        label={params.row.status ? "Enabled" : "Disabled"}
        color={params.row.status ? "success" : "error"}
        size= 'small'
        sx={{width :80}}
      />
    ),
  },
  
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: (params) => (
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(params.row);
          }}
        >
          <Edit color="success" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(params.row.id);
          }}
        >
          <Delete />
        </IconButton>
      </Box>
    ),
  },
];
