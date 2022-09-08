import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Form from "../../components/product/form";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState("");
  const [productForm, setProductForm] = useState("");

  const fetchProduct = (id) => {
    let promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://www.andalelatinogrill.com/wp-json/wc/v3/products/${id}`,
        params: {
          consumer_key: "ck_b377dcb97065684422b90ccb27517f773cbb4226",
          consumer_secret: "cs_4595c8807321ae78b4859d6217cf2ceebbd39a28",
        },
      };
      axios(options).then((response) => {
        setProduct(response.data);
        setProductForm(
          response.data.meta_data.find((o) => o.key === "_gravity_form_data").value.id
        );
      });
    });
  };
  useEffect(() => {
    fetchProduct(id);
  }, [id]);
  return (
    <div>
      <h1>{product.name}</h1>
      <h3>{product.id}</h3>
      <div>
        <Form formId={productForm} />
      </div>
    </div>
  );
}
