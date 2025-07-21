import { Box, Divider, Typography,MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

export const ProfileUser = ({ title, subtitle }) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="h2" sx={{ color: "grey" }}>
        {title}
      </Typography>
      <Typography variant="h3" sx={{ mt: "8px" }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export const VertaiclDivider = () => {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ borderColor: "grey.400", ml: "20px", mr: " 20px" }}
    />
  );
};

export const HorizntalDivider = () => {
  return <Divider flexItem sx={{ borderColor: "grey.400", mt: "30px" }} />;
};

export const BoxName = ({ titleName, name, width }) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="h3" sx={{ mt: "10px", mb: "5px" }}>
        {titleName}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "20px",
          padding: "10px 16px",
          width: width,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography sx={{ fontSize: 25, color: "black" }}>{name}</Typography>
      </Box>
    </Box>
  );
};


const InfoRow = ({ label, count }) => (
  <Box display="flex" justifyContent="space-between" px={2} py={1}>
    <Typography variant="body1">{label}</Typography>
    <Typography variant="body1" fontWeight="bold">
      {count}
    </Typography>
  </Box>
);



export const BoxList = ({ titleName,title2, label1  , label2  , label3 ,content1, content2, content3, width }) => {
  return (
    <Box display="flex" flexDirection="column" width={width || "100%"}>
      <Typography variant="h3" sx={{ mt: "10px", mb: "5px" }}>
        {titleName}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "20px",
          padding: "10px 16px",
          width: "100%", // جعل العرض مرن
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Accordion sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}>
          <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
            <Typography variant="h4">{title2}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <InfoRow label={label1} count={content1} />
            <InfoRow label={label2} count={content2} />
            <InfoRow label={label3} count={content3} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};


export const titleTextField = () => {
  return (
    <Typography variant="h3" sx={{ mt: "10px", mb: "5px" }}>
      First name
    </Typography>
  );
};
