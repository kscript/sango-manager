<template>
  <el-container class="home" direction="vertical">
    <sango-header></sango-header>
    <el-divider style="margin: 3px 0 0;"></el-divider>
    <el-container>
      <el-aside width="auto">
        <section>
          <el-space alignment="start" direction="vertical">
            <h4>文档</h4>
            <router-link v-for="(item, index) in start" :key="index" :to="item.path">
              <el-button :type="route.name === item.name ? 'primary' : ''" text>
                {{ item.text }}
              </el-button>
            </router-link>
          </el-space>
        </section>
        <section>
          <el-space alignment="start" direction="vertical">
            <h4>工具</h4>
            <router-link v-for="(item, index) in tools" :key="index" :to="item.path">
              <el-button :type="route.name === item.name ? 'primary' : ''" text>
                {{ item.text }}
              </el-button>
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
import { useRoute } from 'vue-router'
import { tools } from './tools'
const route = useRoute()
const start = ref([
  {
    name: 'instruction',
    text: '项目说明',
    path: '/instruction'
  }
])
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .el-aside {
    section {
      padding: 10px 20px;
      margin-top: 10px;
    }
  }
  .el-link {
    font-size: 16px;
  }
}
@media screen and (max-width: 375px) {
  .home {
    .el-aside {
      section {
        padding-left: 10px;
        padding-right: 0;
      }
    }
  }
}
</style>
