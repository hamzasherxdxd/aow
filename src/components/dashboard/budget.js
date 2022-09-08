import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export const Budget = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState("");
  const [revenue, setRevenue] = useState("");
  const fetchOrders = async () => {
    const date = new Date();
    let prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 90);
    prevDate = prevDate.toISOString();
    const options = {
      url: "https://andalelatinogrill.com/wp-json/wc/v3/orders",
      params: {
        after: prevDate,
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    await axios(options).then((response) => {
      setOrders(response.headers["x-wp-total"]);
      fetchRevenue();
    });
  };
  const fetchRevenue = () => {
    setLoading(true);
    const date = new Date();
    let totals = [];
    let prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 90);
    prevDate = prevDate.toISOString();
    const options = {
      url: "https://andalelatinogrill.com/wp-json/wc/v3/orders",
      params: {
        after: prevDate,
        per_page: orders,
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    axios(options)
      .then((response) => {
        setLoading(false);
        for (let i = 0; i < response.data.length; i++) {
          totals.push(response.data[i].total);
        }
        const totalNum = totals.map(Number);
        setRevenue(Number(totalNum.reduce((sum, total) => sum + total)).toFixed(2));
      })
      .catch(() => {
        setError("Error");
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, [orders]);
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total Revenue
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {loading ? <CircularProgress /> : '$' + revenue}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <MoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowDownwardIcon color="error" />
          <Typography
            color="error"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};
