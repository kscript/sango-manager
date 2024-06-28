<template>
  <el-container class="home" direction="vertical">
    <sango-header></sango-header>
    <el-divider style="margin: 3px 0 0;"></el-divider>
    <el-container>
      <el-aside width="auto" class="d-flex">
        <section style="padding: 10px;">
          <el-space alignment="start" direction="vertical">
            <p></p>
            <h3>工具</h3>
            <router-link v-for="(item, index) in tools" :key="index" :to="item.path">
              <el-link>{{ item.text }}</el-link>
            </router-link>
          </el-space>
        </section>
      </el-aside>
      <el-divider style="height: 100%;"  direction="vertical"></el-divider>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
const tools = ref([
  {
    name: 'shp',
    text: 'shp文件解析',
    path: '/shp'
  },
  {
    name: 'ini',
    text: 'ini文件解析',
    path: '/ini'
  }
])
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
