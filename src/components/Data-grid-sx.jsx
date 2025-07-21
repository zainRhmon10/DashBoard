const dataGridStyles = {
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
};

export default dataGridStyles ;
