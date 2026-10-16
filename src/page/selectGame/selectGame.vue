<template>
  <div class="select_game">
    <div class="page_title">
      <p>选择您喜爱的游戏</p>
    </div>
    <div class="operate">
      <div class="select-group">
        <div class="select-item">
          <el-select
              v-model="data.languagechange"
              placeholder="Select"
              size="large"
              :style="{width:route.query.gameConsoleId === '1'? '36vw ': '100%'}"
              @focus="searchGame(1)"
          >
            <template #prefix>
                <span class="select-icon">
                 <img src="/image/language.png" alt="">
                </span>
            </template>
            <el-option
                v-for="item in languageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
        <div class="select-item" v-if="route.query.gameConsoleId === '1'">
          <el-select
              v-model="data.gameType"
              placeholder="Select"
              size="large"
              style="width: 36vw"
              @focus="searchGame(2)"
          >
            <template #prefix>
                <span class="select-icon">
                <img src="/image/video.png" alt="">
                </span>
            </template>
            <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="search_input">
        <el-input v-model="data.gameName" placeholder="搜索游戏名称..." @focus="searchGame(3)">
          <template #prefix>
                <span class="select-icon">
               <img src="/image/search.png" alt="">
                </span>
          </template>
        </el-input>
      </div>
      <div class="total">
        <div class="total-text">
          <span class="p-icon">
            <img src="/image/mark-o.png" alt="">
          </span>
          <p>已选择: <span>{{ sure_game_list.length }}</span>款游戏</p>
        </div>
        <el-button size="large" :icon="CloseBold" type="danger" @click="deleteGame">清空选择</el-button>
        <el-button size="large" :icon="Select" type="success" @click="sureGame">确认选择</el-button>
      </div>
    </div>
    <div class="panel">
      <p><span>总容量：</span>{{ hard_disk_data.total }}GB</p>
      <p><span>已使用：</span>{{ hard_disk_data.available }}GB</p>
      <p><span>剩余：</span>{{ (Math.ceil(hard_disk_data.remaining * 10) / 10) }}GB</p>
    </div>
    <div class="game_list">
      <div class="title">可选游戏</div>
      <div class="sub-title">找到 <span>{{ listLength }}</span> 款游戏</div>
      <div class="game_item">
        <div class="game_card" @click="addList(index,item.check,item)" v-for="(item,index) in game_list_show"
             :key="item.id">
          <div class="card_img">
            <img v-if="route.query.gameConsoleId === '1'" v-lazy="`./image/id_${item.id}.jpg`" alt="">
            <img v-if="route.query.gameConsoleId === '2'" v-lazy="`./ps5Image/PS5_id_${item.id}.jpg`" alt="">
          </div>
          <div class="card_info">
            <div class="info_title">
              <span class="number">#{{ item.id }}</span>
              <span class="name">{{ item.name }}</span>
            </div>
            <div class="info_type">
              <span class="type" v-if="item.type">{{ item.type }}</span>
              <span class="memory">{{ item.memory }}GB</span>
              <span class="language">{{ item.language }}</span>
            </div>
          </div>
          <div class="card_check">
            <div class="check_icon nan_change" v-show="!item.check">
              <svg t="1746694809439" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3137" width="100%" height="100%">
                <path
                    d="M511.991 1023.99c-282.767239 0-511.987-229.232761-511.987-511.995s229.219762-511.995 511.987-511.995 511.995 229.226761 511.995 511.995-229.227761 511.995-511.995 511.995z m287.029197-535.269773H535.270773V224.964803a23.271773 23.271773 0 0 0-46.542546 0v263.755424H224.966803a23.275773 23.275773 0 0 0 0 46.551546h263.761424v263.752424a23.271773 23.271773 0 0 0 46.542546 0V535.271773h263.749424a23.275773 23.275773 0 0 0 0-46.551546z"
                    fill="#bfbfbf" p-id="3138"></path>
              </svg>
            </div>
            <div class="check_icon change" v-show="item.check">
              <svg t="1746694857919" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="5798" width="100%" height="100%">
                <path
                    d="M512 981.333333C251.733333 981.333333 42.666667 772.266667 42.666667 512S251.733333 42.666667 512 42.666667s469.333333 209.066667 469.333333 469.333333-209.066667 469.333333-469.333333 469.333333zM298.666667 516.266667c-12.8 0-21.333333 4.266667-29.866667 12.8-4.266667 8.533333-12.8 21.333333-12.8 29.866666 0 12.8 4.266667 21.333333 12.8 29.866667l119.466667 119.466667c8.533333 8.533333 17.066667 12.8 29.866666 12.8 12.8 0 21.333333-4.266667 29.866667-12.8l302.933333-302.933334c8.533333-8.533333 12.8-17.066667 12.8-29.866666 0-12.8-4.266667-21.333333-12.8-29.866667-8.533333-8.533333-17.066667-12.8-29.866666-12.8-12.8 0-21.333333 4.266667-29.866667 12.8l-273.066667 273.066667-89.6-89.6c-4.266667-8.533333-17.066667-12.8-29.866666-12.8z"
                    p-id="5799" fill="#2acc18"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-backtop :right="60" :bottom="100"/>
  <surePopup ref="surePopupRef"/>
