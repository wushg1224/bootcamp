//test scroll postion
// window.addEventListener("scroll", function () {
//   console.log("现在滚到的位置:", window.scrollY);
// });

//scroll to top btn
const toTopButton = document.querySelector(".to-top");

function syncToTopButton() {
  toTopButton.classList.toggle("is-visible", window.scrollY > 114);
}

window.addEventListener("scroll", syncToTopButton, { passive: true });
toTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
syncToTopButton();
