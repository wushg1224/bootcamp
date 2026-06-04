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

//validator

const fanBoardForm = document.getElementById("fan-board-form");
const fanBoardButton = fanBoardForm.querySelector(".fan-board__submit");
const fanBoardStatus = fanBoardForm.querySelector(".fan-board__status");

const nameInput = fanBoardForm.querySelector('[name = "name"]');
const emailInput = fanBoardForm.querySelector('[name="email"]');
// console.log(nameInput));
const messageInput = fanBoardForm.querySelector('[name="message"]');

function showError(input, message) {
  const field = input.closest(".fan-board__field");
  const errorBox = fanBoardForm.querySelector(
    `[data-error-for="${input.name}"]`,
  );
  field.classList.add("is-error");
  errorBox.textContent = "";
}

function clearError(input) {
  const field = input.closest(".fan-board__field");
  const errorBox = fanBoardForm.querySelector(
    `[data-error-for="${input.name}"]`,
  );

  field.classList.remove("is-error");
  errorBox.textContent = "";
}

function isValidEmail(email) {
  return email.includes("@");
}

// fanBoardForm.addEventListener("submit", function (event) {
//   event.preventDefault();

//   let isValid = true;
//   const name = nameInput.value.trim();
//   const email = emailInput.value.trim();
//   const message = messageInput.value.trim();

//   if (name === "") {
//     showError(nameInput, "请填写姓名。");
//     isValid = false;
//   } else {
//     clearError(nameInput);
//   }

//   if (!isValidEmail(email) && email === "") {
//     showError(emailInput, "fill emial");
//     isValid = isValid = false;
//   } else {
//     clearError(emailInput);
//   }

//   if (message.length < 10) {
//     showError(messageInput, "fill msg");
//     isValid = false;
//   } else {
//     clearError(messageInput);
//   }
//   if (!isValid) {
//     fanBoardStatus.textContent = "请先补全红色提示的字段。";
//     return;
//   }
//   fanBoardButton.disabled = true;
//   fanBoardButton.textContent = "送出中...";
//   fanBoardStatus.textContent = "正在提交留言...";

//   setTimeout(function () {
//     fanBoardButton.disabled = false;
//     fanBoardButton.textContent = "送出留言";
//     fanBoardStatus.textContent = "留言已提交成功！";
//     fanBoardForm.reset();
//   }, 1000);
// });
fanBoardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  fanBoardButton.disabled = true;
  fanBoardButton.textContent = "提交中...";
  fanBoardStatus.textContent = "";

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    }),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("提交失败");
      }

      return response.json();
    })
    .then(function () {
      fanBoardForm.reset();
      fanBoardStatus.textContent = "留言已提交成功！";
    })
    .catch(function () {
      fanBoardStatus.textContent = "提交失败，请稍后再试。";
    })
    .finally(function () {
      fanBoardButton.disabled = false;
      fanBoardButton.textContent = "送出留言";
    });
});
