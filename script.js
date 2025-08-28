
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let isValid = true;

    document.querySelectorAll(".error, .success").forEach(el => el.remove());
    document.querySelectorAll("input, textarea, select").forEach(el => el.classList.remove("error-border"));

    let nameInput = document.querySelector('input[placeholder="Name"]');
    let emailInput = document.querySelector('input[type="email"]');
    let orgInput = document.querySelector('input[placeholder="organization"]');
    let contactInput = document.querySelector('input[placeholder="Contact Number"]');
    let genderInput = document.querySelector('#gender'); // dropdown ka ID
    let addressInput = document.querySelector('input[placeholder="Address"]');
    let checkboxes = document.querySelectorAll('.awardd');
    let descriptions = document.querySelectorAll('textarea');

    let nameWords = nameInput.value.trim().split(/\s+/);
    if(nameInput.value.trim() === ""){
        showError(nameInput, "Name is required");
        isValid = false;
    } else if(nameWords.length < 2){
        showError(nameInput, "Full name (at least 2 words) required");
        isValid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailInput.value.trim() === ""){
        showError(emailInput, "Email is required");
        isValid = false;
    } else if(!emailPattern.test(emailInput.value.trim())){
        showError(emailInput, "Enter a valid email");
        isValid = false;
    }

    if(orgInput.value.trim() === ""){
        showError(orgInput, "Organization is required");
        isValid = false;
    } else if(orgInput.value.trim().length < 3){
        showError(orgInput, "Organization must be at least 3 characters");
        isValid = false;
    }

    let contactPattern = /^[0-9]{11}$/;
    if(contactInput.value.trim() === ""){
        showError(contactInput, "Contact Number is required");
        isValid = false;
    } else if(!contactPattern.test(contactInput.value.trim())){
        showError(contactInput, "Enter valid 11 digit contact number");
        isValid = false;
    }

    if(genderInput.value.trim() === ""){
        showError(genderInput, "Please select Gender");
        isValid = false;
    }

    if(addressInput.value.trim() === ""){
        showError(addressInput, "Address is required");
        isValid = false;
    }

    let checked = false;
    checkboxes.forEach((box, index) => {
        if(box.checked){
            checked = true;
            let desc = descriptions[index];
            if(desc.value.trim() === ""){
                showError(desc, "Description is required for this award");
                isValid = false;
            } else {
                let wordCount = desc.value.trim().split(/\s+/).length;
                if(wordCount > 150){
                    showError(desc, "Description must not exceed 150 words");
                    isValid = false;
                }
            }
        }
    });

    if(!checked){
        showError(checkboxes[0].closest(".top-row"), "Select at least one award");
        isValid = false;
    }

    if(isValid){
        let successMsg = document.createElement("span");
        successMsg.classList.add("success");
        successMsg.innerText = "✔ Submission Completed!";
        document.querySelector("form").appendChild(successMsg);
    }
});

function showError(input, message){
    let error = document.createElement("span");
    error.classList.add("error");
    error.innerText = message;

    if(input.tagName === "INPUT" || input.tagName === "TEXTAREA" || input.tagName === "SELECT"){
        input.classList.add("error-border");
        input.insertAdjacentElement("afterend", error);
    } else {
        input.appendChild(error); // for awards row
    }
}
