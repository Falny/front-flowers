import React from "react";
import { usePostCart } from "../../hook/insideCardHook/postCart";
import { useParams } from "react-router-dom";
import instance from "../../axios";

type CardState = {
  img: string;
  imgArchive: string[];
  title: string;
  price: number;
  oldPrice?: number;
  structura: string[];
  catalog: string[];
};

type Cart = {
  img: string;
  title: string;
  price: number;
  count: number;
};

export const useCarouselInsideCard = (imgs: string[]) => {
  const [carouselIndex, setCarouselIndex] = React.useState<number>(0);
  const arrowTopRef = React.useRef<HTMLSpanElement>(null);
  const arrowBottomRef = React.useRef<HTMLSpanElement>(null);

  const sliceImages = imgs.slice(carouselIndex, carouselIndex + 2);

  React.useEffect(() => {
    const arrowBottom = arrowBottomRef.current;
    const arrowTop = arrowTopRef.current;

    const carouselBottom = () => {
      if (carouselIndex + 1 >= imgs.length - 1) return;
      setCarouselIndex((prev) => prev + 1);
    };

    const carouselTop = () => {
      if (carouselIndex - 1 <= -1) return;
      setCarouselIndex((prev) => prev - 1);
    };

    if (arrowBottom) {
      arrowBottom.addEventListener("click", carouselBottom);
    }
    if (arrowTop) {
      arrowTop.addEventListener("click", carouselTop);
    }

    return () => {
      arrowBottom?.removeEventListener("click", carouselBottom);
      arrowTop?.removeEventListener("click", carouselTop);
    };
  }, [carouselIndex, imgs.length]);

  return {
    arrowBottomRef,
    arrowTopRef,
    sliceImages,
    carouselIndex,
  };
};

export const useCommomLogicCard = () => {
  const [card, setCard] = React.useState<CardState>({
    img: "",
    imgArchive: [""],
    title: "Загрузка...",
    price: 0,
    structura: [],
    catalog: [],
  });
  const [count, setCount] = React.useState<number>(1);
  const { id } = useParams();

  const { addCart } = usePostCart();

  const carousel = useCarouselInsideCard(card.imgArchive);

  React.useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        const { data } = await instance.get("/catalog/cards/" + id);
        setCard(data);
      } catch (err) {
        alert("Ошибка карточки товара");
        console.log("Ошибка карточки товара", err);
      }
    };

    fetchItem();
  }, [id]);

  const addCartItem = ({ img, title, price, count }: Cart) => {
    addCart({ img, title, price, count });
  };

  return {
    count,
    setCount,
    addCartItem,
    card,
    ...carousel,
  };
};
