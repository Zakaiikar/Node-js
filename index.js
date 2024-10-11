const fs = require("fs");

fs.readFile('./sample.txt', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(data);
})

const data = 'This is another example file!'
fs.writeFile('./example.txt', data, (err) => {
    if(err) {
        console.log(err);
    } else{
        console.log('File written!')
    }
})
fs.rename('./example.txt', './Test1.txt', (err) => {
    if(err) {
        console.log(err);
    }
})
fs.unlink('./sample.txt', (err) => {
    if(err) {
        console.log(err);
    }
})