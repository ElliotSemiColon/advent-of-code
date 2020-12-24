//deno run --allow-read pt2.js
///(?:(?<=(hcl|iyr|ecl|hgt|byr|pid|eyr):))(?<data>\S+)/

const file = await Deno.open("input.txt");
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(await Deno.readAll(file));

let re = /((\w{3}:\S+)|\r)/gm; //0/gm; //will return all fields and data, as well as double newlines to separate passports with|\n\n (\w{3}:\S+)
let passports = [];

let textArray = text.match(re);

let previousItem;
let tempPassport = "";
textArray.forEach(item => {
    if(item+previousItem == "\r\r"){
        passports.push(tempPassport);
        tempPassport = "";
    }else if(item != "\r"){
        tempPassport = `${tempPassport} ${item} `;
    }
    previousItem = item;
});

passports.push(tempPassport);

const reFields = /(byr|iyr|eyr|hgt|hcl|ecl|pid)/g;
const reValues = /(?<=(byr|iyr|eyr|hgt|hcl|ecl|pid):)\S*(?=( ))/g; //lookbehind field name: 0 or more non space characters lookahead single space
let valids = 0;
const cm = /\w{3}(?=cm)/g;
const inches = /\w{2}(?=in)/g;
const hex = /#[0-9a-f]{6}/;
const eyes = /(amb|blu|brn|gry|grn|hzl|oth)/;
const pidCheck = /^[0-9]{9}$/;

passports.forEach(passport =>{
    let fields = passport.match(reFields);
    let values = passport.match(reValues);
    let validFields = 0;
    if(fields.length == 7){
        let byr = values[fields.findIndex((elem => elem == 'byr'))]; //finds the index in the first array, which will corrospond to the second
        if(byr >= 1920 && byr <= 2002){validFields++;} 
        let iyr = values[fields.findIndex((elem => elem == 'iyr'))];
        if(iyr >= 2010 && iyr <= 2020){validFields++;}
        let eyr = values[fields.findIndex((elem => elem == 'eyr'))];
        if(eyr >= 2020 && eyr <= 2030){validFields++;} 
        let hgt = String(values[fields.findIndex((elem => elem == 'hgt'))]);
        if((hgt.match(cm) >= 150 && hgt.match(cm) <= 193)||(hgt.match(inches) >= 59 && hgt.match(inches) <= 76)){validFields++;} 
        let hcl = String(values[fields.findIndex((elem => elem == 'hcl'))]);
        if(hex.test(hcl)){validFields++;}
        let ecl = String(values[fields.findIndex((elem => elem == 'ecl'))]);
        if(eyes.test(ecl)){validFields++;}
        let pid = String(values[fields.findIndex((elem => elem == 'pid'))]);
        if(pidCheck.test(pid)){validFields++;}
    }
    if(validFields == 7){valids++;}
});

console.log(valids);