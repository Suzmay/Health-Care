<template>
   <!-- 总容器 -->
    <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>选择体检日期</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <section>
            <div class="date-box">
                <i class="fa fa-caret-left" @click="subtractMonth"></i>
                <p>{{ currYear + "年" + currMonth + "月" }}</p>
                <i class="fa fa-caret-right" @click="addMonth"></i>
            </div>
            <table>
                <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                </tr>
            </table>
            <ul>
                <li v-for="(calendar, index) in calendarArr" :key="calendar.ymd">
                    <p
                        :class="{
                        fontcolor: calendar.remainder != null && calendar.remainder != 0,
                        pselect: calendar.selected == 1,
                        }"
                        @click="selectDay(index)"
                    >
                        {{ calendar.day }}
                    </p>
                    <p>
                        {{
                        calendar.remainder != null && calendar.remainder != 0
                            ? "余" + calendar.remainder
                            : ""
                        }}
                    </p>
        </li>
            </ul>
        </section>

        <div class="bottom-btn">
            <div></div>
            <div @click="toConfirmOrder">下一步</div>
        </div>
        
        <div class="bottom-ban"></div>
        <Footer></Footer>

    </div>    
</template>

<script>
import { reactive, toRefs } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup(){
        const router=useRouter();
        const route=useRoute();
        
        // 获取当前日期
        const currDate=new Date(); // JS函数

        const state=reactive({
            hpId:route.query.hpId,
            smId:route.query.smId,
            currYear:currDate.getFullYear(),
            currMonth:currDate.getMonth()+1, // 从0开始
            calendarArr: [],
            selectedDay: ""
        })

        // 初始化日历界面的函数
        function loadCalendar(){
            axios
                .post("/api/listCalendar",{hpId:state.hpId,year:state.currYear,month:state.currMonth})
                .then(response=>{
                    state.calendarArr=response.data.data;

                    for (let i = 0; i < state.calendarArr.length; i++) {
                        if (state.calendarArr[i].ymd != null) {
                        state.calendarArr[i].day = parseInt(
                            state.calendarArr[i].ymd.substring(8)
                        );
                        }
                    }
                    // 为了方便控制样式，给每个日历加多一个属性selected 选中为1 未选中为0
                    for (let y = 0; y < state.calendarArr.length; y++) {
                        if (state.calendarArr[y].ymd != null) {
                        state.calendarArr[y].selected = 0;
                        }
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        }

        loadCalendar();
        
        //减月份
        function subtractMonth() {
        if (state.currMonth > 1) {
            state.currMonth--;
        } else {
            state.currYear--;
            state.currMonth = 12;
        }
        loadCalendar();
        }

        //加月份
        function addMonth() {
        if (state.currMonth < 12) {
            state.currMonth++;
        } else {
            state.currYear++;
            state.currMonth = 1;
        }
        loadCalendar();
        }

        function selectDay(index){
            
            // 给选中日期加样式
            if (
                state.calendarArr[index].remainder == null ||
                state.calendarArr[index].remainder == 0
            ) {
                return;
            }
            // 存选中日期
            state.selectedDay=state.calendarArr[index].ymd;

            // 把以前的selected属性全部重置
            for (let y = 0; y < state.calendarArr.length; y++) {
                if (state.calendarArr[y].ymd != null) {
                state.calendarArr[y].selected = 0;
                }
            }

            state.calendarArr[index].selected = 1;
        }

        //点击下一步时跳转到确认订单界面
        function toConfirmOrder() {
        if (state.selectedDay == "") {
            alert("请先选中体检日期，谢谢");
            return;
        }
        router.push({path:"/confirmOrder",query:{hpId:state.hpId,smId:state.smId,selectedDay:state.selectedDay}})
        }

        return {
            ...toRefs(state),
            loadCalendar,
            subtractMonth,
            addMonth,
            selectDay,
            toConfirmOrder
        }
    }
}
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

/*********************** section ***********************/
section{
    width: 82vw;
    margin: 0 auto;
    margin-top: 12vw;
}
section .date-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 4.5vw;
    font-weight: 600;
}
section .date-box p{
    color: #000;
}
section .date-box i{
    color: #999;
    user-select: none;
    cursor: pointer;
}
section table{
    width: 100%;
    font-size: 3.8vw;
}
section table tr th{
    text-align: center;
    font-weight: 600;
    line-height: 12vw;
    color: #222;
}

section ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
section ul li{
    width: 14.28%;
    height: 12vw;
    font-weight: 600;
    color: #999;
}
section ul li p:first-child{
    width: 6vw;
    height: 6vw;
    margin: 0 auto;
    border-radius: 3vw;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 4.2vw;

    user-select: none;
    cursor: pointer;
}
section ul li p:last-child{
    font-size: 3vw;
    font-weight: 300;
    text-align: center;
    user-select: none;
}

.fontcolor {
    color: #333;
}

.pselect{
    background-color: #FB902B;
    color: #FFF;
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
.bottom-btn div:first-child{
    flex: 2;
}
.bottom-btn div:last-child{
    flex: 1;
    background-color: #117C94;
    text-align: center;
    line-height: 12vw;
    font-size: 5vw;
    color: #FFF;

    user-select: none;
    cursor: pointer;
}
</style>