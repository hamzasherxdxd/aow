import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import ViewCustomer from "src/pages/customers/[id]";
import router from "next/router";

export const CustomerListResults = ({ ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState();
  const [custPageCount, setCustPageCount] = useState(0);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const fetchCustomers = async (page_no) => {
    const options = {
      url: "https://www.andalelatinogrill.com/wp-json/wc/v3/customers",
      params: {
        per_page: 10,
        page: page_no,
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    await axios(options)
      .then((response) => {
        console.log(response.data);
        console.log(page_no);
        setCustPageCount(response.headers["x-wp-totalpages"]);
        setTotalCustomers(response.headers["x-wp-total"]);
        setCustomers(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchCustomers(page);
    console.log(custPageCount);
  }, [page]);
  // const handleSelectAll = (event) => {
  //   let newSelectedCustomerIds;

  //   if (event.target.checked) {
  //     newSelectedCustomerIds = customers.map((customer) => customer.id);
  //   } else {
  //     newSelectedCustomerIds = [];
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedCustomerIds.indexOf(id);
  //   let newSelectedCustomerIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
  //   } else if (selectedIndex === selectedCustomerIds.length - 1) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedCustomerIds = newSelectedCustomerIds.concat(
  //       selectedCustomerIds.slice(0, selectedIndex),
  //       selectedCustomerIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedCustomerIds(newSelectedCustomerIds);
  // };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setIsLoading(true);
    setPage(newPage);
    console.log(page, newPage);
    fetchCustomers(page);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050, display: 'flex'}} >
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <TableBody>
                {customers.slice(0, limit).map((customer) => (
                  <TableRow
                    hover
                    style={{ cursor: "pointer" }}
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                    onClick={() => {
                      router.push({
                        pathname: "/customers/[id]",
                        query: { id: customer.id },
                      });
                    }}
                  >
                    {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar src={customer.avatar_url} sx={{ mr: 2 }}>
                          {getInitials(customer.first_name + " " + customer.last_name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {customer.first_name + " " + customer.last_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {`${customer.billing.city}, ${customer.billing.state}, ${customer.billing.country}`}
                    </TableCell>
                    <TableCell>{customer.billing.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={totalCustomers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[10]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
