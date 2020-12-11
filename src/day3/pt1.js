const file = await Deno.open('input1.txt');
const decoder = new TextDecoder('utf-8');
const text = decoder.decode(await Deno.readAll(file));
const treeArray = text.split("\n");

let slope = 3; //higher number, lower incline 

let pointer = 0; //akin to a value on the x axis
let treesHit = 0;
let state;

treeArray.forEach((item) => {

    state = item.charAt(pointer % (item.length-1)); //pointer modulo length of each line
    
    console.log(pointer % (item.length-1));

    if (state == `#`){
        treesHit++;
        console.log(`hit`);
    }else{
        console.log(`no hit`);
    }

    pointer += slope;

})

console.log(`${treesHit} trees hit at gradient ${slope}`);