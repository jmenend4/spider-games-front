import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./carousel.css";
import miles from "../../../../../resources/Marvels-Spider-Man-Miles-Morales-1.jpg";
import miles1 from "../../../../../resources/miles.jfif";
import miles2 from "../../../../../resources/miles1.jfif";
import miles3 from "../../../../../resources/miles2.jfif";
import miles4 from "../../../../../resources/miles3.jfif";

const Carousel = ({ refocus }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const banners = [
    {
      banner: miles,
      link:
        "https://www.playstation.com/es-ar/games/marvels-spider-man-miles-morales/"
    },
    {
      banner: miles1,
      link:
        "https://www.playstation.com/es-ar/games/marvels-spider-man-miles-morales/"
    },
    {
      banner: miles2,
      link:
        "https://www.playstation.com/es-ar/games/marvels-spider-man-miles-morales/"
    },
    {
      banner: miles3,
      link:
        "https://www.playstation.com/es-ar/games/marvels-spider-man-miles-morales/"
    },
    {
      banner: miles4,
      link:
        "https://www.playstation.com/es-ar/games/marvels-spider-man-miles-morales/"
    }
  ];

  useEffect(() => {
    if (cards.length === 0) {
      moveCarousel(0);
    }
  }, []);

  const moveCarousel = (n) => {
    if (refocus) {
      refocus();
    }
    const _currentCardIndex =
      currentCardIndex === 0 && n < 0
        ? banners.length - 1
        : currentCardIndex === banners.length - 1 && n > 0
        ? 0
        : currentCardIndex + n;
    let _cards = [];
    let i;
    for (i = 0; i < banners.length; i++) {
      let _card = "";
      if (i === _currentCardIndex) {
        _card = (
          <img
            key={"banner" + i}
            className="carousel-item"
            src={banners[i].banner}
            onClick={() => handleBannerClick()}
          ></img>
        );
      } else {
        _card = (
          <img
            key={"banner" + i}
            className="carousel-item not-visible"
            src={banners[i].banner}
            onClick={() => handleBannerClick()}
          ></img>
        );
      }
      _cards.push(_card);
    }
    setCurrentCardIndex(_currentCardIndex);
    setCards(_cards);
  };

  const handleBannerClick = () => {
    if (refocus) {
      refocus();
    }
    window.open(banners[currentCardIndex].link);
  };

  return (
    <>
      <div className="carousel-container" onClick={(e) => e.stopPropagation()}>
        {cards}
        {/* <img
          className="carousel-item"
          src={miles}
          onClick={() => handleBannerClick()}
        ></img> */}
        <a
          className="prev"
          onClick={() => moveCarousel(-1)}
          onTransitionEnd={(e) => e.stopPropagation()}
        >
          &#10094;
        </a>
        <a
          className="next"
          onClick={() => moveCarousel(1)}
          onTransitionEnd={(e) => e.stopPropagation()}
        >
          &#10095;
        </a>
      </div>
    </>
  );
};

Carousel.propTypes = {
  refocus: PropTypes.func.isRequired
};

export default Carousel;
