
const COOKIE_KEY_PRE="lite-shop-mobile-"
const tokenKey = COOKIE_KEY_PRE+"token"
export default {
  getToken:function(){
    return localStorage.getItem(tokenKey)
  },
  setToken:function(token){
    localStorage.setItem(tokenKey,token)
  },
  removeToken:function(){
    localStorage.removeItem(tokenKey)
  },
  set:function(key,value){
    localStorage.setItem(key,value)
  },
  get:function(key){
    return localStorage.getItem(key)
  }

}