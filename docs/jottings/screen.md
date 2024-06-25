---
title: 大屏适配方案
date: 2024-06-25
---

### 1. 媒体查询

```css
// 针对不同的尺寸写不同的样式代码
// 小于768px
@media screen and (max-width: 768px) {
  .screen {
    width: 100%;
    height: 100%;
  }
}
// 大于768px小于1024px
@media screen and (max-width: 1024px and min-width: 768px) {
  .screen {
    width: 100%;
    height: 100%;
  }
}
// 大于1024px小于1920px
@media screen and (max-width: 1920px and min-width: 1024px) {
  .screen {
    width: 100%;
    height: 100%;
  }
}
```

### 2. rem

```css
html {
  font-size: 10px;
}

@media screen and (max-width: 1920px) {
  html {
    font-size: 8px;
  }
}

.screen-1920 {
  width: 1920px;
  height: 1080px;
  font-size: 1.2rem;
  // ...
}
```

### 3. 百分比

```css
$baseWidth: 1920 !default;
$baseHeight: 1080 !default;

@function cw($px) {
  @return ($px / $baseWidth) * 100vw;
  // @return $px * 1px;
}

@function ch($px) {
  @return ($px / $baseHeight) * 100vh;
  // @return $px * 1px;
}

// 在项目中使用
.screen {
  width: cw(1920);
  height: ch(1080);
}
```

```javascript
// 在webpack中修改
module.exports = {
  // ...
  rules: [
    // ...
    {
      test: /\.(scss|sass)$/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        {
          loader: "sass-loader",
          options: {
            // Prefer `dart-sass`
            implementation: require("sass"),
            sassOptions: {
              fiber: false,
            },
          },
        },
        // 在这使用sass-resources-loader插件引入全局的scss文件，这样在全局任何地方都能使用
        {
          loader: "sass-resources-loader",
          options: {
            // 引入多个全局sass文件
            resources: [
              path.join(__dirname, "../../desktop/view/styles/variables.scss"),
              path.join(__dirname, "../../desktop/view/styles/mymixins.scss"),
            ],
          },
        },
      ],
    },
  ],
  // ...
};
```

```javascript
const baseWidth = 1920;
const baseHeight = 1080;
// 宽度
export function getcw(px) {
  const clientWidth =
    document.body.clientWidth || document.docuemntElement.clientWidth;
  const scale = clientWidth / baseWidth;
  return px * scale;
}
// 高度
export function getch(px) {
  const clientHeight =
    document.body.clientHeight || document.docuemntElement.clientHeight;
  const scale = clientHeight / baseHeight;
  return px * scale;
}

export function getRoundSize(px, length = 3) {
  const clientWidth =
    document.body.clientWidth || document.docuemntElement.clientWidth;
  const scale = clientWidth / baseWidth;
  return tofix(px * scale, length);
}

export function tofix(num, length = 2) {
  // eslint-disable-next-line no-restricted-properties
  return Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
}

// 在vue项目中使用
1.挂载到Vue原型上
Vue.prototype.$getcw = getcw;
Vue.prototype.$getch = getch;
Vue.prototype.$getRoundSize = getRoundSize;
2.在需要的地方直接使用
this.$getcw(1920);
this.$getch(1080);
this.$getRoundSize(1920, 3);
```

### 附常用 mixin

```scss
// 背景图
@mixin bg-image($url) {
  background-image: url($url + "@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url($url + "@3x.png");
  }
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// 文件省略号，支持单行或者多行
@mixin ellipsisMulti($number: 1) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-line-clamp: $number;
}
```

### 雪碧图的使用

```scss
@mixin sprite-background($left, $top) {
  // 雪碧图
  background: url("~@/assets/images/safe-eco-icon-group.png") no-repeat;
  // 雪碧图定位
  background-position: $left $top;
  // 雪碧图的实际尺寸
  background-size: cw(3757) ch(2703);
  display: inline-block;
  vertical-align: middle;
}
```
