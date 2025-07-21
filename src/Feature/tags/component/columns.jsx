import { Box, Typography, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export const getTagsColumns = ({ onEditClick, onDeleteClick }) => [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
  },
  {
    field: "name_with_icon",
    headerName: "Name",
    flex: 2,
    renderCell: (params) => (
      <Box display="flex" alignItems="center" gap={1}>
        <Typography sx={{ fontSize: 20 }}>{params.row.icon}</Typography>
        <Typography sx={{ fontSize: 16 }}>{params.row.name}</Typography>
      </Box>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.3,
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
