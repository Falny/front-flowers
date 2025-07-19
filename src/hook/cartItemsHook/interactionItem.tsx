import { FetchDelete, FetchUpdate } from "../../redux/slices/cartSlice";
import type { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

export const InteractionItem = () => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteItem = async (id: string) => {
    await dispatch(FetchDelete(id));
    };

  const updateItem = async ({id, type }: {id: string, type: string}) => {
        await dispatch(FetchUpdate({id, type}))
    }
    
    return {deleteItem, updateItem}
};