</template>

<script setup>
import {onMounted, ref, reactive, watch, computed, onUnmounted} from "vue";
import {CloseBold, Select} from "@element-plus/icons-vue";
import Ps4GameList from '@/assets/json/Ps4GameList.json'
import Ps5GameList from '@/assets/json/Ps5GameList.json'
import {ElMessage} from "element-plus";
import {useRoute, useRouter} from 'vue-router';
import surePopup from "./components/surePopup.vue"

const surePopupRef = ref(null)
const route = useRoute()
const router = useRouter()
// 复制一份gameList数据
const game_list_copy = ref()
// 展示的列表数据
const game_list_show = ref()
// list 长度
const listLength = ref()

// 最终选择的游戏列表
const sure_game_list = ref([])

watch(() => sure_game_list.value, (value) => {
  let total = 0
  value.forEach((item) => {
    total = total + item.memory
  })
  hard_disk_data.available = (Math.ceil(total * 10) / 10)
  hard_disk_data.remaining = hard_disk_data.total - hard_disk_data.available
}, {deep: true})


// 计算属性：根据搜索文本过滤数组
const filteredGames = computed(() => {
  return game_list_show.value.filter(game => game.name.includes(data.gameName))
});

// 计算属性：根据选择的游戏类型过滤数组
const filteredGamesTypes = computed(() => {
  return game_list_show.value.filter(game => game.type === data.gameType)
});

//// 计算属性：根据选择的游戏语言过滤数组
const filteredGamesLanguage = computed(() => {
  return game_list_show.value.filter(game => game.language === data.languagechange)
});

const data = reactive({
  languagechange: '全部语言',
  gameType: '全部类型',
  gameName: ''
})

// 监听游戏类型变化
watch(() => data.gameType, (value) => {
  game_list_show.value = game_list_copy.value
  if (value === '全部类型') {
    game_list_show.value = game_list_copy.value
    listLength.value = game_list_show.value.length
    return
  }
  if (value) {
    game_list_show.value = filteredGamesTypes.value
  }
  listLength.value = game_list_show.value.length
})

// 监听语言变化
watch(() => data.languagechange, (value) => {
  game_list_show.value = game_list_copy.value
  if (value === '全部语言') {
    game_list_show.value = game_list_copy.value
    listLength.value = game_list_show.value.length
    return
  }
  if (value) {
    game_list_show.value = filteredGamesLanguage.value
  }
  listLength.value = game_list_show.value.length
})

// 监听搜索文本的变化
watch(() => data.gameName, (value) => {
  game_list_show.value = game_list_copy.value
  if (value) {
    game_list_show.value = filteredGames.value
  }
  listLength.value = game_list_show.value.length
})

const searchGame = (num) => {
  switch (num) {
    case 1:
      data.gameType = '全部类型'
      data.gameName = ''
      break
    case 2:
      data.languagechange = '全部语言'
      data.gameName = ''
      break
    case 3:
      data.languagechange = '全部语言'
      data.gameType = '全部类型'
      break
  }
}

