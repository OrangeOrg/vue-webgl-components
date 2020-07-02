<template>
    <div>
        <div class="header">
            <p class="customtitle">{{this.$props.title}}</p>
        </div>
    </div>
    
</template>
<script>
export default {
    name:"customheader",
    props:{
        title:{
            type:String,
            default:"XXXXXX"
        }
    }
}
</script>
<style>
    .header{
        position: absolute;
        top: 0;
        height: 70px;
        left: 0;
        width: 100%;
        background: url('../../assets/header.png') no-repeat;
        background-size: 100% 100%;
        background-color: rgba(0, 0, 0, 0);
        text-align: center;
        color: whitesmoke;
        font-size: 18px;
        vertical-align: middle;
        z-index: 99999;
        
    }
    .customtitle{
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        font-size: 32px;
        color: whitesmoke;
        margin-top: 15px;
    }
</style>