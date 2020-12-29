const file = await Deno.open("input.txt");
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(await Deno.readAll(file));
const lineData = text.match(/[FBRL]{10}(?=\r\n)/g);
let IDs = [0];

console.log(lineData.length);

function seatID(string){
    let row = rowToBinary(string.substring(0, 7));
    let column = columnToBinary(string.substring(7, 10));
    //console.log(row, column);
    let ID = (row * 8) + column;
    return ID;
}

function rowToBinary(string){
    let temp = string.replace(/F/g, "0");
    temp = temp.replace(/B/g, "1");
    return parseInt(temp, 2); //parses the binary to denary 
}

function columnToBinary(string){
    let temp = string.replace(/L/g, "0");
    temp = temp.replace(/R/g, "1");
    return parseInt(temp, 2);
}

function insert(int){ //insertion sort
    //console.log(int);
    for(let i = IDs.length-1; i >= 0; i--){
        if(IDs[i] < int){
            IDs.splice(i+1, 0, int);
            return;
        }
    }
}

function findGap(){
    for(let i = 1; i < IDs.length; i++){ //first seat number i observed to be 59 
        if(IDs[i] != i+58){return i+58;}
    }
}

//range to check for a missing number: 61-904

function main(){
    lineData.forEach(line => {
        //IDs.push(seatID(line));
        insert(seatID(line));
    });

    console.log(IDs);

    console.log(findGap());

}

main();