const hard_disk_data = reactive({
  total: 0,
  // 选择游戏的GB和
  available: 0,
  // 剩余的GB
  remaining: 0
})

const languageOptions = [
  {
    value: '全部语言',
    label: '全部语言'
  },
  {
    value: '中文',
    label: '中文'
  },
  {
    value: '英文',
    label: '英文'
  },
  {
    value: '日文',
    label: '日文'
  }
]


const typeOptions = [
  {value: '全部类型', label: '全部类型'},
  {value: '动作/冒险', label: '动作/冒险'},
  {value: '街机/闯关', label: '街机/闯关'},
  {value: '射击', label: '射击'},
  {value: '沙盒', label: '沙盒'},
  {value: '互动电影', label: '互动电影'},
  {value: '开放世界/动作/冒险', label: '开放世界/动作/冒险'},
  {value: '生存恐怖', label: '生存恐怖'},
  {value: '恐怖/射击', label: '恐怖/射击'},
  {value: '角色扮演', label: '角色扮演'},
  {value: '体育/竞技', label: '体育/竞技'},
  {value: '赛车', label: '赛车'},
  {value: '格斗', label: '格斗'},
  {value: '沙盒/生存', label: '沙盒/生存'},
  {value: '生存/冒险', label: '生存/冒险'},
  {value: '赛车/竞速', label: '赛车/竞速'},
  {value: '模拟/经营', label: '模拟/经营'},
  {value: '射击/恐怖', label: '射击/恐怖'},
  {value: '动作/恐怖', label: '动作/恐怖'},
  {value: '恐怖', label: '恐怖'},
  {value: '体育/篮球', label: '体育/篮球'},
  {value: '动作/格斗', label: '动作/格斗'},
  {value: '求生/冒险', label: '求生/冒险'},
  {value: '街机', label: '街机'},
  {value: '第三人称射击', label: '第三人称射击'},
  {value: '益智/休闲', label: '益智/休闲'},
  {value: '射击/二战', label: '射击/二战'},
  {value: '魂类RPG', label: '魂类RPG'},
  {value: '音乐节奏', label: '音乐节奏'},
  {value: '生存恐怖游戏', label: '生存恐怖游戏'},
  {value: '沙盒/角色扮演类', label: '沙盒/角色扮演类'},
  {value: '生存', label: '生存'},
  {value: '动作', label: '动作'},
  {value: '热血格斗', label: '热血格斗'},
  {value: '动作/射击', label: '动作/射击'},
  {value: '回合/策略', label: '回合/策略'},
  {value: '街机/格斗', label: '街机/格斗'},
  {value: '策略/经营', label: '策略/经营'},
  {value: '解密/冒险', label: '解密/冒险'},
  {value: '动作类', label: '动作类'},
  {value: '横板/过关', label: '横板/过关'},
  {value: '第一人称/解谜', label: '第一人称/解谜'},
  {value: '动作冒险', label: '动作冒险'},
  {value: '冒险/解密', label: '冒险/解密'},
  {value: '横板/闯关', label: '横板/闯关'},
  {value: '推理', label: '推理'},
  {value: '肉鸽', label: '肉鸽'},
  {value: '沙盒/冒险', label: '沙盒/冒险'},
  {value: '扑克', label: '扑克'},
  {value: '冒险/解谜', label: '冒险/解谜'},
  {value: '卡通/竞速', label: '卡通/竞速'},
  {value: '挂机类', label: '挂机类'},
  {value: '模拟/驾驶', label: '模拟/驾驶'},
  {value: '模拟/钓鱼', label: '模拟/钓鱼'},
  {value: '悬疑/解谜', label: '悬疑/解谜'},
  {value: '乡村模拟经营类', label: '乡村模拟经营类'},
  {value: '体育竞技', label: '体育竞技'},
  {value: '足球', label: '足球'},
  {value: '动作射击游戏', label: '动作射击游戏'},
  {value: '动作冒险类', label: '动作冒险类'},
  {value: '竞速/赛车', label: '竞速/赛车'},
  {value: '塔防', label: '塔防'},
  {value: '文字冒险', label: '文字冒险'},
  {value: '冒险', label: '冒险'},
  {value: '横板/动作', label: '横板/动作'},
  {value: '动作角色扮演', label: '动作角色扮演'},
  {value: '科幻/冒险', label: '科幻/冒险'},
  {value: '像素/动作', label: '像素/动作'},
  {value: '模拟', label: '模拟'},
  {value: '动作/解谜', label: '动作/解谜'},
  {value: '休闲/解谜', label: '休闲/解谜'},
  {value: '恐怖/第一人称', label: '恐怖/第一人称'},
  {value: '飞行/射击', label: '飞行/射击'},
  {value: '潜入/动作', label: '潜入/动作'},
  {value: '恐怖/生存', label: '恐怖/生存'},
  {value: '解谜', label: '解谜'},
  {value: '竞速/驾驶', label: '竞速/驾驶'},
  {value: '动作/闯关', label: '动作/闯关'},
  {value: '横版/动作', label: '横版/动作'},
  {value: '横版/过关', label: '横版/过关'},
  {value: '冒险/恐怖', label: '冒险/恐怖'},
  {value: '动作冒险/开放世界', label: '动作冒险/开放世界'},
  {value: '动作/潜行', label: '动作/潜行'},
  {value: '第三人称射击/RPG', label: '第三人称射击/RPG'},
  {value: '文字/冒险', label: '文字/冒险'},
  {value: '横版/冒险', label: '横版/冒险'},
  {value: '即时战略', label: '即时战略'},
  {value: '动作/角色扮演', label: '动作/角色扮演'},
  {value: '篮球/体育', label: '篮球/体育'},
  {value: '益智游戏', label: '益智游戏'},
  {value: '格斗对战', label: '格斗对战'},
  {value: '益智/冒险', label: '益智/冒险'},
  {value: '恶魔城类', label: '恶魔城类'},
  {value: '格斗音游', label: '格斗音游'},
  {value: '2D横版动作射击', label: '2D横版动作射击'},
  {value: '模拟/探索', label: '模拟/探索'},
  {value: '恐怖/解谜', label: '恐怖/解谜'},
  {value: '辩论', label: '辩论'},
  {value: '音乐节奏类', label: '音乐节奏类'},
  {value: '飞行/探索', label: '飞行/探索'},
  {value: '解谜/冒险', label: '解谜/冒险'},
  {value: '恋爱/冒险', label: '恋爱/冒险'},
  {value: '捕捉/收集', label: '捕捉/收集'},
  {value: '极限运动', label: '极限运动'},
  {value: '角色扮演/动作', label: '角色扮演/动作'},
  {value: '动作/武打', label: '动作/武打'},
  {value: '战略/模拟', label: '战略/模拟'},
  {value: '少女游戏', label: '少女游戏'},
  {value: '策略', label: '策略'},
  {value: '卡牌类', label: '卡牌类'},
  {value: '飞行/弹幕', label: '飞行/弹幕'},
  {value: '动作/ACT', label: '动作/ACT'},
  {value: '格斗/动作', label: '格斗/动作'},
  {value: '弹幕射击', label: '弹幕射击'},
  {value: '开放世界', label: '开放世界'},
  {value: '沙盒/经营', label: '沙盒/经营'},
  {value: '摩托/竞速', label: '摩托/竞速'},
  {value: '生存/恐怖', label: '生存/恐怖'},
  {value: '养成', label: '养成'},
  {value: '策略RPG', label: '策略RPG'},
  {value: '恐怖冒险', label: '恐怖冒险'},
  {value: '赛车竞速', label: '赛车竞速'},
  {value: '剧情解密', label: '剧情解密'},
  {value: '冒险游戏', label: '冒险游戏'},
  {value: '回合制RPG', label: '回合制RPG'},
  {value: '管道射击', label: '管道射击'},
  {value: '战术回合制', label: '战术回合制'},
  {value: '竞速', label: '竞速'},
  {value: '回合制战略', label: '回合制战略'},
  {value: '生存/模拟', label: '生存/模拟'},
  {value: '像素闯关', label: '像素闯关'},
  {value: '战略', label: '战略'},
  {value: '角色扮演类', label: '角色扮演类'},
  {value: '赛艇竞技', label: '赛艇竞技'},
  {value: '迷宫/角色扮演', label: '迷宫/角色扮演'},
  {value: '平台跳跃', label: '平台跳跃'},
  {value: '像素/经营', label: '像素/经营'},
  {value: '恐怖/冒险', label: '恐怖/冒险'},
  {value: '动作格斗', label: '动作格斗'},
  {value: '跳跃冒险', label: '跳跃冒险'},
  {value: '探索/冒险', label: '探索/冒险'},
  {value: '推理/冒险', label: '推理/冒险'},
  {value: '推理/解谜', label: '推理/解谜'},
  {value: '动作/音乐', label: '动作/音乐'},
  {value: '剧情/电影', label: '剧情/电影'},
  {value: '恐怖/逃生', label: '恐怖/逃生'},
  {value: '飞行射击', label: '飞行射击'},
  {value: '滑板/动作', label: '滑板/动作'},
  {value: '恋爱/养成', label: '恋爱/养成'},
  {value: '战斗/射击', label: '战斗/射击'},
  {value: '机甲/战斗', label: '机甲/战斗'},
  {value: '音乐/动作', label: '音乐/动作'},
  {value: '像素/射击', label: '像素/射击'},
  {value: '开放世界/角色扮演', label: '开放世界/角色扮演'},
  {value: '策略/战棋', label: '策略/战棋'},
  {value: '第一人称射击', label: '第一人称射击'},
  {value: '回合/地下城', label: '回合/地下城'},
  {value: '恐怖/恶魔城类', label: '恐怖/恶魔城类'},
  {value: '射击/VR', label: '射击/VR'},
  {value: '2D横版/角色扮演', label: '2D横版/角色扮演'},
  {value: '回合制/策略', label: '回合制/策略'},
  {value: '高速竞技', label: '高速竞技'},
  {value: '怪物收集', label: '怪物收集'},
  {value: '2D格斗', label: '2D格斗'},
  {value: '电影/互动', label: '电影/互动'},
  {value: '模拟/策略', label: '模拟/策略'},
  {value: '休闲/益智', label: '休闲/益智'},
  {value: '冒险/探索', label: '冒险/探索'},
  {value: '固定场景/动作', label: '固定场景/动作'},
  {value: '航海/策略', label: '航海/策略'},
  {value: '城市/生存', label: '城市/生存'},
  {value: '跳跃/冒险', label: '跳跃/冒险'},
  {value: '科幻/射击', label: '科幻/射击'},
  {value: '开放世界/冒险', label: '开放世界/冒险'},
  {value: '回合/角色扮演', label: '回合/角色扮演'},
  {value: '冒险/休闲', label: '冒险/休闲'},
  {value: '冒险/策略', label: '冒险/策略'},
  {value: '叙事/冒险', label: '叙事/冒险'},
  {value: '即时/海战', label: '即时/海战'},
  {value: '体育', label: '体育'},
  {value: '太空生存/冒险', label: '太空生存/冒险'},
  {value: '钓鱼/冒险', label: '钓鱼/冒险'},
  {value: '第三人称/潜行', label: '第三人称/潜行'},
  {value: '空战', label: '空战'},
  {value: '飞行', label: '飞行'},
  {value: '2D横版/动作', label: '2D横版/动作'},
  {value: '像素/冒险', label: '像素/冒险'},
  {value: '益智', label: '益智'},
  {value: '冒险/闯关', label: '冒险/闯关'},
  {value: '机甲对战', label: '机甲对战'},
  {value: '动作/速度', label: '动作/速度'},
  {value: '空战/冒险', label: '空战/冒险'},
  {value: '塔防/策略', label: '塔防/策略'},
  {value: '音乐', label: '音乐'},
  {value: '动作/竞速', label: '动作/竞速'},
  {value: '深海/动作冒险', label: '深海/动作冒险'},
  {value: '棋牌/麻将', label: '棋牌/麻将'},
  {value: 'VR/动作', label: 'VR/动作'},
  {value: '横版/射击', label: '横版/射击'},
  {value: '即时/战术', label: '即时/战术'},
  {value: '武侠', label: '武侠'},
  {value: '赛车/动作', label: '赛车/动作'},
  {value: '策略/模拟', label: '策略/模拟'},
  {value: '建造/探索', label: '建造/探索'},
  {value: '太空/探索', label: '太空/探索'},
  {value: '平台/动作', label: '平台/动作'},
  {value: '多人动作', label: '多人动作'},
  {value: '开放世界冒险', label: '开放世界冒险'},
  {value: '体育/益智', label: '体育/益智'},
  {value: '模拟经营', label: '模拟经营'},
  {value: '策略/建造', label: '策略/建造'},
  {value: '太空沙盒', label: '太空沙盒'},
  {value: '动作过关', label: '动作过关'},
  {value: '地牢/冒险', label: '地牢/冒险'},
  {value: '策略/塔防', label: '策略/塔防'},
  {value: '推理/恐怖', label: '推理/恐怖'},
  {value: '乡村模拟经营', label: '乡村模拟经营'},
  {value: '角色', label: '角色'},
  {value: '像素射击', label: '像素射击'},
  {value: '跑酷', label: '跑酷'},
  {value: '横版动作', label: '横版动作'},
  {value: '休闲/建造', label: '休闲/建造'},
  {value: '太空射击', label: '太空射击'},
  {value: '弹珠冒险', label: '弹珠冒险'},
  {value: '模拟/多人', label: '模拟/多人'},
  {value: '横版/闯关', label: '横版/闯关'},
  {value: '闯关/冒险', label: '闯关/冒险'},
  {value: '横版过关', label: '横版过关'},
  {value: '卡通', label: '卡通'},
  {value: '街机合集', label: '街机合集'},
  {value: '冒险解谜', label: '冒险解谜'},
  {value: '动作/休闲', label: '动作/休闲'},
  {value: '古风/解谜', label: '古风/解谜'},
  {value: '休闲/管理', label: '休闲/管理'},
  {value: '钓鱼模拟', label: '钓鱼模拟'},
  {value: '开放世界/探索', label: '开放世界/探索'},
  {value: '开放世界/求生', label: '开放世界/求生'},
  {value: '未来/探索', label: '未来/探索'},
  {value: '探索/解密', label: '探索/解密'},
  {value: '2D/动作', label: '2D/动作'},
  {value: '模拟/射击', label: '模拟/射击'},
  {value: '暗黑/探险', label: '暗黑/探险'},
  {value: '末日/生存', label: '末日/生存'},
  {value: '养成/世界', label: '养成/世界'},
  {value: '养成/矿场', label: '养成/矿场'},
  {value: '探险/动作', label: '探险/动作'},
  {value: '体育/足球', label: '体育/足球'},
  {value: '格斗体育', label: '格斗体育'}
]

