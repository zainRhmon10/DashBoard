import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  BoxList,
  BoxName,
  HorizntalDivider,
  ProfileUser,
  VertaiclDivider,
} from "../../components/User/profile";

import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import background from "../../assets/images/9364949.jpg";

const UserPro = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/dashboard/users/${id}?details=complete`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [id, token]);

  return (
    <Grid container justifyContent="center" mt={5}>
      <Grid item xs={12} sm={6} md={4} textAlign="center">
        {!user ? (
          <Box
          display={'flex'}
          sx={{width : "100%",
            height :"100%",
            textAlign:"center",
            alignItems:"center",
            alignContent:"center"
          }}
           >
            <Typography variant="h2"  sx={{mt:"300px"}}>loading...</Typography>
           </Box>
        )
      :(
        <Box>
         <Box
          sx={{
            width: "1200px",
            position: "relative",
            height: 220,
            backgroundColor: "primary.main",
            borderRadius: 2,
            mb: 5,

            backgroundImage: `url(${background})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
        <Box flexDirection={"row"} display={"flex"} gap={2}>
          <Avatar
          src={`http://localhost:8000/api/images${user.image}`}
            sx={{
              width: "230px",
              height: "230px",
              position: "absolute",
              bottom: 285, // يبعد عن أسفل الصندوق بمقدار 60px
              left: "33%", // في منتصف العرض أفقيًا
              transform: "translateX(-50%)", // لتوسيطه تمامًا
              border: "4px solid #FFEB3B",
              zIndex: 10, // ليظهر فوق الخلفية
            }}
          ></Avatar>
        </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            textAlign="left"
            ml="330px"
          >
            <Typography variant="h2" sx={{ wordBreak: "break-word" }}>
              {user.first_name} {user.last_name}
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "grey", wordBreak: "break-word" }}
            >
              {user.email}
            </Typography>
          </Box>
        
        <Box
          sx={{
            mt: "100px",
            ml: "90px",
            flexDirection: "column",
            alignItems: "start",
            alignContent: "start",
            textAlign: "start",
          }}
        >
          <Box display={"flex"} flexDirection={"row"}>
            <ProfileUser title={"Status"} subtitle={user.status== 0 ? "Banned" : "Active"} />

            <VertaiclDivider />
            <ProfileUser title={"Balance"} subtitle={user.wallet_balance +"$"}  />


            <VertaiclDivider />

            <ProfileUser
              title={"First seen"}
              subtitle={user.created_at}
            />
          </Box>

          <HorizntalDivider />

          <Box display={"flex"} flexDirection={"row"} gap={6}>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="h3"
                sx={{ color: "grey.400", m: "10px", ml: "0px" }}
              >
                Pesonal
              </Typography>

              <Box display={"flex"} flexDirection={"row"} gap={2}>
                <BoxName titleName={"First Name"} name={user.first_name} width={250} />

                <BoxName titleName={"Last Name"} name={user.last_name} width={250} />
              </Box>
              <BoxList
                titleName={"Orders"}
                title2={"Orders"}
                label1={"current orders existence"}
                label2={"rejected orders count"}
                label3={"completed orders count"}
                content1={user.current_orders_existence ? "yes" : "no"}
                content2={user.rejected_orders_count}
                content3={user.completed_orders_count}
              />

              <BoxList
                titleName={"Reservation"}
                title2={"Reservation"}
                label1={"current reservations existence"}
                label2={"rejected reservationscount"}
                label3={"finished reservations count"}
                content1={user.current_reservations_existence ? "yes" : "no"}
                content2={user.rejected_reservations_count}
                content3={user.finished_reservations_count}
              />




            </Box>

            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="h3"
                sx={{ color: "grey.400", m: "10px", ml: "0px" }}
              >
                Contact
              </Typography>

              <BoxName
                titleName={"Email"}
                name={user.email}
                width={500}
              />

              <BoxName titleName={"Phone"} name={user.mobile} width={500} />
            </Box>
          </Box>
        </Box>

        </Box>
      )
      }
             </Grid>
    </Grid>
  );
};

export default UserPro;
