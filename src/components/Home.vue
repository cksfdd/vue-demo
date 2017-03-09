<template>
    <div id="home">
        <div class="content mt30">
            <!--<BannerView></BannerView>-->
            <ul class="newsList">
                <li v-for="(val,index) in arrList">
                    <a href="javascript:;">
                        <h2>{{index}}.{{val.title}}</h2>
                        <p>{{val.detail}}</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

    export default{
        data(){
            return {
                arrList :[]
            }
        },
        component:{

        },
        mounted(){
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
<style scoped>
    .mt30{
        margin-top:30px;
    }
</style>