const addList = (index, checked, item) => {
  console.log('addList', index, checked, item)
  if (!checked) {
    if (item.memory > hard_disk_data.remaining) {
      ElMessage({
        message: '容量不足，请先删除其他游戏',
        type: 'error',
        plain: true,
      })
      return
    }
    // 勾选check
    const game = game_list_copy.value.find(game => game.id === item.id);
    if (game) {
      game.check = !game.check; // 反选
    }
    // 将item添加到sure_game_list中 记录
    sure_game_list.value.push(item)
  } else {
    // 勾选check
    const game = game_list_copy.value.find(game => game.id === item.id);
    if (game) {
      game.check = !game.check; // 反选
    }
    sure_game_list.value.splice(sure_game_list.value.indexOf(item), 1)
  }

}

//点击清空选择
const deleteGame = () => {
  sure_game_list.value = []
  // 将game_list_copy和game_list_show中所有的check都变成false
  game_list_copy.value.forEach(game => {
    game.check = false
  })
  game_list_show.value.forEach(game => {
    game.check = false
  })
}

// 点击确认选择
const sureGame = () => {
  if (sure_game_list.value.length === 0) {
    ElMessage({
      message: '请选择游戏',
      type: 'warning',
      plain: true,
    })
    return
  }
  surePopupRef.value.handleOpen(sure_game_list.value, hard_disk_data.total)
}

