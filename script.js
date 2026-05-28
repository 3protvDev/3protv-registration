const phoneInput = document.getElementById("phone");
const form = document.getElementById("seminar-form");

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 3) {
      phoneInput.value = digits;
      return;
    }

    if (digits.length <= 7) {
      phoneInput.value = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      return;
    }

    phoneInput.value = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    alert("신청이 완료되었습니다. 입력하신 연락처로 안내드리겠습니다.");
    form.reset();
  });
}
