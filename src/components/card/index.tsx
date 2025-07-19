import "./style.scss";
import { Link } from "react-router-dom";
import instance from "../../axios";
import { Scroll } from "../../hook/scrollToTop";
import { AddToCart } from "../../hook/cardHook/addToCart";
import { StyleButton } from "../../hook/cardHook/styleButton";

interface cardProps {
  className?: string;
  _id?: string;
  img: string;
  title: string;
  price: number;
}

export const Card = ({ className, _id, img, title, price }: cardProps) => {
  const { addToCart } = AddToCart();
  const { scrollToTop } = Scroll();
  const {clickBtn, btnAnimation} = StyleButton()

  const addItemCart = ({ img, title, price }: cardProps) => {
    btnAnimation();
    addToCart({ img, title, price });
  };

  return (
    <>
      <div className="card">
        <Link to={`/catalog/${_id}`}>
          <img
            src={instance.defaults.baseURL + img} // вопрос на этом моменте почему нужно прописывать полный путь - значит где то есть ошибка с обработкой данных
            alt=""
            className={`card-img ${className}`}
            onClick={() => scrollToTop}
          />
        </Link>
        <div className="card-description">
          <p className="card-name">{title}</p>
          <p className="card-price">{price} ₽</p>
          <button
            type="button"
            className={`card-btn ${clickBtn && "btn-animate"}`}
            onClick={() => addItemCart({ img, title, price })}
          >
            {clickBtn ? "Добавлено в корзину" : "В корзину"}
          </button>
        </div>
      </div>
    </>
  );
};
