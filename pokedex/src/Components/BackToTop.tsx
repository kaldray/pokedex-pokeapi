export const GoPageTop = () => {
  function scrollToTop() {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <div onClick={scrollToTop} className="container__top">
        <div></div>
      </div>
    </>
  );
};
