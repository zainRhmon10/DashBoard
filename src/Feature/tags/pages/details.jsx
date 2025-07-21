import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useTagDetails } from "../hooks/tags";
import { CheckCircle } from "@mui/icons-material";
import background1 from "../../../assets/images/footer-left.png";
import background2 from "../../../assets/images/Container.png";
import { useContext } from "react";

const DetailsTag = () => {
    const {id} = useParams();
    const {token} = useContext(AuthContext);
    const {Tag, loading, error } = useTagDetails(token,id);

     if (loading)
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems={"center"}
      >
        <Typography variant="h2">Loading...</Typography>
      </Box>
    );

  if (error || !Tag)
    return (
      <Box
        textAlign="center"
        display="flex"
        justifyContent="center"
        height="100%"
        alignItems={"center"}
      >
        <Typography variant="h2">Failed to load category details.</Typography>
      </Box>
    );

  return (
    <Box
      display={"flex"}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        display={"flex"}
        component="img"
        src={background1}
        position={"absolute"}
        alt="background1"
        sx={{
          left: 0,
          bottom: 0,
          width: "20%",
          height: "65%",
          objectFit: "contain",
          zIndex: 0,
        }}
      />
      <Box
        display={"flex"}
        component="img"
        src={background2}
        position={"absolute"}
        alt="background2"
        sx={{
          right: 0,
          bottom: 0,
          width: "25%",
          height: "65%",
          objectFit: "contain",
          zIndex: 0,
        }}
      />
      <Box
        display={"flex"}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(17, 17, 17, 0.15)",
          zIndex: 1,
        }}
      />
      <Box
        display={"flex"}
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between" gap={6}wrap="nowrap">
          <Grid item xs={12} md={6} sx={{ ml: 20, mb: 20 }}>
            <Typography variant="h3" mb={"30px"} ml={'20px'}>
              Tags help distinguish dishes  based on <br/>characteristics 
              like flavor, spiciness<br/> or dietary style .
            </Typography>

            <Typography
              variant="h2"
              fontWeight={600}
              ml={"40px"}
              mt={"70px"}
              mb={"20px"}
              textAlign={"center"}
              sx={{ background: "orange", width: 300, borderRadius: 50 }}
            >
              {Tag.name.en} ({Tag.name.ar})
            </Typography>

           
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ width: "800px", height: "600px", color: "yellow" }}
          >
            <Paper
              sx={{
                backgroundColor: "rgba(248, 212, 9, 0.23)",
                borderStartStartRadius: 150,
                borderEndStartRadius: 150,
                p: 1,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "400px",
                  height: "400px",
                  m: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10rem",
                      backgroundColor: "rgba(255,165,0,0.15)", // برتقالي شفاف
    borderRadius: "50%",
     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

                }}
              >
                {/* عرض الأيقونة الكبيرة */}
                <span>{Tag.icon}</span>
              </Box>
            </Paper>         </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
 
export default DetailsTag;