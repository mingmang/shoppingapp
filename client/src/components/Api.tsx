import { ProductType } from "../type";
import axios, { AxiosResponse } from "axios";
type ReturnType<T> = Promise<AxiosResponse<T>>;

//전체 상품
export const getProducts = async (): ReturnType<{
  products: ProductType[];
}> => {
  try {
    const response = await axios.get(`/product`);
    return response;
  } catch (error) {
    throw error;
  }
};

//개별 상품
export const getProduct = async (
  id: string
): ReturnType<{ product: ProductType }> => {
  try {
    const response = await axios.get(`/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (
  newProduct: Omit<ProductType, "id">
): ReturnType<{ product: ProductType }> => {
  try {
    const response = await axios.post(`/product`, newProduct);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (
  id: string
): ReturnType<{ product: ProductType }> => {
  try {
    const response = await axios.delete(`/product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const modifyProduct = async (
  updateProduct: ProductType
): ReturnType<{ product: ProductType }> => {
  try {
    const response = await axios.patch(
      `/product/${updateProduct.id}`,
      updateProduct
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const modifyThumbnail = async (
  productId: string,
  thumbnail: File
): ReturnType<{ product: ProductType }> => {
  try {
    const formData = new FormData();

    formData.append("thumbnail", thumbnail);
    const response = await axios.patch(
      `/product/thumbnail/${productId}`,
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
