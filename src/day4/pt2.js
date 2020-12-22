//deno run --allow-read pt2.js

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

console.log(passports[0]);

//deno run --unstable --allow-write --allow-read pt1.js

let valids = 0; 
let invalids = 0;
let validPassport = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]; 

passports.forEach(passport => {
    let fields = passport.split(" ");
    console.log(`--------------------`)
    //console.log(fields);
    /*let identifiers = [];
    let data = [];
    
    fields.forEach(field => {
        let tempItem = field.split(":");
        identifiers.push(tempItem[0]);
        data.push(tempItem[1]);
    });*/

    if(validate(fields)){
        valids++;
        console.log(`valid\n--------------------\n`);
    }else{
        invalids++;
        console.log(`bad passport\n--------------------\n`);
    }

});

function validate(fields){
    console.log(`////////////validating////////////`);
    let hasField;
    let isValid;
    let i = 0;
    for(i; i < validPassport.length; i++){
        let requiredField = validPassport[i];
        //console.log(requiredField);
        let indexOfData;
        isValid = true;
        hasField = false;
        for(let x = 0; x < fields.length; x++){
            let temp = fields[x].split(":")[0];
            //console.log(`----------------------->${temp}`);
            if(temp == requiredField){
                //console.log(`${requiredField} == ${temp}`);
                //console.log(temp == requiredField);
                hasField = true;
                indexOfData = x; //index of field validPassport[i] and its data in fields input
            }
        }
        if(!hasField){
            console.log(`MISSING at least field '${requiredField}'`);
            return false;
        }
        let checkData = fields[indexOfData].split(":")[1]; //discards the field identifier and the colon
        let checkDataInt;
        //console.log(checkData);
        try{
            checkDataInt = parseInt(checkData);
        }catch(e){
            console.log("not an integer");
        }
        switch(i){
            case 0: //byr
                if((checkData.length == 4)&&(checkDataInt >= 1920)&&(checkDataInt <= 2002)){
                }else{
                    console.log(`excluded for BIRTH YEAR '${checkData}' 1920-2002`);
                    isValid = false;
                }
                break;
            case 1: //iyr
                if((checkData.length == 4)&&(checkDataInt >= 2010)&&(checkDataInt <= 2020)){}else{
                    console.log(`excluded for ISSUE YEAR '${checkData}' 2010-2020`);
                    isValid = false;
                }
                break;
            case 2: //eyr
                if((checkData.length == 4)&&(checkDataInt >= 2020)&&(checkDataInt <= 2030)){}else{
                    console.log(`excluded for EXPIRATION YEAR '${checkData}' 2020-2030`);
                    isValid = false;
                }
                break;
            case 3: //hgt
                let endingIn = checkData.substr(checkData.length-2, checkData.length); //penultimate and last character of the string
                let number = parseInt(checkData.substr(0,checkData.length-2)); //first to thrid-to-last character
                //console.log(`height number ${number}`)
                if(endingIn == "in"){
                    if((number >= 59)&&(number <= 76)){}else{
                        console.log(`excluded for BAD HEIGHT IN INCHES '${checkData}' 59-76in`);
                        isValid = false;
                    }
                }else if(endingIn == "cm"){
                    if((number >= 150)&&(number <= 193)){}else{
                        console.log(`excluded for BAD HEIGHT IN CENTIMETERS '${checkData}' 150-193cm`);
                        isValid = false;
                    }
                }else{
                    console.log(`excluded for BAD HEIGHT FORMAT '${checkData}' xin/xcm`);
                    isValid = false;
                }
                break;
            case 4: //hcl
                let isHex = /[0-9A-Fa-f]{6}/g; //regex moment
                if(checkData.substr(0,1) == "#"){
                    if(isHex.test(checkData)){}else{
                        console.log(`excluded for BAD HAIR COLOUR VAL '${checkData}' not hex`);
                        isValid = false;
                    }
                }else{
                    console.log(`excluded for NO HASH IN HAIR COLOUR '${checkData}' #xxxxxx`);
                    isValid = false;
                }
                break;
            case 5: //ecl
                let eyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
                if(eyeColours.includes(checkData)){}else{
                    console.log(`excluded for BAD EYES '${checkData}' not part of list`);
                    isValid = false;
                }
                break;
            case 6: //pid
                let nineDigits = /([0-9]{9})/g;
                if(nineDigits.test(checkData)){}else{
                    console.log(`excluded for BAD ID '${checkData}' xxxxxxxxx`);
                    isValid = false;
                }
                break;
            default:
                console.log(`case ${i} invalid`);

        }

        if(!isValid){return false;}

        /*if(fields.substr(0,2).includes(validPassport[i])){
            //console.log(`valid field`);

            switch(){
                case :
                    tempData
                default:
                    
            }*/
    }
    
    
    if((hasField)&&(isValid)){
        //console.log(fields);
        return true;
    }/*else{
        console.log(`no ${validPassport[i]} field here`);
        return false;
    }
    
    /*console.log(tempPassport, validPassport)
    if((tempPassport == validPassport.slice(0,8))||(tempPassport == validPassport)){valids++;}
    tempPassport = [];*/
}

console.log(`\n           --------------------\n           ${valids} valid passports\n           ${invalids} invalid passports\n           of ${passports.length} passports\n           --------------------\n\n`);