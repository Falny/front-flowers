import "./style.scss";
import { DopCard } from "./dopCard";
import { CarouselInsideCart } from "./carousel";
import { Breadcrumbs } from "../bredcrams";
import { useNavigate } from "react-router-dom";
import { useCommomLogicCard } from "../../hook/insideCardHook/commomLigicCard";
import React from "react";

export const InsideCard = React.memo(() => {
  const navigate = useNavigate();
  const ref = React.useRef<HTMLImageElement>(null);
  const [widthImg, setWidthImg] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const CheckWidth = windowWidth > 465;

  const {
    count,
    setCount,
    addCartItem,
    card,
    arrowBottomRef,
    arrowTopRef,
    sliceImages,
    carouselIndex,
  } = useCommomLogicCard();

  React.useEffect(() => {
    if (ref.current) {
      setWidthImg(ref.current.height);
    }
    const handleWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);


  return (
    <>
      <div className="inside-card">
        <div className="container">
          <Breadcrumbs />
          <div className="inside-card_container">
            <div className="inside-card_left">
              <div className="container-carousel">
                <span
                  className="carousel-arrow carousel-arrow-top"
                  ref={arrowTopRef}
                >
                  &lt;
                </span>
                <div
                  className="carousel-carousel"
                  style={{ height: CheckWidth ? "400px" : "fit-content" }}
                >
                  <div
                    className="carousel"
                    style={{
                      transform: `${
                        CheckWidth
                          ? `translateY(-${(carouselIndex * widthImg)*0.1}px)`
                          : `translateX(-${carouselIndex * widthImg}px)`
                      }`,
                      transition: "all 0.3s",
                    }}
                  >
                    {sliceImages.map((el, index) => (
                      <img
                        key={index}
                        src={`http://localhost:1111${el}`}
                        alt="img"
                        className="carousel-card-item"
                        ref={ref}
                      />
                    ))}
                  </div>
                </div>
                <span
                  className="carousel-arrow carousel-arrow-bottom"
                  ref={arrowBottomRef}
                >
                  &lt;
                </span>
              </div>

              <img
                src={`http://localhost:1111${card.img}`}
                alt=""
                className="main-img"
              />
            </div>
            <div className="inside-card_right">
              <div className="ic_right-back" onClick={() => navigate(-1)}>
                <span className="ic_right-arrow"> &lt; </span>
                <p className="ic_right-text">назад</p>
              </div>
              <div className="ic_right-info">
                <div className="info-head">
                  <div className="user-select info-title">{card.title}</div>
                  <div className="ic_right-info-price">
                    <div className="user-select info-price">{card.price} P</div>
                    <div className="info-old-price">
                      {card?.oldPrice ? `${card.oldPrice} P` : ""}
                    </div>
                  </div>
                </div>
                <div className="user-select info-structura">
                  <span className=" structura-title">состав:</span>
                  {card.structura.join(", ")}
                </div>
                <div className="info-text">
                  Завораживающая глубина ваших чувств передана огненными
                  красками этого букета
                </div>
                <div className="user-select info-category">
                  <span className=" category-title">категории:</span>
                  {card.catalog.join(", ")}
                </div>
              </div>
              <div className="ic_right-cart">
                <button
                  className="cart-btn"
                  onClick={() =>
                    addCartItem({
                      img: card.img,
                      title: card.title,
                      price: card.price,
                      count,
                    })
                  }
                >
                  В корзину
                </button>
                <div className="card-count">
                  <div
                    className="count"
                    onClick={() =>
                      setCount((prev) => (prev - 1 === 0 ? prev : prev - 1))
                    }
                  >
                    -
                  </div>
                  <div className="count-number"> {count} </div>
                  <div
                    className="count"
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DopCard title={card.title} />
          <CarouselInsideCart />
        </div>
        <div className="mini-light-green common card-top-green"></div>
        <div className="mini-light-pink common card-top-right-pink"></div>
        <div className="light-pink common card-top-left-pink"></div>
        <div className="light-pink common card-center-pink"></div>
        <div className="light-green common card-right-green"></div>
        <div className="mini-light-green common card-bottom-green"></div>
        <div className="light-green common card-bottom-center-green"></div>
        <div className="mini-light-pink common card-bottom-right-pink"></div>
      </div>
    </>
  );
});
