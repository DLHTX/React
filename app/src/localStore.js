export function save(key, value){
  return window.localStorage.setItem(key, JSON.stringify(value))
}

export function load(key){
  return JSON.parse(window.localStorage.getItem(key))
}


//localStorage 封装一下

//每次用户更新数据时，就将所有 todo 以字符串的形式保存在 localStorage 里
//每次用户访问页面是，将 localStorage 里面的字符串变为对象，赋值给 todoList