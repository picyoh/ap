export const randomColor = (hue) =>{
    let rgb = {r:"0", g:"0", b:""};
    const max = 255;
    for(const number in rgb){
        rgb[number] = Math.floor(Math.random() * max);
    }
    if(hue){
        for(const key in hue){
            rgb[key] = hue[key];
            //console.log(hue, rgb)
        }
    }
    return rgb;
}

export const randomPick = (obj) =>{
    let keys = Object.keys(obj);
    let random = keys[ keys.length * Math.random() << 0];
    const hue = Object.fromEntries(Object.entries(obj).filter(([key]) => key !== random));
    //console.log(random, hue)
    return hue;
};