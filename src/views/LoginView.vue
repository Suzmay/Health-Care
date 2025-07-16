<template>
  <!-- 总容器 -->
  <div class="wrapper">
    <h1>体检预约-登录</h1>
    <section>
      <div class="input-box">
        <i class="fa fa-user-o"></i>
        <input type="text" placeholder="输入手机号" v-model="users.userId">
      </div>
      <div class="input-box">
        <i class="fa fa-lock"></i>
        <input type="password" placeholder="输入登录密码" v-model="users.password">
      </div>
      <div class="reg-box">
        <p @click="register">注册</p>
        <p>忘记密码？</p>
      </div>
      <div class="button-box" @click="login">登录</div>
    </section>
    <footer>
      <div>
        <div class="line"></div>
        <p>有疑问请联系客服</p>
        <div class="line"></div>
      </div>
      <p>4008-XXX-XXX</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
// 定义和页面数据关联的数据对象
const state = reactive({
  users: {
    userId: "",
    password: "",
  },
});
// 登录事件
function login() {
  console.log('跳转到登录页面，登录用户:' + state.users.userId);

  // 1. 非空校验
  if (state.users.userId === "" || state.users.password === "") {
    alert("用户名或密码不能为空");
    return;
  }
  // 2.异步请求后端工程，判断用户是否合法
  axios
    .post("http://localhost:8080/login",state.users)
    .then((response) => {
      // 首先去后端返回数据
      let result=response.data;
      if(result.status==200){
        // 登录成功
        // 跳转到首页面
        alert(result.message);
        router.push('/index');
      }else{
        alert(result.message);
        state.users.userId="";
        state.users.password="";
      }
    })
    .catch(function (error) {
      // 请求失败处理
      console.log(error);
      alert("网络异常，请稍后再试");
    });
}
function register() {
  console.log('跳转到注册页面');
}
const { users } = toRefs(state);
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
/*********************** 总容器 ***********************/
.wrapper{
    min-height: 100vh;
    width: 100%;
    background-image: linear-gradient(45deg,#266C9F,#266C9F,#7EB059);
    overflow: hidden;
}

/*********************** 标题部分 ***********************/
h1{
    text-align: center;
    color: #FFF;
    font-size: 9.5vw;
    font-weight: 500;
    margin-top: 13vh;
    margin-bottom: 3vh;
}

/*********************** 内容部分 ***********************/
section{
    width: 86vw;
    margin: 0 auto;
    background-color: #FFF;
    border-radius: 2.4vw;

    box-sizing: border-box;
    padding: 6vw;
}

section .input-box{
    width: 100%;
    height: 12vw;
    border: solid 1px #CCC;
    border-radius: 2vw;
    margin-top: 5vw;

    display: flex;
    align-items: center;
}
section .input-box i{
    margin: 0 3.6vw;
    font-size: 5.4vw;
    color: #CCC;
}
section .input-box input{
    border: none;
    outline: none;
}

section .reg-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 5vw;
    margin-bottom: 2vw;
}
section .reg-box p{
    font-size: 3.3vw;
    color: #2D727E;
    user-select: none;
    cursor: pointer;
}

section .button-box{
    width: 100%;
    height: 13vw;
    border-radius: 2vw;
    background-color: #70B0BC;

    text-align: center;
    line-height: 13vw;
    font-size: 4.6vw;
    color: #FFF;
    letter-spacing: 1vw;

    user-select: none;
    cursor: pointer;
}

/*********************** footer部分 ***********************/
footer{
    width: 86vw;
    margin: 0 auto;
    margin-top: 12vw;
    font-size: 3.8vw;
    color: #FFF;
}
footer div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
footer div .line{
    width: 22vw;
    height: 1px;
    background-color: #FFF;
}
footer > p{
    text-align: center;
    margin-top: 2vw;
}
</style>