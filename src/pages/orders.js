import Head from "next/head";
import { Box, Container } from "@mui/material";
import { OrderListResults } from "../components/orders/order-list-results";
import { OrderListToolbar } from "../components/orders/orders-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
// import { customers } from "../__mocks__/customers";
import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <OrderListToolbar />
          <Box sx={{ mt: 3 }}>
            <OrderListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
};
  Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Orders;
