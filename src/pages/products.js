import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
// import { fetchProducts } from "../__mocks__/products";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [products, setProducts] = useState([]);
  const fetchProducts = async (page_no) => {
    setIsLoading(true);
    const options = {
      url: "https://www.andalelatinogrill.com/wp-json/wc/v3/products",
      params: {
        page: page_no,
        per_page: 6,
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    await axios(options)
      .then((response) => {
        console.log(response.data);
        setPageCount(response.headers["x-wp-totalpages"]);
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(pageNo);
  }, [pageNo]);
  return (
    <>
      <Head>
        <title>Products | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                products.map((product) => (
                  <Grid item key={product.id} lg={4} md={6} xs={12}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination
              color="primary"
              count={pageCount}
              size="small"
              onChange={(event, value) => setPageNo(value)}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Products;
