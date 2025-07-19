import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { fetchPostCart } from "../../redux/slices/cartSlice";

export const usePostCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const addCart = (product: {img: string, title: string, price: number, count: number}) => {
        dispatch(fetchPostCart(product));
    }

    return {addCart}

}