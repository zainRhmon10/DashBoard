import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import background1 from "../../../assets/images/footer-left.png";
import background2 from "../../../assets/images/Container.png";
import { useCategoryDetails } from "../hook/categories";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { CheckCircle, NotInterested } from "@mui/icons-material";
import { ChangeStatuscategory } from "../services/category";

const CategoryDetaiels = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { category, loading, error } = useCategoryDetails(token, id);

  const [statusLoading, setStatusLoading] = useState(false);
  const [localStatus, setLocalStatus] = useState(null);

  // 👇 Set initial status once category is loaded
  useEffect(() => {
    if (category) {
      setLocalStatus(category.status);
    }
  }, [category]);

  const handleStatusToggle = async () => {
    try {
      setStatusLoading(true);
      await ChangeStatuscategory(token, id);
      setLocalStatus((prev) => !prev); // toggle
    } catch (error) {
      alert("Failed to change status");
    } finally {
      setStatusLoading(false);
    }
  };

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

  if (error || !category)
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
        <Grid container alignItems="center" justifyContent="space-between" gap={3} wrap="nowrap">
          <Grid item xs={12} md={6} sx={{ ml: 20, mb: 20 }}>
            <Typography variant="h3" mb={"30px"}>
              This category includes a curated selection <br />
              of delicious dishes to suit all tastes.
            </Typography>

            <Typography
              variant="h2"
              fontWeight={600}
              ml={"40px"}
              mt={"70px"}
              mb={"20px"}
              textAlign={"center"}
              sx={{ background: "orange", width: 250, borderRadius: 50 }}
            >
              {category.name.en} ({category.name.ar})
            </Typography>

            <Box display={"flex"} flexDirection={"row"} gap={2}>
             
                <Chip
              
                label={statusLoading ?
                  (<Typography>waiting...</Typography>)
                  :(localStatus ? "Enabled" : "Disabled")
                }
                color={localStatus ? "success" : "error"}
                size="medium"
                sx={{ width: "200px", fontSize: 20, ml: "45px" }}
              />
              
              {localStatus ? (
                <CheckCircle fontSize="large" color="success" sx={{ mt: 0.2 }} />
              ) : (
                <NotInterested fontSize="large" color="error" sx={{ mt: 0.2 }} />
              )}
              
            </Box>
            <Box display={'flex'} textAlign={'center'} flexDirection={'row'} sx={{mt:'100px',ml:'52px'}} gap={2}>
              
              <Typography variant="h2">{localStatus? "Disable" : "Enable"} </Typography>
               <Switch  
                
                checked={!!localStatus}
                onChange={handleStatusToggle}
                disabled={statusLoading}
                color="primary"
              />
            </Box>
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
                p:1
              }}
            >
              <Box
  sx={{
    position: "relative",
    width: "400px",
    height: "400px",
    m: "15px",

  }}
>
  <Box
    component="img"
    src={`http://localhost:8000/api/images/${category.image}`}
    alt={category.name.en}
    sx={{
      width: "100%",
      height: "100%",
      borderRadius: 200,
      objectFit: "cover",
      boxShadow: 200,
      opacity: localStatus ? 1 : 0.5, // خفف الصورة إذا كانت معطلة
      filter: localStatus ? "none" : "grayscale(100%)",
    }}
  />

  {/* طبقة تعطيل إذا كانت معطلة */}
  {!localStatus && (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "red",
        transform: "rotate(-30deg)",
        transformOrigin: "center",
        zIndex: 2,
      }}
    />
  )}
</Box>

            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryDetaiels;
