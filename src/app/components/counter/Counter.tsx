import React, { useContext, useEffect, useState } from "react";
import { CartAxiosContext } from "../../../../useContexts/CartAxios";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { ProductsAxiosContext } from "../../../../useContexts/ProductsAxios";

export default function Counter({
  setQuantityValue,
  itemId,
  itemQuantity,
}: any) {
  const {
    cartData,
    setNewRenderCart,
    localCartProdKeyData,
    setLocalCartProdKeyData,
  } = useContext(CartAxiosContext);

  const { setAlertText, setShowAlert, setAlertstatus } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const isincart = cartData?.find(
    (cartItem: any) => parseInt(cartItem.imgs_color_id, 10) === parseInt(itemId, 10)
  );

  const foundItem = localCartProdKeyData.find(
    (itemdd: any) => itemdd.id == itemId
  );

  const [value, setValue] = useState(1);

  const handleIncrease = () => {
    if (itemQuantity >= value + 1) {
      setValue((pre: number) => pre + 1);
      setQuantityValue((pre: number) => pre + 1);

      if (isincart) {
        axiosClient
          .post(`user/cart/${isincart?.id}`, {
            quantity: (value ?? 0) + 1,
          })
          .then((res) => {
            setNewRenderCart(res);
          })
          .catch((error) => {
            setShowAlert(true);
            setAlertstatus(false)
            if (
              error.response.data.message ===
              "There are no products of this quantity."
            ) {
              setAlertText("ამჟამად საჭირო მარაგი არ არსებობს");
            } else {
              setAlertText("ვერ დაემატა");
            }
            setValue(isincart?.quantity);
            setQuantityValue(isincart?.quantity);
            setNewRenderCart(error);
          });
      }
      if (foundItem) {
        let data = foundItem;
        data.quantity = data.quantity + 1;

        setLocalCartProdKeyData((prev: any) => [...prev], data);
        localStorage.setItem(
          "BrandShopCartData",
          JSON.stringify([...localCartProdKeyData])
        );
      }
    } else {
      setShowAlert(true);
      setAlertstatus(false)

      setAlertText("ამჟამად საჭირო მარაგი არ არსებობს");
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  const handleDecrease = () => {
    if (value > 1) {
      if (itemQuantity > value - 1) {
        setValue((pre: number) => pre - 1);
        setQuantityValue((pre: number) => pre - 1);

        if (isincart) {
          axiosClient
            .post(`user/cart/${isincart?.id}`, {
              quantity: (value ?? 0) - 1,
            })
            .then((res) => {
              setNewRenderCart(res);
            })
            .catch((error) => {
              setShowAlert(true);
              setAlertstatus(false)
              if (
                error.response.data.message ===
                "There are no products of this quantity."
              ) {
                setAlertText("ამჟამად საჭირო მარაგი არ არსებობს");
              } else {
                setAlertText("ვერ დაემატა");
              }
              setValue(isincart?.quantity);
              setQuantityValue(isincart?.quantity);
              setNewRenderCart(error);
            });
        }
        if (foundItem) {
          let data = foundItem;
          data.quantity = data.quantity - 1;

          setLocalCartProdKeyData((prev: any) => [...prev], data);
          localStorage.setItem(
            "BrandShopCartData",
            JSON.stringify([...localCartProdKeyData])
          );
        }
      } else {
        setShowAlert(true);
        setAlertstatus(false)
        setAlertText("ამჟამად საჭირო მარაგი არ არსებობს");

        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value, 10) || 1;
    setValue(inputValue);
    setQuantityValue(inputValue);
  };


  useEffect(() => {
    
      setValue(foundItem?.quantity || 1);
      setQuantityValue(foundItem?.quantity || 1);
    
  }, [foundItem?.quantity, isincart?.quantity, setQuantityValue]);

  return (
    <div className="flex items-center gap-[3px]">
      <p
        className="bg-gray-300 hover:bg-gray-400 hover:shadow hover:shadow-gray-400 duration-100 w-[30px] select-none h-[30px] rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          handleDecrease();
        }}
      >
        -
      </p>
      <input
        type="text"
        className="w-[40px] h-[25px] text-[14px] text-center outline-none border-b-[1px] border-gray-400"
        value={value}
        onChange={handleInputChange}
      />
      <p
        className="bg-gray-300 hover:bg-gray-400 hover:shadow hover:shadow-gray-400 duration-100 w-[30px] select-none h-[30px] rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          handleIncrease();
        }}
      >
        +
      </p>
    </div>
  );
}