// 初始化
const init = () => {
  if (route.query.gameConsoleId === '2') {
    game_list_copy.value = Ps5GameList
    game_list_show.value = Ps5GameList
    listLength.value = game_list_copy.value.length
  } else {
    game_list_copy.value = Ps4GameList
    game_list_show.value = Ps4GameList
    listLength.value = game_list_copy.value.length
  }
}

onMounted(() => {
  if (route.query.memoryId == null) {
    router.push({name: 'memoryPage'})
    return;
  }

  if (route.query.gameConsoleId == null) {
    router.push({name: 'HostSelection'})
    return;
  }

  if (route.query.gameConsoleId === '2') {
    // ps5
    // 825G = 400
    // 1T = 800
    // 2T = 1700
    switch (route.query.memoryId) {
      case '1':
        hard_disk_data.total = 800
        hard_disk_data.remaining = 800
        break;
      case '2':
        hard_disk_data.total = 1700
        hard_disk_data.remaining = 1700
        break;
    }
  } else {
    // 500G = 380
    // 1T = 780
    // 2T = 1.65 = 1689.6
    // 4T = 3.5 = 3584
    // 8T = 7.5 = 7680
    switch (route.query.memoryId) {
      case '1':
        hard_disk_data.total = 380
        hard_disk_data.remaining = 380
        break;
      case '2':
        hard_disk_data.total = 780
        hard_disk_data.remaining = 780
        break;
      case '3':
        hard_disk_data.total = 1689.6
        hard_disk_data.remaining = 1689.6
        break;
      case '4':
        hard_disk_data.total = 3584
        hard_disk_data.remaining = 3584
        break;
      case '5':
        hard_disk_data.total = 7200
        hard_disk_data.remaining = 7200
        break;
      case '6':
        hard_disk_data.total = 4000
        hard_disk_data.remaining = 4000
        break;
      case '7':
        hard_disk_data.total = 8400
        hard_disk_data.remaining = 8400
        break;
      case '8':
        hard_disk_data.total = 5200
        hard_disk_data.remaining = 5200
        break;
      case '9':
        hard_disk_data.total = 9300
        hard_disk_data.remaining = 9300
        break;
      case '10':
        hard_disk_data.total = 3900
        hard_disk_data.remaining = 3900
        break;
      case '11':
        hard_disk_data.total = 7580
        hard_disk_data.remaining = 7580
        break;
      case '12':
        hard_disk_data.total = 400
        hard_disk_data.remaining = 400
        break;
      case '13':
        hard_disk_data.total = 600
        hard_disk_data.remaining = 600
        break;
    }
  }
  init()
})

