import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export const TotalCustomers = (props) => {
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(false);
  const date = new Date();
  let prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 90);
  prevDate = prevDate.toISOString();
  const fetchOrders = () => {
    setLoading(true);
    const options = {
      url: "https://andalelatinogrill.com/wp-json/wc/v3/orders",
      params: {
        after: prevDate,
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    axios(options).then((response) => {
      // console.log(response.data);
      setLoading(false);
      setOrders(response.headers["x-wp-total"]);
      // console.log(orders);
      // console.log(prevDate);
    });
  };
  useEffect(() => {fetchOrders()}, []);
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL ORDERS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {loading ? <CircularProgress /> : orders }
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        >
          <ArrowUpwardIcon color="success" />
          <Typography
            variant="body2"
            sx={{
              mr: 1,
            }}
          >
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};
