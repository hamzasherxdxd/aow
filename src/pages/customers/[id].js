import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
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
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../../components/severity-pill";

const ViewCustomer = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState([]);
  const text = `All Orders by ${id}`;
  const fetchCustomerOrders = (id) => {
    const options = {
      url: "https://andalelatinogrill.com/wp-json/wc/v3/orders",
      params: {
        customer: id,
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    axios(options).then((response) => {
      console.log(response.data);
      setOrders(response.data);
    });
  };

  useEffect(() => fetchCustomerOrders(id), []);

  return (
    <Card {...props}>
      <CardHeader title={text} />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Ref</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell sortDirection="desc">Date</TableCell>
                <TableCell>PickUp Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.billing.first_name + " " + order.billing.last_name}</TableCell>
                  <TableCell>{order.date_created}</TableCell>
                  <TableCell>{order.meta_data[1].value}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (order.status === "delivered" && "success") ||
                        (order.status === "refunded" && "error") ||
                        "warning"
                      }
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <Button color="primary" variant="contained" onClick={() => router.push({
                        pathname: "/orders/[id]",
                        query: {id: order.id},
                    })}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default ViewCustomer;
