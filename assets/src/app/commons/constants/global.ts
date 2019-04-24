export const url = 'http://localhost:8000/';

export function randomString(length){
    let str="";
    for(; str.length < length; str+= Math.random().toString(36).substr(2));
    return str.substr(0, length);
}