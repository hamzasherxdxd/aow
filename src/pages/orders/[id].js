import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Alert,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { SeverityPill } from "../../components/severity-pill";

const ViewOrder = () => {
  const [order, setOrder] = useState({});
  const [updateStatus, setUpdateStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [custName, setCustName] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const fetchOrder = async (id) => {
    // setLoading(true);
    const options = {
      url: `https://andalelatinogrill.com/wp-json/wc/v3/orders/${id}`,
      params: {
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };

    await axios(options)
      .then((response) => {
        setOrder(response.data);
        setCustName(response.data.billing.first_name + " " + response.data.billing.last_name);
        setPickUpDate(response.data.meta_data[1].value);
        setStatus(response.data.status);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(async () => {
    await fetchOrder(id);
    console.log(order);
  }, [id]);

  const Success = () => {
    return <Alert severity="success">Updated Successfully.</Alert>;
  };

  const Failed = () => {
    return <Alert severity="error">Failed to update.</Alert>;
  };

  const handleSubmit = (e, id, status) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      status: status,
    };
    const params = {
      consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
      consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
    };
    axios
      .put(`https://www.andalelatinogrill.com/wp-json/wc/v3/orders/${id}`, data, { params })
      .then((response) => {
        setLoading(false);
        setUpdateStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setUpdateStatus("failed");
      });
    // axios({
    //   method: "PUT",
    //   url: `https://www.andalelatinogrill.com/wp-json/wc/v3/orders/${id}`,
    //   data,
    //   params: {
    //     consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
    //     consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
    //   },
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setStatus(e.target.value);
  };

  return (
    <div>
      <Typography textAlign="center" variant="h2" color="primary">
        Order No: {order.id}
      </Typography>
      {updateStatus === "success" ? <Success /> :  null}
      {updateStatus === "failed" ? <Success /> :  null}
      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={(e) => handleSubmit(e, id, status)}>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Id</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell sortDirection="desc">Date</TableCell>
                    <TableCell>PickUp Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{custName}</TableCell>
                    <TableCell>{order.date_created}</TableCell>
                    <TableCell>{pickUpDate}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={status}
                        label="Status"
                        onChange={(e) => handleChange(e)}
                      >
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                        <MenuItem value="on-hold">On hold</MenuItem>
                        <MenuItem value="refunded">Refunded</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="pending-payment">Pending Payment</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button color="primary" variant="contained" type="submit">
                        Submit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box>
                <Typography variant="h3">Products:</Typography>
                <Typography>
                  {order.line_items.map((item)=>{
                    return <li key={item.name}>{item.name}: ${item.subtotal}</li>
                  })}
                </Typography>
                <Typography variant="h5">
                  Total: ${order.total}
                </Typography>
              </Box>
            </Box>
          </PerfectScrollbar>
        </form>
      )}
    </div>
  );
};

export default ViewOrder;
