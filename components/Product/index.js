import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import Comments from "../Comments";
import ProductForm from "../ProductForm";
import { useState } from "react";


export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR("/api/products/${id}");

  async function handleEditProduct(event) {
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch("/api/products", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
       },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return <h1>Something gone wrong</h1>;
    }
    router.push("/");
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <div>
        <button type="button"
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          <span role="img" aria-label="A pen">
          🖊️ 
          </span>
        </button>
        <button type="button" onClick={handleDeleteProduct(id)} disabled={isEditMode}>
          <span role="img" aria-label="A bomb indicating deletion">
          💣
          </span>
        </button>
      </div>
      {isEditMode && (
        <ProductForm onSubmit={handleEditProduct} value={data} isEditMode={true} />
      )}
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
