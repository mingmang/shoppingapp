import { useEffect, useMemo, useState } from "react";
import { ProductType } from "../type";
import { useCookies } from "react-cookie";
import { getProduct } from "./Api";

type CartType = ProductType & { count: number };

const COOKIE_KEY = "cart" as const;

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const [carts, setCarts] = useState<CartType[]>([]);

  const productIds = useMemo(
    () => (cookies[COOKIE_KEY] as string[]) ?? [],
    [cookies]
  );

  const addCart = (id: string) => {
    const newCartIds = [...productIds, id];
    setCookies(COOKIE_KEY, newCartIds, { path: "/" });
  };

  useEffect(() => {
    if (productIds && productIds.length) {
      const requestList: Array<Promise<any>> = [];
      const requestIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map<string, number>()
      );

      Array.from(requestIds.keys()).forEach((id) => {
        requestList.push(getProduct(id));
      });
      Promise.all(requestList).then((responseList) => {
        const cartsData: CartType[] = responseList.map((response) => ({
          ...response.product,
          count: requestIds.get(response.product.id),
        }));
        setCarts(cartsData);
      });
    }
  }, [productIds]);

  const changeCount = (productId: string, mode: "increase" | "decrease") => {
    const index = productIds.indexOf(productId);
    if (index === -1) return;

    if (mode === "decrease") {
      const tempArr = [...productIds];
      tempArr.splice(index, 1);

      if (!tempArr.includes(productId)) {
        return;
      }

      setCookies(COOKIE_KEY, tempArr, {
        path: "/",
      });
    }
    if (mode === "increase") {
      setCookies(COOKIE_KEY, [...productIds, productId], {
        path: "/",
      });
    }
  };

  const deleteCart = (id: string) => {
    console.log(productIds);
    console.log(id);
    const nextCarts = productIds.filter((productIds) => productIds !== id);
    setCookies(COOKIE_KEY, nextCarts, { path: "/" });
    if (nextCarts.length === 0) window.location.reload();
  };

  return { carts, addCart, changeCount, deleteCart };
};

export default useCart;
