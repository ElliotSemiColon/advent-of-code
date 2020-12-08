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
        if(((passwords[i].split(letters[i])).length-1 > policies[i][1]) || ((passwords[i].split(letters[i])).length-1 < policies[i][0])){ 
            /* the above if statement splits each password at each instance of its policy letter and gets the length of the array created, which is always 1 longer than the number of 
            that letter in the password. this number i can check fits into the policy range, and if it does, it interates the counter below in the else statement*/
        }else{counter++;}
    }

    console.log(`${counter} valid passwords`);

}
