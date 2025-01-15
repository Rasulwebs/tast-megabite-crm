"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { notify } from "@/lib/utils/notify/notify";
import { ProductService } from "@/services/product.service";
import { setCartproducts } from "@/store/cartSlice";
import { CartTypes } from "@/types/cart";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Skeleton, Typography } from "antd";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useAppDispatch();
  const allCartProducts = useAppSelector(
    (state) => state.cart.cartProucts || []
  );
  const {
    data: productData,
    isLoading: productDataLoading,
    error: productDataError,
  } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => ProductService.getProducts(),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        dispatch(setCartproducts(JSON.parse(storedCart)));
      }
    }
  }, []);

  const removeFromCart = (productId: string) => {
    const updatedCart = allCartProducts?.filter(
      (product) => product.id !== productId
    );
    if (updatedCart) {
      dispatch(setCartproducts(updatedCart));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      notify("success", "Товар успешно удален из корзины");
    }
  };

  return (
    <div className='px-20 py-12'>
      <div className='flex justify-end'>
        <h4>Корзина ({allCartProducts?.length})</h4>
      </div>

      <Typography.Title className='font-medium mb-4' level={2}>
        Товары в корзине
      </Typography.Title>

      <div className='flex gap-4'>
        {productDataLoading ? (
          <Skeleton />
        ) : (
          allCartProducts?.map((p, i) => {
            return (
              <Card hoverable key={p?.id || i}>
                <div className='mb-2'>
                  <Typography.Title className='font-medium' level={4}>
                    {p?.name}
                  </Typography.Title>
                  <Typography.Text className='font-medium'>
                    {p?.description}
                  </Typography.Text>
                </div>

                <Button
                  block
                  type='primary'
                  icon={<DeleteOutlined />}
                  onClick={() => removeFromCart(p?.id)}
                >
                  Удалить
                </Button>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
