import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export const TotalProfit = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState("");
  const [average, setAverage] = useState("");
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
        let x = totalNum.reduce((sum, total) => sum + total);
        x = Number(x / totalNum.length).toFixed(2);

        setAverage(x);
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
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Average Order Value
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {loading ? <CircularProgress /> : '$' + average}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
