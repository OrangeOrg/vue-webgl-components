<template>
    <div>
        <div class="board-top"></div>
        <div class="board-left"></div>
        <div class="board-bottom"></div>
        <div class="board-right"></div>
    </div>
</template>
<script>
export default {
    name:'customboard'
}
</script>
<style>
    .board-top{
        position: absolute;
        top: 0;
        height: 60px;
        left: 0;
        width: 100%;
        background: url('../../assets/boardtop.png');
        background-color: rgba(0, 0, 0, 0);
        z-index: 99999;
    }
    .board-left{
        position: absolute;
        top: 60px;
        height: 1020px;
        left: 0;
        width: 55px;
        background: url('../../assets/boardleft.png');
        background-color: rgba(0, 0, 0, 0);
        z-index: 99999;
    }
    .board-bottom{
        position: absolute;
        bottom: 0;
        height: 33px;
        left: 0;
        width: 100%;
        background: url('../../assets/boardbottom.png');
        background-color: rgba(0, 0, 0, 0);
        z-index: 99999;
    }
    .board-right{
        position: absolute;
        top: 60px;
        height: 1020px;
        right: 0;
        width: 55px;
        background: url('../../assets/boardright.png');
        background-color: rgba(0, 0, 0, 0);
        z-index: 99999;
    }
</style>
