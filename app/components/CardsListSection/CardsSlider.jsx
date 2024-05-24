export const CardsSlider = (props) => {
  useEffect(() => {
    const options = {
      loop: false,
      spaceBetween: 10,
      allowTouchMove: true,
      slidesPerView: 1,
      autoplay: {
        enabled: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
        enabled: true,
        clickable: true,
      },
      breakpoints: {
        450: {
          loop: true,
          spaceBetween: 20,
          allowTouchMove: false,
          slidesPerView: "auto",
          speed: 6500,
          autoplay: {
            enabled: true,
            delay: 0,
          },
          pagination: {
            enabled: false,
          },
        },
      },
      modules: [Autoplay, Pagination],
    };
    new Swiper(".swiper", options);
  }, []);

  // Проверяем, что props.data определен и является массивом
  if (!Array.isArray(props.data) || props.data.length === 0) {
    return null; // Возвращаем null, если данные не определены или пусты
  }

  return (
    <div className={`swiper ${Styles["slider"]}`}>
      <ul className={`swiper-wrapper ${Styles["slider-wrapper"]}`}>
        {props.data.map((item, i) => {
          return (
            <li className={`swiper-slide ${Styles["slide"]}`} key={i}>
              <Link href={`/games/${item.id}`}>
                <Card {...item} />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={`swiper-pagination ${Styles["pagination"]}`}></div>
    </div>
  );
};
