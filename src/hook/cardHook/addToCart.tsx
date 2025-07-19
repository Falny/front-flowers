import { useDispatch } from "react-redux";
import { fetchPostCart } from "../../redux/slices/cartSlice";
import type { AppDispatch } from "../../redux/store";

export const AddToCart = () => {
    const dispatch = useDispatch<AppDispatch>()

    const addToCart = async (product: { img:string, title: string, price: number }) => {
      await dispatch(fetchPostCart(product));
    };

    return {addToCart}
};