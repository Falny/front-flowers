import "./style.scss";

import instance from "../../axios";
import { InteractionItem } from "../../hook/cartItemsHook/interactionItem";

type cartProps = {
  _id: string;
  img: string;
  title: string;
  price: number;
  count: number;
};

export const CartItems = ({ _id, img, title, price, count }: cartProps) => {
  const { deleteItem, updateItem } = InteractionItem();

  const onClickDelete = (id: string) => {
    deleteItem(id);
  };

  return (
    <>
      <div className="cart-items">
        <div className="cart-items-block">
          <img
            src={instance.defaults.baseURL + img}
            alt=""
            className="cart-img"
          />
          <div className="cart-items-info">
            <p className="cart-items-title">{title}</p>
            <div className="cart-items-count">
              <div
                className="cart-count cart-count-minus"
                onClick={() =>
                  updateItem({ id: _id, type: "minus" })
                }
              >
                -
              </div>
              <div className="cart-num">{count}</div>
              <div
                className="cart-count cart-count-plus"
                onClick={() => updateItem({ id: _id, type: "plus" })}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div className="cart-items-inter">
          <p className="cart-items-price">{price * count} P</p>
          <button className="cart-items-del" onClick={() => onClickDelete(_id)}>
            Удалить
          </button>
        </div>
      </div>
    </>
  );
};
