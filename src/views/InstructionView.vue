<template>
  <div class="manager-view">
    这是一个
    <el-text type="success" size="large">
      三国群英传
    </el-text>
    游戏资源的管理系统, 目前支持的功能有:
    <el-space spacer="、">
      <router-link v-for="(item, index) in tools" :key="index" :to="item.path">
        <el-link type="primary">
          {{item.text}}
        </el-link>
      </router-link>
    </el-space>
    <el-divider></el-divider>
    <ul>
      <li v-for="(item, index) in tools" :key="index">
        <h4>{{ item.text }}</h4>
        <p class="content">
          {{ item.content }}
        </p>
        <pre class="code">{{ item.code.slice(0, -4).replace(/\n\s{1,}/g, '\n').slice(1) }}</pre>
        <p class="desc">{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { tools } from './tools'
</script>
<style lang="scss" scoped>
.manager-view {
  ul {
    list-style: decimal;
    padding: 0 20px;
    li {
      padding: 10px 0;
    }
    .content {
      padding: 10px 0;
    }
    .code {
      padding: 20px;
      background: #eee;
      border-radius: 5px;
      overflow: auto;
    }
    .desc {
      margin: 10px 0;
      padding: 10px 10px;
      border-left: 5px solid var(--el-color-primary);
      color: #666;
      background: #eee;
    }
  }
}
</style>
