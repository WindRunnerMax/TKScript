/*
// scan - object
var weakSet = new WeakSet();
var pathRouter = ["root"];

var deepScanObject = (origin, deep, maxDeep) => {
    if(deep > maxDeep) return ;
    for(let item in origin) {
        try{
            const value = origin[item];
            if(value && typeof(value) === "object") {
                if(weakSet.has(value)) continue;
                weakSet.add(value);
                pathRouter.push(item);
                deepScanObject(value, deep + 1, maxDeep);
                pathRouter.pop();
            }else{
                const regexp = /以熔体流动速率/;
                if(regexp.test(item) || regexp.test(value)){
                    console.log(
                        pathRouter.join("/") + "/" + item, 
                        "================", 
                        value
                    )
                }
            }   
        }catch(e){
            console.warn(e)
        }

    }
}

deepScanObject.toString = () => "";

console.log("start");

deepScanObject(window, 0, 10)
// deepScanObject({a : 1, b: { c : 1 } }, 0, 2)

console.log("finish");
*/
