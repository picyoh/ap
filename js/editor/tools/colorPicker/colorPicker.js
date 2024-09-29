export const randomColor = () =>{
    let rgb = {r:"0", g:"0", b:""};
    const max = 255;
    for(const number in rgb){
        rgb[number] = Math.floor(Math.random() * max);
    }
    return rgb;
}