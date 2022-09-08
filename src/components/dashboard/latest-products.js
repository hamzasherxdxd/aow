import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState, useEffect } from "react";
import axios from "axios";

// const products = [
//   {
//     id: uuid(),
//     name: "Dropbox",
//     imageUrl: "/static/images/products/product_1.png",
//     updatedAt: subHours(Date.now(), 2),
//   },
//   {
//     id: uuid(),
//     name: "Medium Corporation",
//     imageUrl: "/static/images/products/product_2.png",
//     updatedAt: subHours(Date.now(), 2),
//   },
//   {
//     id: uuid(),
//     name: "Slack",
//     imageUrl: "/static/images/products/product_3.png",
//     updatedAt: subHours(Date.now(), 3),
//   },
//   {
//     id: uuid(),
//     name: "Lyft",
//     imageUrl: "/static/images/products/product_4.png",
//     updatedAt: subHours(Date.now(), 5),
//   },
//   {
//     id: uuid(),
//     name: "GitHub",
//     imageUrl: "/static/images/products/product_5.png",
//     updatedAt: subHours(Date.now(), 9),
//   },
// ];

export const LatestProducts = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const fetchProducts = async () => {
    setIsLoading(true);
    const options = {
      url: "https://www.andalelatinogrill.com/wp-json/wc/v3/products",
      params: {
        per_page: 5,
        consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
        consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
      },
    };
    await axios(options)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Card {...props}>
      <CardHeader subtitle={`${products.length} in total`} title="Top Products" />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={product.id}>
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.images[0].src}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 10,
                }}
              />
            </ListItemAvatar>
            <ListItemText primary={product.name} secondary={product.created_at} />
            {/* <IconButton edge="end" size="small"> */}
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
            {/* </IconButton> */}
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Link href="/products" underline="none">
          <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
            View all
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
