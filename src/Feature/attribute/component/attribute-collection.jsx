import { Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";


export const getColumnsAttribute = ({ onEditClick, onDeleteClick }) => [
  { field: 'id', headerName: 'ID', flex:1},
  { field: 'name', headerName: 'Name', flex:2 },
  { field: 'type', headerName: 'Type', flex:1.5},
  {
    field: 'options',
    headerName: 'Options',
    flex:4.8,
    renderCell: (params) => params.value.join(', ')
  },
  { field: 'created_at', headerName: 'Created at', flex:3 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1.5,
    sortable: false,
    renderCell: (params) => (
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
             e.stopPropagation();
             onEditClick(params.row)
          }
           }
        >
          <Edit color="success" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();

            onDeleteClick(params.row.id)
          }}
        >
          <GridDeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];







