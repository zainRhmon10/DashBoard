import { Avatar, Box, Typography, IconButton, Chip, Button } from "@mui/material";
import { ArrowForward, ArrowForwardIos, Delete, Edit } from "@mui/icons-material";

export const getZonesColumns = ({ onEditClick, onDeleteClick ,onViewCoordinates , onChangeStatus}) => [
    {field :'id' , headerName : 'ID' , flex :1 },
 
  { field: "name", headerName: "Name", flex: 2 },

  {
    field:"coordinates" ,
    headerName : "Coordinates",
    flex :2 ,
    renderCell : (params) => (
      <Button
      
      size="small"
      variant="outlined"
      endIcon={<ArrowForwardIos sx={{width:14 ,height:14}}/>}
      onClick={(e) => {
        e.stopPropagation(),
        onViewCoordinates(params.row.coordinates)
      }}
       sx={{
    py: 0.5,         // زيادة البادينغ العمودي
    px: 2,       // زيادة البادينغ الأفقي
    fontSize: '0.875rem', // حجم الخط
    borderRadius: 2
  }}
      >
          View 
      </Button>
    )
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip

        label={params.row.status ? "Enabled" : "Disabled"}
        color={params.row.status ? "success" : "error"}
        size= 'small'
        onClick ={(e) =>{
  e.stopPropagation();
  onChangeStatus(params.row.id); 
}}

        sx={{width :80}}
      />
    ),
  },
  
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.8,
    renderCell: (params) => (
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(params.row.id);
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
