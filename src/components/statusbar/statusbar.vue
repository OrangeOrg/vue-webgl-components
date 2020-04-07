/*
 * @Author: juzi.liu 
 * @Date: 2020-03-30 11:53:18 
 * @Last Modified by: juzi.liu
 * @Last Modified time: 2020-03-31 16:42:02
 */
<template>
  <div class="statusbar">
    <p class="status-x">{{x}}</p>
    <p class="status-y">{{y}}</p>
    <p class="status-z">{{z}}</p>
    <p class="camerastatus">{{cameraZ}}</p>
  </div>
</template>
<script>
export default {
  name: "statusbar",
  data: () => {
    return {
      x: "",
      y: "",
      z: "",
      cameraZ: ""
    };
  },
  methods: {
    addEvt() {
        let _that = this;
      if (this.$globe.viewer) {
        let scene = this.$globe.viewer.scene;
       
        _that.$globe.viewer.screenSpaceEventHandler.setInputAction(e => {
          _that.mouseEvtCallback(e.endPosition, scene);
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      } else {
        setTimeout(function(){
            _that.addEvt()
        },1000)
      }
    },
    mouseEvtCallback(p, scene) {
      let position = scene.pickPosition(p);
      if (position) {
        //将笛卡尔坐标转化为经纬度坐标
        let cartographic = Cesium.Cartographic.fromCartesian(position);
        let longitude = Cesium.Math.toDegrees(cartographic.longitude);
        let latitude = Cesium.Math.toDegrees(cartographic.latitude);
        //   let height=cartographic.height
        let height = scene.getHeight(longitude, latitude);
        height = height ? height : 0;

        let cameraposition = scene.camera.position;
        let cameracartographic = Cesium.Cartographic.fromCartesian(
          cameraposition
        );
        // let longitude = Cesium.Math.toDegrees(cartographic.longitude);
        // let latitude = Cesium.Math.toDegrees(cartographic.latitude);
        let cameraheight = cameracartographic.height;

        this.$data.x ="经度："+ this.formatDegree(longitude);
        this.$data.y ="纬度："+ this.formatDegree(latitude);

        height=height > 0
            ? height > 1000
              ? (height / 1000).toFixed(2) + "千米"
              : height.toFixed(2) + "米"
            : 0 + "米";
        this.$data.z ="高度："+height
        cameraheight=  cameraheight > 1000
            ? (cameraheight / 1000).toFixed(2) + "千米"
            : cameraheight.toFixed(2) + "米";
        this.$data.cameraZ ="相机高度："+cameraheight
         
      }
    },
    formatDegree(value) {
      ///<summary>将度转换成为度分秒</summary>

    //   value = Math.abs(value);
      var v1 = Math.floor(value); //度
      var v2 = Math.floor((value - v1) * 60); //分
      // var v3 = Math.round(((value - v1) * 3600) % 60); //秒
      var v3 = (((value - v1) * 3600) % 60).toFixed(2);
      return v1 + "°" + v2 + "'" + v3 + '"';
    },

    DegreeConvertBack(value) {
      ///<summary>度分秒转换成为度</summary>
      var du = value.split("°")[0];
      var fen = value.split("°")[1].split("'")[0];
      var miao = value
        .split("°")[1]
        .split("'")[1]
        .split('"')[0];

      return Math.abs(du) + "." + (Math.abs(fen) / 60 + Math.abs(miao) / 3600);
    }
  },
  mounted: function() {
    //等待viewer初始化完成，用延时始终感觉不是很合理
    let _that = this;  
      _that.addEvt();
  }
};
</script>
<style>
.statusbar {
  position: absolute;
  width: 100%;
  height: 22px;
  bottom: 0px;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  color: whitesmoke;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft Yahei;
}
.status-x {
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 3px;
  margin-left: 25px;
}
.status-y {
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 3px;
  margin-left: 185px;
}
.status-z {
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 3px;
  margin-left: 335px;
}
.camerastatus {
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 3px;
  margin-right: 30px;
}
</style>