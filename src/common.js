//向sessionStorage存对象
export function setSessionStorage(keyStr,value){
    sessionStorage.setItem(keyStr,JSON.stringify(value));//存的是字符串
}

//取
export function getSessionStorage(keyStr){
    var str=sessionStorage.getItem(keyStr);
    if(str==''||str==null||str=="null"||str==undefined){
        return null;
    }else{
        return JSON.parse(str);  //返回一个对象
    }
}

//移除
export function removeSessionStorage(keyStr){
    sessionStorage.removeItem(keyStr);
}