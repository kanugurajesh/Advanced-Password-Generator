// const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
//     "/"];

const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const ABC = abc.map(letter => letter.toUpperCase());
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];

const arrayOfArrays = {
    "abc": abc,
    "ABC": ABC,
    "123": numbers,
    "!#&": symbols
}

let randomArray = [];

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let slider = document.getElementById("slider");
let output = document.getElementById("output");
let generate = document.getElementsByClassName("generator")[0];
let text1 = document.getElementById("text1");
let text2 = document.getElementById("text2");
let icon1 = document.getElementById("icon1");
let icon2 = document.getElementById("icon2");
let download1 = document.getElementById("download1");
let download2 = document.getElementById("download2");

function passwordGenerator(array, value) {
    let password = "";
    // let randomArray = 
    // create a random array by concatenating the array names

    // loop through the array and generate a password of length of the value
    for (let i = 0; i < value; i++) {
        // get a random number
        let randomNumber = Math.floor(Math.random() * array.length);
        // get the character at the random number
        let character = array[randomNumber];
        // add the character to the password
        password += character;
    }

    return password;
}

function generateRandomTextFile(name, data, reason) {
    let date = new Date();
    let dateTime = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    const text = "password: " + data + "\n" + "reason: " + reason + "\n" + "date: " + dateTime;
    const filename = name + ".txt";
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.click();
    // generate the date and time
}


// add click event listener to checkboxes
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        checked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
        if (!checked) {
            document.querySelector('#abc').checked = true;
        }
        // add the checked to a list
    });
});

slider.addEventListener("input", () => {
    if (slider.value < 1) {
        alert("slider value cannot be less than 1")
        slider.value = 1;
    } else {
        output.innerHTML = slider.value;
    }
})

let data = abc.concat(ABC, numbers, symbols);

generate.addEventListener("click", () => {
    // get the checked checkboxes
    let checkedData = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
    // get the value of the checked checkboxes
    let checkedValues = checkedData.map((checkbox) => checkbox.value);
    // get the value of the slider
    let sliderValue = slider.value;

    checkedValues.forEach((value) => {
        randomArray = randomArray.concat(arrayOfArrays[value]);
    })

    text1.textContent = passwordGenerator(randomArray, sliderValue);
    text2.textContent = passwordGenerator(randomArray, sliderValue);
})

icon1.addEventListener("click", () => {
    // copy the text to clipboard
    navigator.clipboard.writeText(text1.textContent);
    alert("Copied to clipboard")
})

icon2.addEventListener("click", () => {
    // copy the text to clipboard
    navigator.clipboard.writeText(text2.textContent);
    alert("Copied to clipboard")
})

download1.addEventListener("click", () => {
    let fileName = prompt("Please enter name of the file", "password");
    let reason = prompt("Please enter reason for generating password", "for testing");
    if (fileName == null || fileName == "") {
        alert("File name cannot be empty");
    }
    else {
        generateRandomTextFile(fileName, text1.textContent, reason);
    }
})

download2.addEventListener("click", () => {
    let fileName = prompt("Please enter name of the file", "password");
    let reason = prompt("Please enter reason for generating password", "for testing");
    if (fileName == null || fileName == "") {
        alert("File name cannot be empty");
    }
    else {
        generateRandomTextFile(fileName, text2.textContent, reason);
    }
})