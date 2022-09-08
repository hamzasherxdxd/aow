import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";

export const Sales = (props) => {
  const theme = useTheme();
  const [ordersByDate, setOrdersByDate] = useState([]);
  const ordersNumber = [];
  const [isLoading, setIsLoading] = useState(false);
  const [lastDays, setLastDays] = useState(7);
  const past7Days = [...Array(lastDays).keys()].map((index) => {
    let date = new Date();
    date.setDate(date.getDate() - index);
    date = date.toString().split(" ");
    return date[1] + " " + date[2];
  });
  const dates = past7Days;
  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        // data: [20, 30, 12, 11, 16, 19, 23],
        data: ordersByDate,
        label: "Last Week",
        maxBarThickness: 10,
      },
      // {
      //   backgroundColor: '#EEEEEE',
      //   barPercentage: 0.5,
      //   barThickness: 12,
      //   borderRadius: 4,
      //   categoryPercentage: 0.5,
      //   data: [11, 20, 12, 29, 30, 25, 13],
      //   label: 'Last year',
      //   maxBarThickness: 10
      // }
    ],
    // labels: ["1", "2", "3", "4", "5", "6", "7"],
    labels: dates,
  };

  const fetchOrderNumbers = async () => {
    setIsLoading(true);
    const options = {
      url: "https://andalelatinogrill.com/wp-json/wc/v3/orders",
      params: {
        before: "",
        after: "",
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    // const date = new Date();
    // const prevDate = new Date(date);
    // const prevPrevDate = new Date(prevDate);
    let date = new Date();
    let prevDate = new Date(date);
    prevDate.setDate(date.getDate() - 1);
    for (let i = 0; i < lastDays; i++) {
      options.params = {
        before: date.toISOString(),
        after: prevDate.toISOString(),
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      };

      await axios(options).then((response) => {
        ordersNumber.push(response.data.length);
        data.datasets.data = ordersNumber;
        setOrdersByDate(ordersNumber);
      });
      date.setDate(date.getDate() - 1);
      prevDate.setDate(prevDate.getDate() - 1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrderNumbers();
  }, [lastDays]);
  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };
  return (
    <>
      {!isLoading ? (
        <Card {...props}>
          {" "}
          <CardHeader
            action={
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lastDays}
                label={"Last " + lastDays + " days"}
                onChange={(e) => setLastDays(e.target.value)}
              >
                <MenuItem value={7}>Last 7 Days</MenuItem>
                <MenuItem value={30}>Last 30 Days</MenuItem>
              </Select>
            }
            title="Latest Sales"
          />
          <Divider />
          <CardContent>
            <Box
              sx={{
                height: 400,
                position: "relative",
              }}
            >
              <Bar data={data} options={options} />
            </Box>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
              Overview
            </Button>
          </Box>{" "}
        </Card>
      ) : (
        <CircularProgress />
      )}
      {/* <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
            Last 7 days
          </Button>
        }
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
          Overview
        </Button>
      </Box> */}
    </>
  );
};
