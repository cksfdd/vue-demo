<template>
    <div class="content mt30">
        <Slider></Slider>
        <div class="newsList">
            <ul>
                <li v-for="(item,index) in arrList">
                    <router-link :to="'/article/'+item.id">
                        <h2>{{index+1}} . {{item.title}}</h2>
                        <p>{{item.detail}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Slider from './Slider.vue';

    export default{
        data(){
            return {
                arrList :[]
            }
        },
        components:{
            Slider
        },
        mounted(){
            this.$store.dispatch('SHOW_HEAD_SUCC');
            this.fetchData();
        },
        methods:{
            fetchData(){
                let _this=this;
                this.$http.get('src/data/index.data').then((res)=>{
                    console.log(res);
                    _this.arrList=res.data;
                }).catch((rej)=>{
                    console.log(rej)
                });
            }
        }
    }
</script>
<style>
    @import '../assets/css/index.css';
    .mt30{
        margin-top:30px;
    }
</style>
