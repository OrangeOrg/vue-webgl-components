/*
 * @Author: juzi.liu 
 * @Date: 2020-03-23 08:52:50 
 * @Last Modified by: juzi.liu
 * @Last Modified time: 2020-04-21 11:50:39
 */

<template>
  <div>
    <div id="cesiumContainer" class="customCesium" ref="viewer"></div>
    <div id="loadingbar" class="spinner" v-show="loadingbarshow">
      <div class="spinner-container container1">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container2">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
      <div class="spinner-container container3">
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
        <div class="circle4"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "viewer",
  data() {
    return { loadingbarshow: true };
  },
  //注意参数名大小写问题，umd打包之后，html页面需要通过-连接，如debug-show
  props: {
    debugShow: {
      type: Boolean,
      default: false
    },
    sceneurl: {
      type: String
    },
    navigation: {
      type: Boolean,
      default: false
    },
    isdashboard: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //异步加载资源
    getCesiumScript(CesiumPath, prettycsspath) {
      if (!window.Cesium) {
        //widgets样式
        let $widgetslink = document.createElement("link");
        $widgetslink.rel = "stylesheet";
        window.document.head.appendChild($widgetslink);
        $widgetslink.href = CesiumPath + "/Widgets/widgets.css";

        //pretty样式
        let $prettycsspath = document.createElement("link");
        $prettycsspath.rel = "stylesheet";
        window.document.head.appendChild($prettycsspath);
        $prettycsspath.href = prettycsspath;

        //Cesium.js资源
        let $Cesiumscript = document.createElement("script");
        window.document.body.appendChild($Cesiumscript);
        $Cesiumscript.src = CesiumPath + "/Cesium.js";
        return new Promise((resolve, reject) => {
          $Cesiumscript.onload = () => {
            if (window.Cesium) {
              resolve(window.Cesium);
            } else {
              reject(console.log("load failed"));
            }
          };
        });
      }
    },
    //异步加载资源，等同于promise，资源路径存放在globe.js中
    async beforeInit() {
      await this.getCesiumScript(this.$globe.CesiumPath, this.$globe.prettycsspath);
    },
    init() {
      if (this.$globe.Viewer) {
        return;
      }
      let viewer = new Cesium.Viewer(this.$refs.viewer, {
        navigation: this.$props.navigation,
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true
          }
        }
      });
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
      let scene = viewer.scene;
      scene.sun.show = false;
      //scene.globe.show = false
      scene.skyAtmosphere.show = false;
      scene.skyBox.show = false;
      //扩展globe的viewer属性，方便其他组件调用
      this.$set(this.$globe, "viewer", viewer);
      viewer.scene.debugShowFramesPerSecond = this.$props.debugShow;
      this.$data.loadingbarshow = false;
      if (this.$props.sceneurl) {
        viewer.scene.open(this.$props.sceneurl);
      }
    }
  },
  mounted: function() {
    var _that = this;
    // self
    //   .getCesiumScript(self.$globe.CesiumPath, self.$globe.prettycsspath)
    //   .then(() => {
    //     self.$nextTick(() => {
    //       self.init();
    //     });
    //   });

    _that.beforeInit().then(() => {
      _that.init();
    });
  }
};
</script>
<style>
.cesium-viewer-bottom {
  bottom: 25px !important;
}
.customCesium {
  background: url('../../assets/bg1.png');
}
.cesium-credit-logoContainer{
  display: none !important;
}
</style>
