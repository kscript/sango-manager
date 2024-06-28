<template>
  <el-container>
    <el-main>
      <el-row>
        <el-upload class="el-button el-button--text" :before-upload="onBeforeUpload" :show-file-list="false" webkitdirectory multiple>
          <template #trigger>
            <el-button type="success">
              <span class="text--white">
                选择文件
              </span>
            </el-button>
          </template>
        </el-upload>
        <el-button type="danger" @click="onClear">清除</el-button>
      </el-row>
      <template v-if="files.length">
        <el-divider></el-divider>
        <div class="scroll">
          <el-card v-for="file in files" :key="file.url" class="file" shadow="never" border-style="none" :class="{ active: active === file }" @click="showfileInfo(file)">
            <el-text :class="{ active: active === file }" :src="file.url" :title="file.file.name">
              {{ file.file.name }}
            </el-text>
          </el-card>
        </div>
      </template>
    </el-main>
    <el-aside>
      <el-card v-if="active" shadow="never" border-style="none">
        <template #header>
          <div style="padding: 10px;">
            {{ active.file.name }}
          </div>
        </template>
        <pre style="max-height: 500px; overflow: auto;">{{ JSON.stringify(formatInfo(active), null, 2) }}</pre>
      </el-card>
    </el-aside>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import { parseIni } from '@/utils/ini'

const files = ref([])
const active = ref(null)
const onBeforeUpload = async (file) => {
  if (!/\.ini$/i.test(file.name)) return false
  const data = await parseIni(await file.arrayBuffer())
  files.value = files.value.concat({
    ...data,
    file
  })
  return false
}
const showfileInfo = (file) => {
  active.value = active.value === file ? null : file
}
const formatInfo = ({ file, ...rest }) => {
  return { ...rest }
}

const onClear = () => {
  files.value = []
  active.value = null
}
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    active.value = null
  } else
  if (active.value && [38, 40].includes(e.keyCode)) {
    const index = files.value.findIndex(item => active.value === item)
    if (e.keyCode === 38 && index > 0) {
      active.value = files.value[index - 1]
    } else if (e.keyCode === 40 && index < files.value.length - 1) {
      active.value = files.value[index + 1]
    }
  }
})
</script>
<style lang="scss" scoped>
.el-container {
  --el-main-padding: 0;
  .scroll {
    max-height: 600px;
    overflow: auto;
  }
  .file {
    cursor: pointer;
    &.active {
      background: #eee;
    }
  }
}
</style>
