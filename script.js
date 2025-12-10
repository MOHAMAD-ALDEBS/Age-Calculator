const btn = document.getElementById("calculateBtn");
const result = document.getElementById("result");
const birthDateInput = document.getElementById("birthday");


function calculateAge(birthDate) {

    const birthdayValue = birthDate.value;

    if (birthdayValue === "") {
        alert("Please enter your birthday.");
    }
    else {
            const today = new Date();
            const birth = new Date(birthdayValue);
            const age = today.getFullYear() - birth.getFullYear();
            if (today.getMonth() < birth.getMonth() ||
                (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
                age--;
            }
            else {
                result.innerText = `You are ${age} years old.`;
            }
    }
}
btn.addEventListener("click", function () {
    calculateAge(birthDateInput);
});