onUnmounted(() => {
  deleteGame()
  data.languagechange = '全部语言'
  data.gameType = '全部类型'
  data.gameName = ''
})
</script>

<style scoped>
.select_game {
  background-color: #141b2a;
  padding: 3em;

  :deep(.el-select__icon) {
    display: none;
  }

  :deep(.el-select--large .el-select__wrapper) {
    font-size: 16px;
    gap: 6px;
    line-height: 28px;
    min-height: 50px;
    padding: 14px 18px;
    border-color: rgba(55, 65, 81, 0.7);
    background: rgba(55, 65, 81, 0.7);
  }

  :deep(.el-input__wrapper) {
    font-size: 16px;
    gap: 6px;
    line-height: 20px;
    min-height: 20px;
    padding: 10px 18px;
    border-color: rgba(55, 65, 81, 0.7);
    background: rgba(55, 65, 81, 0.7);
    margin-top: 1vw;
  }

  .page_title {
    width: fit-content;
    margin: 0 auto 3vw;

    p {
      font-weight: 700;
      font-size: 2.25rem;
      line-height: 2.5rem;
      color: transparent;
      background-clip: text;
      background-image: linear-gradient(to right, #4ade80, #3b82f6);
    }
  }

  .operate {
    background: rgb(16 24 40);
    padding: 1.5vw;
    box-shadow: 0 8px 32px #0000005e;
    backdrop-filter: blur(4px);
    border-radius: 12px;
    border: 1px solid rgba(129, 134, 145, 0.2);

    .select-group {
      display: flex;
      justify-content: space-between;

      .select-item:nth-child(1) {
        flex: 1;
      }
    }

    .select-icon {
      width: 1.5vw;
      display: flex;

      img {
        width: 100%;
      }
    }

    .total {
      display: flex;
      margin-top: 2vw;

      .total-text {
        display: flex;
        align-items: center;
        flex: 1;

        .p-icon {
          display: flex;
          width: 2vw;
          color: #409eff;

          img {
            width: 100%;
          }
        }

        p {
          color: #409eff;

          span {
            font-weight: bold;
            color: #FFFFFF
          }
        }
      }
    }
  }

  .panel {
    background: rgb(16 24 40);
    padding: 1.5vw;
    box-shadow: 0 8px 32px #0000005e;
    backdrop-filter: blur(4px);
    border-radius: 12px;
    border: 1px solid rgba(129, 134, 145, 0.2);
    margin-top: 2vw;
    display: flex;
    justify-content: space-between;

    p {
      color: #FFFFFF;
      font-weight: bold;
      width: 20%;

      span {
        color: rgb(156 163 175);
        font-weight: initial;
      }
    }
  }

  .game_list {
    margin-top: 3vw;

    .title {
      font-size: 22px;
      font-weight: bold;
      color: rgb(96 165 250);
    }

    .sub-title {
      margin-top: 1vw;
      color: rgb(156 163 175);

      span {
        color: rgb(34 197 94);
      }
    }

    .game_item {
      margin-top: 2vw;

      .game_card {
        display: flex;
        margin-bottom: 1vw;
        box-shadow: 0 2px 10px #0003;
        transition: all .25s ease;
        transform: translateZ(0);
        backface-visibility: hidden;
        border-radius: 20px;
        background: #0f172a80;
        border: 1px solid rgba(129, 134, 145, 0.2);

        .card_img {
          width: 80px;

          img {
            width: 100%;
          }
        }

        .card_info {
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          justify-content: center;
          flex: 1;

          .info_title {
            .number {
              font-weight: bold;
              font-size: 16px;
              color: #4ade80;
            }

            .name {
              margin-left: 8px;
              font-size: 16px;
              color: #FFFFFF;
              font-weight: bold;
            }
          }

          .info_type {
            font-size: 12px;
            margin-top: 12px;

            .type {
              color: #9CA3AF;
              margin-right: 6px;
            }

            .memory {
              color: #4ade80;
              margin-right: 6px;
            }

            .language {
              color: #60A5FA;
            }
          }
        }

        .card_check {
          display: flex;
          margin-right: 1.5vw;
          cursor: pointer;

          .check_icon {
            width: 30px;

            .check_icon {
              width: 100%;

              svg {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 890px) {
  .select_game {
    .select-group {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }

    .el-select {
      width: 100% !important;
      margin-bottom: 2vw;
    }

    :deep(.el-input__wrapper) {
      margin-top: 0 !important;
    }

    .total {
      display: flex;
      margin-top: 2vw;
      flex-direction: column;
    }

    .el-button--success,
    .el-button--danger {
      margin-top: 2vw !important;
    }

    .el-button + .el-button {
      margin-left: 0 !important;
    }

    .panel {
      flex-direction: column;

      p {
        width: 100%;
        display: flex;
        margin-top: 4vw;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    .game_list {
      margin-top: 6vw;
    }

    .game_card {
      margin-bottom: 3vw !important;
    }
  }

  .el-backtop {
    right: 4vw !important;
    bottom: 23vw !important;
  }

  .operate {
    .select-icon {
      width: 5vw !important;
    }
  }

  .p-icon {
    width: 5vw !important;
  }
}
</style>