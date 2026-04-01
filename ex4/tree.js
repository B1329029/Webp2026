function tree(n) {
    printTreeTop(n);
    printTreeBottom(n);
}
 
function printTreeTop(n) {
    for (let i = 0; i < n; i++) {
        console.log('"' + ' '.repeat(n - i - 1) + '*'.repeat(2 * i + 1) + '"');
    }
}
 
function printTreeBottom(n) {
    for (let i = 0; i < 3; i++) {
        console.log('"' + ' '.repeat(n - 1) + '*' + '"');
    }
}
 
tree(4);