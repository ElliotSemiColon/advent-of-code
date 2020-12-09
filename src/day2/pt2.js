let data = ""
let array;
document.getElementById('input-stream').addEventListener('input', analyse);

function analyse(){
    
    let policies = [];
    let letters = [];
    let passwords = [];

    data = this.value;
    array = data.split(" ");
    
    for(let i = 0; i < Math.floor(array.length/3); i++){
        policies.push(array[i*3].split("-"));
        let temp = array[(i*3)+1].split(":");
        letters.push(temp[0]);
        passwords.push(array[(i*3)+2]);
    }
    
    //console.log(policies, letters, passwords);
    //console.log((passwords[0].split("a")).length-1);

    let counter = 0;

    for(let i = 0; i < Math.floor(array.length/3); i++){
        if((passwords[i].charAt(policies[i][0]-1) == letters[i])&&(passwords[i].charAt(policies[i][1]-1) == letters[i])){ 
            //invalid
        }else if((passwords[i].charAt(policies[i][0]-1) != letters[i])&&(passwords[i].charAt(policies[i][1]-1) != letters[i])){
            //invalid
        }else{
            counter++;
        }
    }

    console.log(`${counter} valid passwords`);

}
