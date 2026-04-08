var container = document.getElementById("container");

function getRandomChars(num) {
    var chars = "";
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < num; i++) {
        chars += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return chars;
}

window.onload = function() {
    container.innerHTML = getRandomChars(Math.floor(Math.random() * 3));
    container.focus(); 
};

window.addEventListener("keyup", function(e) {
    var currentText = container.innerHTML;
    
    if (currentText.length > 0 && e.key === currentText.charAt(0)) {
        container.innerHTML = currentText.substring(1);
    }

    add_new_chars();
});

function add_new_chars() {
    var numToAdd = Math.floor(Math.random() * 3 + 1); 
    container.innerHTML += getRandomChars(numToAdd);
};
