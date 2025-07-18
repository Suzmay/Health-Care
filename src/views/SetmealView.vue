<template>
    <!-- 总容器 -->
    <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>选择体检套餐</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <ul class="setmeal">
            <li v-for="(setmeal,index) in setmealArr" :key="setmeal.smId">
                <div class="item">
                    <div class="item-left" @click="toSelectdate(setmeal.smId)">
                        <h3>{{ setmeal.type==1?"男士":"女士" }}套餐</h3>
                        <p>{{setmeal.name}}</p>
                        <div class="price">¥{{setmeal.price}}</div>
                    </div>
                    <div class="item-right" @click="isShowEvent(index)">
                        <p>详情</p>
                        <i class="fa fa-angle-down" :class="{rotate: setmeal.isShow}"></i>
                    </div>
                </div>
                <div class="item-content" v-show="setmeal.isShow">
                    <table>
                        <tr>
                            <th>检查项目</th>
                            <th>检查内容</th>
                            <th>检查意义</th>
                        </tr>
                        <tr v-for="checkitem in setmeal.checkitemList" :key="checkitem.ciId">
                            <td>{{ checkitem.ciName }}</td>
                            <td>{{ checkitem.ciContent }}</td>
                            <td>{{ checkitem.meaning }}</td>
                        </tr>
                    </table>
                </div>
            </li>
        </ul>
        
        <div class="bottom-ban"></div>
        <Footer></Footer>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default{
    setup(){
        const router=useRouter();
        const route=useRoute();
        const state=reactive({
            setmealArr:[]
        })

        initSetmealArr();

        function initSetmealArr(){
            axios
                .post("/api/listSetmeal",{sex:JSON.parse(sessionStorage.getItem("JNU_user")).sex})
                .then(response=>{
                    state.setmealArr=response.data.data;
                    console.log(state.setmealArr);
                    for(let i=0;i<state.setmealArr.length;i++){
                        state.setmealArr[i].isShow=false;  //给每个套餐加多一个属性，初值是false，用来控制详情的显示
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        }

        function isShowEvent(index){
            state.setmealArr[index].isShow=!state.setmealArr[index].isShow;
        }
        
        function toSelectdate(smId) {
            router.push({path:"/selectDate",query:{smId:smId,hpId:route.query.hpId}});
            }

        return{
            ...toRefs(state),
            initSetmealArr,
            isShowEvent,
            toSelectdate
        }
    }
};
</script>

<style scoped>
/*********************** 总容器 ***********************/
.wrapper{
    width: 100%;
    min-height: 100vh;
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
    font-size: 4.3vw;
    font-weight: 500;
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
    height: 14.2vw;
}

/*********************** setmeal ***********************/
.setmeal{
    width: 100%;
    margin-top: 10vw;
}
.setmeal li{
    width: 92.8vw;
    margin: 0 auto;
    border: solid 1px #EEE;
    border-radius: 1vw;
    box-shadow: 2px 2px 5px rgba(0,0,0,.08);
    background-color: #FFF;
    margin-bottom: 3.6vw;
}
.setmeal li .item{
    width: 100%;
    height: 20vw;
    color: #555;

    display: flex;
    align-items: center;
}
.setmeal li .item .item-left{
    flex: 0 0 72vw;
    height: 20vw;
    border-right: solid 1px #EEE;
    box-sizing: border-box;
    padding-left: 12vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative; 
    user-select: none;
    cursor: pointer;
}
.setmeal li .item .item-left .price {
    position: absolute;
    right: 2vw;
    top: 50%;
    transform: translateY(-50%);
    font-size: 4.5vw;
    color: #ff6b35;
    font-weight: bold;
    margin: 0;
}
.setmeal li .item .item-left h3{
    font-size: 4.3vw;
    font-weight: 600;
}
.setmeal li .item .item-left p{
    font-size: 4vw;
    margin-top: 1vw;
}
.setmeal li .item .item-right{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
    cursor: pointer;
}
.setmeal li .item .item-right p{
    font-size: 4vw;
    margin-right: 2vw;
}

.setmeal li .item-content{
    /*display: none;*/
    width: 100%;
    background-color: #FFF;
}
.setmeal li .item-content table{
    width: 100%;
    border-collapse: collapse;
    font-size: 4vw;
    color: #555;
}
.setmeal li .item-content table tr{
    display: flex;
}
.setmeal li .item-content table tr td,.setmeal li .item-content table tr th{
    flex: 1;
}
.setmeal li .item-content table tr th{
    text-align: center;
    background-color: #EEE;
    height: 10vw;
    line-height: 10vw;
}
.setmeal li .item-content table tr td{
    border: solid 1px #EFEFEF;
    box-sizing: border-box;
    padding: 2vw;
}
.setmeal li .item .item-right .fa.rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
}
.setmeal li .item .item-right .fa {
    transition: transform 0.3s;
}
</style>