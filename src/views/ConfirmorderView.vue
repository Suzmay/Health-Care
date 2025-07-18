<template>
    <!-- 总容器 -->
    <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>确认您的订单</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <section>
            <div class="title">
                <p>体检人信息</p>
            </div>
            <table>
                <tr>
                    <td>姓名:</td>
                    <td>{{ users.realName }}</td>
                </tr>
                <tr>
                    <td>证件号码:</td>
                    <td>{{ users.identityCard }}</td>
                </tr>
                <tr>
                    <td>出生日期:</td>
                    <td>{{ formatDate(users.birthday) }}</td>
                </tr>
                <tr>
                    <td>手机号码:</td>
                    <td>{{ users.userId }}</td>
                </tr>
            </table>
            <div class="title">
                <p>体检日期</p>
            </div>
            <table>
                <tr>
                    <td>{{ selectedDay }}</td>
                </tr>
            </table>
            <div class="title">
                <p>体检机构</p>
            </div>
            <table>
                <tr>
                    <td colspan="2">{{ hospital.name }}</td>
                </tr>
                <tr>
                    <td>营业时间:</td>
                    <td>{{ hospital.businessHours }}</td>
                </tr>
                <tr>
                    <td>采血截止:</td>
                    <td>{{ hospital.deadline }}</td>
                </tr>
                <tr>
                    <td>机构电话:</td>
                    <td>{{ hospital.telephone }}</td>
                </tr>
                <tr>
                    <td>机构地址:</td>
                    <td>{{ hospital.address }}</td>
                </tr>
            </table>
            <div class="title">
                <p>套餐类型</p>
            </div>
            <table>
                <tr>
                    <td>{{ setmeal.name }}</td>
                </tr>
            </table>
        </section>
        
        <div class="bottom-btn">
            <div class="first">实付款: <span>¥{{ setmeal.price }}</span></div>
            <div class="last" @click="confirmPay">确认支付</div>
        </div>

        <div class="bottom-ban"></div>
        <Footer></Footer>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const pad = n => n < 10 ? '0' + n : n;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default{
    setup(){
        const router=useRouter();
        const route=useRoute();
        const state=reactive({
            hpId:route.query.hpId,
            smId:route.query.smId,
            users:JSON.parse(sessionStorage.getItem("JNU_user")),
            selectedDay:route.query.selectedDay,
            setmeal:{},
            hospital:{}
        });

        function initData(){
            axios
                .post("/api/loadHospital", {hpId:state.hpId})
                .then((response) => {
                state.hospital=response.data.data;
                })
                .catch((error) => {
                console.error(error);
                });

            axios
                .post("/api/loadSetmeal", {smId:state.smId})
                .then((response) => {
                state.setmeal=response.data.data;
                })
                .catch((error) => {
                console.error(error);
                });
        }

        initData();

        function confirmPay(){
            //请求后端接口，持久化订单数据
            axios
            .post("/api/saveOrders", {
                hpId:state.hospital.hpId,
                smId:state.setmeal.smId,
                userId:state.users.userId,
                orderDate:state.selectedDay,
                state:1
            })    //in：userId  orderDate  hpId  smId
            .then((response) => {
                alert("success");
            })
            .catch((error) => {
            console.error(error);
            });
        }

        return{
            ...toRefs(state),
            initData,
            confirmPay,
            formatDate
        }
    }
}
</script>

<style scoped>
/*********************** 总容器 ***********************/
.wrapper{
    width: 100%;
    height: 100%;
    background-color: #F9F9F9;
}

/*********************** header ***********************/
header{
    width: 100%;
    height: 15.7vw;
    background-color: #FFF;

    position: fixed;
    left: 0;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    padding: 0 3.6vw;
}
header .fa{
    font-size: 8vw;
    color: #222;
}
header p {
    color: #222;
}

/*********************** footer ***********************/
footer{
    width: 100%;
    height: 14.2vw;
    box-sizing: border-box;
    border-top: solid 1px #E9E9E9;
    background-color: #FFF;

    position: fixed;
    left: 0;
    bottom: 0;
}
footer ul{
    width: 100%;
    height: 14.2vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
footer ul li{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 3vw;
    color: #999;

    user-select: none;
    cursor: pointer;
}
footer ul li .fa{
    font-size: 5vw;
}

/*********************** common样式 ***********************/
.top-ban{
    width: 100%;
    height: 15.7vw;
}
.bottom-ban{
    width: 100%;
    height: 26.2vw;
}

/*********************** section ***********************/
section{
    width: 86vw;
    margin: 0 auto;
}
section .title{
    width: 100%;
    height: 12vw;
    border-bottom: solid 1px #EEE;

    display: flex;
    align-items: center;
}
section .title p{
    height: 3.4vw;
    line-height: 3.4vw;
    font-size: 4.2vw;
    font-weight: 600;
    box-sizing: border-box;
    padding-left: 3vw;
    border-left: solid 2px #127A90;
    color: #222;
}
section table{
    font-size: 3.6vw;
    color: #222;
    margin-top: 2vw;
}
section table tr{
    line-height: 8vw;
}
section table tr td:first-child{
    width: 22%;
}

/*********************** bottom-btn ***********************/
.bottom-btn{
    width: 100%;
    height: 12vw;
    background-color: #FFF;

    position: fixed;
    left: 0;
    bottom: 14.2vw;

    display: flex;
}
.bottom-btn .first{
    flex: 2;
    line-height: 12vw;
    font-size: 4.6vw;
    box-sizing: border-box;
    padding-left: 6vw;
    color: #222;
}
.bottom-btn .first span{
    color: #F77B2D;
}
.bottom-btn .last{
    flex: 1;
    background-color: #117C94;
    line-height: 12vw;
    text-align: center;
    font-size: 5vw;
    color: #FFF;

    user-select: none;
    cursor: pointer;
}
</style>