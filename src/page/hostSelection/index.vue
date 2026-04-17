<template>
  <div class="card">
    <div class="caret-wrapper">
      <div class="title">
        <p>选择主机型号</p>
        <div class="line"></div>
      </div>
      <div class="btn-group">
        <div class="card-btn" v-for="item in hard_disk_fixed" :key="item.key" @click="goMemoryPage(item)">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="60%"
      :show-close=false
      :close-on-click-modal=false
      :close-on-press-escape=false
  >
    <span>* PS5游戏只能存储到外置硬盘内</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          已知悉
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from 'vue-router'


const router = useRouter()
const dialogVisible = ref(true)

// 固定游戏目录
const hard_disk_fixed = [
  {
    id: 1,
    name: 'PS4'
  },
  {
    id: 2,
    name: 'PS5'
  }
]

defineProps({
  msg: String,
})

const goMemoryPage = (item) => {
  // 跳转路由转选择游戏页面
  router.push({name: 'MemoryPage', query: {gameConsoleId: item.id}})
}

onMounted(()=>{
  dialogVisible.value = true
})

</script>

<style scoped>
.card {
  background-color: #141b2a;

  .caret-wrapper {
    display: flex;
    flex-direction: column;

    .title {
      display: flex;
      font-size: 20px;
      align-items: center;
      margin-bottom: 3vw;

      .line {
        margin-left: 2vw;
        flex: 1;
        height: 2px;
        background-image: linear-gradient(to left, rgb(75 85 99 / 0), #4b5563);
      }
    }


    .btn-group {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;

      .card-btn {
        width: 20%;
        min-width: 200px;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 32px #0000005e;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, .05);
        background: linear-gradient(135deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .01));
        font-size: 16px;
        border-radius: 1vw;
        margin-right: 1.5vw;
        margin-bottom: 2em;
        cursor: pointer;

        &:hover {
          background: rgba(27, 25, 25, 0.45);
        }
      }

      .btn-svg {
        width: 35px;
        margin-right: 2vw;
      }

    }

  }

  .top_1em {
    margin-top: 1em;
  }

  .top_3em {
    margin-top: 3em;
  }
}

@media (max-width: 600px) and (max-aspect-ratio: 1/1) {
  .btn-group {
    justify-content: center !important;
  }
}
</style>
