import React, { useState } from "react";
import { ProductType } from "../type";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import ThumbnailUploader from "./ThumbnailUploader";
import { useNavigate } from "react-router-dom";

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdProductId, setCreatedProductId] = useState("");
  const navigate = useNavigate();

  /* 상품생성
      fetch('api주소',{옵션}).then().then()
  */

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };
  const handleExplanationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  const handlePushProductPage = () => {
    setIsModalOpen(false);
    navigate(`/product/${createdProductId}`);
  };

  const uploadThumbnailRequest = (productId: string, thumbnail: File) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    return fetch(`/product/thumbnail/${productId}`, {
      method: "PATCH",
      body: formData,
    });
  };

  const createProductRequest = (newProduct: Omit<ProductType, "id">) => {
    return fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  };

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await createProductRequest({ name, price, explanation });
    const data = await response.json();

    if (thumbnail) await uploadThumbnailRequest(data.product.id, thumbnail);

    setCreatedProductId(data.product.id);
    setIsModalOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        상품등록
      </Typography>
      <form onSubmit={handleCreateProduct}>
        <TextField
          label="상품명"
          fullWidth
          value={name}
          onChange={handleNameChange}
          margin="normal"
        />
        <TextField
          label="가격"
          fullWidth
          value={price}
          onChange={handlePriceChange}
          margin="normal"
        />
        <TextField
          label="상품설명"
          fullWidth
          multiline
          rows={5}
          value={explanation}
          onChange={handleExplanationChange}
          margin="normal"
        />
        <ThumbnailUploader
          value={thumbnail}
          onChange={(file) => setThumbnail(file)}
        />

        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          sx={{ marginTop: 6 }}
        >
          등록
        </Button>
      </form>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          성공적으로 등록했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            상세페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePushProductPage} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductCreateForm;
