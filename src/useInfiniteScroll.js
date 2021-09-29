import React from "react";
import { useEffect } from "react";

function useInfiniteScroll(callback) {
  useEffect(() => {
    const scrollBottom = () => {
      const {
        scrollHeight,
        scrollTop,
        clientHeight
      } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight) {
        callback();
      }
    };

    window.addEventListener("scroll", scrollBottom);

    return () => {
      window.removeEventListener("scroll", scrollBottom);
    };
  }, [callback]);
}

export default useInfiniteScroll;
