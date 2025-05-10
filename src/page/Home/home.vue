<template>
  <div class="card">
    <div class="caret-wrapper">
      <div class="title">
        <p>固定游戏目录</p>
        <div class="line"></div>
      </div>
      <div class="btn-group">
        <div class="card-btn" v-for="item in hard_disk_fixed" :key="item.key" @click="goSelectPage(item)">
          <div class="btn-svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
              <path
                  d="M4.5 5.65c.11-.66.33-1.45.87-2.03.43-.46 1.13-.8 2.13-.8h9c1 0 1.7.34 2.13.8.54.58.76 1.37.87 2.03H4.5ZM11 12.5v-2h2v2h2v2h-2v2h-2v-2H9v-2h2Z"></path>
            </svg>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="caret-wrapper top_1em">
      <div class="title">
        <p>自选游戏目录</p>
        <div class="line"></div>
      </div>
      <div class="btn-group">
        <div class="card-btn" v-for="item in hard_disk_choose" :key="item.key" @click="goSelectPage(item)">
          <div class="btn-svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
              <path
                  d="M4.5 5.65c.11-.66.33-1.45.87-2.03.43-.46 1.13-.8 2.13-.8h9c1 0 1.7.34 2.13.8.54.58.76 1.37.87 2.03H4.5ZM11 12.5v-2h2v2h2v2h-2v2h-2v-2H9v-2h2Z"></path>
            </svg>
          </div>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

// 固定游戏目录
const hard_disk_fixed = [
  {
    id: 1,
    name: '500G自选'
  },
  {
    id: 2,
    name: '1T自选'
  },
  {
    id: 3,
    name: '2T自选'
  },
  {
    id: 4,
    name: '4T自选'
  },
  {
    id: 5,
    name: '8T自选'
  },
]

// 自选游戏目录
const hard_disk_choose = [
  {
    id: 5,
    name: '1T + 4T自选'
  },
  {
    id: 6,
    name: '1T + 8T自选'
  },
  {
    id: 7,
    name: '2T + 4T自选'
  },
  {
    id: 8,
    name: '2T + 8T自选'
  },
  {
    id: 9,
    name: '500G + 4T自选'
  },
  {
    id: 10,
    name: '500G + 8T自选'
  },
]

defineProps({
  msg: String,
})

const goSelectPage = (item) => {
  // 跳转路由转选择游戏页面
  router.push({name: 'SelectGame', query: {id: item.id}})
}

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
