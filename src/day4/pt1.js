const file = await Deno.open("input.txt");
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(await Deno.readAll(file));
const lineData = text.split("\n");

//to generate passports 

let passports = [];
let tempArray = [];

lineData.forEach(item =>{
    if(item == "\r"){
        let concatTempArray = "";
        tempArray.forEach(line =>{
            concatTempArray += (`${line} `); //adds the separate line with a space beforehand
        });
        passports.push(concatTempArray.trim());
        tempArray = [];
    }else{tempArray.push(item.split("\r")[0]);}
});

console.log(passports[passports.length-1]);

//deno run --unstable --allow-write --allow-read pt1.js

let valids = 0; 
let validPassport = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]; 

passports.forEach(passport => {
    let fields = passport.split(" ");
    let identifiers = [];
    
    fields.forEach(field => {
        identifiers.push(field.split(":")[0]);
    });

    if(validate(identifiers)){
        console.log("good shit home slice !")
        valids++;
    }else{console.log(`bad passport ${identifiers}`)}

});

function validate(tempPassport){
    for(let i = 0; i < validPassport.length; i++){
        if(tempPassport.includes(validPassport[i])){
            //console.log(`valid field`);
        }else{
            console.log(`no ${validPassport[i]} field here`);
            return false;
        }
    }
    return true;
    console.log(`good passport`);
    /*console.log(tempPassport, validPassport)
    if((tempPassport == validPassport.slice(0,8))||(tempPassport == validPassport)){valids++;}
    tempPassport = [];*/
}

console.log(valids);