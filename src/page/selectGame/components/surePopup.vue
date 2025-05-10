<template>
  <div class="popUp">
    <el-dialog v-model="dialogTableVisible" title="选择游戏清单" overflow class="dialogSty">
      <p>总容量：<span>{{ handTotal }}GB</span></p>
      <el-table :data="gridData">
        <el-table-column property="id" label="游戏ID" width="70"/>
        <el-table-column property="name" label="游戏名字"/>
        <el-table-column property="type" label="游戏类型"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const dialogTableVisible = ref(false)

const gridData = ref([])
const handTotal = ref()

const handleOpen = (info, total) => {
  dialogTableVisible.value = true
  gridData.value = info
  handTotal.value = total
}

defineExpose({
  handleOpen,
})
</script>

<style scoped>
.popUp {
  position: relative;
  width: 100%;

  p {
    margin-bottom: 1vw;

    span {
      color: #4ade80;
    }
  }
}

:deep(.el-dialog) {
  width: 800px
}

@media (max-width: 890px) {
  .popUp {
    p {
      margin-bottom: 3vw;
    }
  }

  :deep(.el-dialog) {
    width: 90% !important;
  }
}
</style>