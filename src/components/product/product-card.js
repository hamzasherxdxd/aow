import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

export const ProductCard = ({ product, ...rest }) => {
  const productData = product.meta_data.find((o) => o.key === "_gravity_form_data").value.id;
  const router = useRouter();
  const style = {
    color: "green",
  };
  const styleOutOfStock = {
    color: "red",
  };
  const in_stock = <span style={style}>In Stock</span>;
  const out_of_stock = <span style={styleOutOfStock}>Out of Stock</span>;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar alt="Product" src={product.images[0].src} variant="square" />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          Id: {product.id}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Stock: {product.stock_status === "instock" ? <>{in_stock}</> : <>{out_of_stock}</>}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                router.push({
                  pathname: "/products/[id]",
                  query: { id: product.id },
                });
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );

  ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
  };
};
