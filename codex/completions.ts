

const basePrompt = 

`/*
Get first word 
*/
a.split(" ")[0];

/*
Replace letter x with letter y
*/
a.replace("x", "y");

/*
Combine a and b
*/
a + b;

/*
Get the first non empty value from a, b, c, and d
*/
a || b || c || d;

/*
If A includes the word Houston then Houston if it includes Austin then Austin otherwise Other
*/
a.includes("Houston") ? "Houston" : a.includes("Austin") ? "Austin" : "Other";

/*
Replace K with 000 and M with 000000
*/
a.replace("K", "000").replace("M", "000000");

/*
Remove both the - and the the second number from a range
Example 1: 5001-10000 -> 5001
*/
a.split("-")[0];

`;


export function createPrompt(request: string, examples: string[]){
    return basePrompt + '\n/*\n' + request + '\n'  + examples.map((example, index) => `Example ${index + 1}: ${example}\n`).join("") + '*/\n';
}