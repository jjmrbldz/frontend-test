const validation = {
    getValidations() {
        $.ajax({
            url: "http://localhost:8080/getRegex",
            success: function (data) {
                validation.addValidationToInput(data);
            }
        });
    },
    addValidationToInput(data) {
        var required, maxlength, pattern;

        for (var x in data) {
            pattern = data[x].regex;
            maxlength = data[x].maxlength;
            if (data[x].req === 1) {
                required = false;
            } else {
                required = true;
            }
            if (typeof pattern === "object") {
                console.log(`API returns wrong data type of pattern for ${x}`);
                pattern = undefined;
            }
            if (typeof maxlength === "object") {
                console.log(
                    `API returns wrong data type of maxlength for ${x}`
                );
                maxlength = undefined;
                $(`#${x}`).attr("maxlength", null);
            }
            $(`#${x}`).rules("add", {
                pattern: pattern,
                required: required,
                maxlength: maxlength
            });
            console.log(`Inputfield: ${x} | Regex: ${pattern}`);
        }
    }
};

$(document).ready(function () {
    validation.getValidations();
    $("#registerForm").validate({
        errorClass: "is-invalid",
        validClass: "is-valid",
        submitHandler: function () {
            alert("Submitted!");
        }
    });
});
