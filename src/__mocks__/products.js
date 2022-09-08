import { v4 as uuid } from "uuid";
import axios from "axios";

// const products = [
// {
//   id: uuid(),
//   createdAt: "27/03/2019",
//   description:
//     "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
//   media: "/static/images/products/product_1.png",
//   title: "Dropbox",
//   totalDownloads: "594",
// },
// {
//   id: uuid(),
//   createdAt: "31/03/2019",
//   description:
//     "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
//   media: "/static/images/products/product_2.png",
//   title: "Medium Corporation",
//   totalDownloads: "625",
// },
// {
//   id: uuid(),
//   createdAt: "03/04/2019",
//   description:
//     "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
//   media: "/static/images/products/product_3.png",
//   title: "Slack",
//   totalDownloads: "857",
// },
// {
//   id: uuid(),
//   createdAt: "04/04/2019",
//   description: "Lyft is an on-demand transportation company based in San Francisco, California.",
//   media: "/static/images/products/product_4.png",
//   title: "Lyft",
//   totalDownloads: "406",
// },
// {
//   id: uuid(),
//   createdAt: "04/04/2019",
//   description: "GitHub is a web-based hosting service for version control of code using Git.",
//   media: "/static/images/products/product_5.png",
//   title: "GitHub",
//   totalDownloads: "835",
// },
// {
//   id: uuid(),
//   createdAt: "04/04/2019",
//   description:
//     "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
//   media: "/static/images/products/product_6.png",
//   title: "Squarespace",
//   totalDownloads: "835",
// },
// ];

export const fetchProducts = (page_no) => {
  const products = [];
  let product = {
    id: "",
    name: "",
    on_sale: false,
    price: "",
    image: [],
    description: "",
  };
  const options = {
    url: "http://www.andalelatinogrill.com/wp-json/wc/v3/products",
    params: {
      page: page_no,
      per_page: 6,
      consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
      consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
    },
  };
  axios(options)
    .then((response) => {
      console.log(response.data);
      if (response.data.length !== 0) {
        for (let i = 0; i < page_no; i++) {
          product.id = response.data[i].id;
          product.name = response.data[i].name;
          product.description = response.data[i].description;
          product.price = response.data[i].price;
          product.on_sale = response.data[i].on_sale;
          product.image = response.data[i].image;
          products.push(product);
        }
        console.log(products);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return products;
};
