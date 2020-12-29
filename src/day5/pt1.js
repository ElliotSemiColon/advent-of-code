const file = await Deno.open("input.txt");
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(await Deno.readAll(file));
const lineData = text.match(/[FBRL]{10}(?=\r\n)/g);

//console.log(lineData);

function seatID(string){
    let row = rowToBinary(string.substring(0, 7));
    let column = columnToBinary(string.substring(7, 10));
    console.log(row, column);
    let ID = (row * 8) + column;
    return ID;
}

function rowToBinary(string){
    let temp = string.replace(/F/g, "0");
    temp = temp.replace(/B/g, "1");
    return parseInt(temp, 2);
}

function columnToBinary(string){
    let temp = string.replace(/L/g, "0");
    temp = temp.replace(/R/g, "1");
    return parseInt(temp, 2);
}

function main(){
    let temp = 0;
    let highest = 0;

    lineData.forEach(line => {

        temp = seatID(line);
        if(temp > highest){highest = temp;}

    });

    console.log(highest);
}

main();