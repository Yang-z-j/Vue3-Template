<template>
  <div class="helloworld-container">
    <h1>{{ msg }}</h1>
    <h1>{{ store.text }}</h1>
    <div class="random-color">随机颜色 {{ randomColor }}</div>
    <div class="card">
      <button
        type="button"
        @click="count++"
        >count is {{ count }}</button
      >
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a
        href="https://vuejs.org/guide/quick-start.html#local"
        target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Install
      <a
        href="https://github.com/vuejs/language-tools"
        target="_blank"
        >Volar</a
      >
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    <dl>
      <dt>11</dt>
      <dd>22</dd>
    </dl>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="Pick a day" />
    <el-input v-model="input"></el-input>
    <button @click="store.setText(input ? input : 'Hello Vite + Vue!')">Click me</button>
    <el-button
      type="primary"
      @click="edit"
      >修改数据</el-button
    >
    <el-table
      :data="tableData"
      border
      v-if="defer(100)">
      <el-table-column
        v-for="(key, index) in tableDataAttr"
        :key="index"
        :prop="key"
        :label="key"
        align="center"
        :min-width="getColumnMinWidth(key as string)">
        <template #default="{ row }">
          {{ row[key] }}
        </template>
      </el-table-column>
    </el-table>
    <el-button
      @click="dialogVisible = true"
      v-if="defer(50)">
      click to open the Dialog
    </el-button>
    <debounceRef></debounceRef>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="50%">
      <span>{{ store.text }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
/**
 * 获取实例
 */

const store = useUserInfoStore();
const route = useRoute();
const router = useRouter();
const defer = useDefer();

/**
 * 定义类型
 */

interface tableDataFace {
  date: string;
  name: string;
  address: string;
  [propName: string]: unknown;
}

/**
 * 定义变量
 */

const date = ref<string>('');
const count = ref<number>(0);
const dialogVisible = ref<boolean>(false);
const input = ref<string>('');
const tableDataInit: tableDataFace[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];
const tableData = reactive<tableDataFace[]>(tableDataInit);
const tableDataAttr = reactive<string[]>([...Object.keys(tableData[0])]);

/**
 * Vue实例
 */

// 挂载
onMounted(() => {
  getData();
  postData();
  console.log(route, router);
  console.log(getElementSize('.random-color'));
});

// 监听数据变化
watch(
  tableData,
  newValue => {
    if (JSON.stringify(tableDataAttr) === JSON.stringify(Object.keys(newValue[0]))) return;
    tableDataAttr.length = 0;
    tableDataAttr.push(...Object.keys(newValue[0]));
    console.log(tableDataAttr);
  },
  {
    deep: true // 深度监听
  }
);

// 父组件数据
defineProps<{ msg: string }>();

/**
 * 定义方法
 */

//  获取自定义列最小宽度
const getColumnMinWidth = (key: string): string => {
  // 根据属性名设置不同的宽度
  if (key === 'address') {
    return '150';
  }
  return '50';
};

// 获取数据
const getData = async () => {
  try {
    const params = {
      name: 'joke',
      age: 18,
      sex: 'man'
    };
    const { data: res } = await getApiInfo(params);
    if (res.code === 200) {
      ElMessage.success({ message: '请求成功' });
    } else {
      ElMessage.error({ message: '请求失败' });
    }
  } catch (_error) {
    ElMessage.error({ message: '服务错误' });
  }
};

// 提交数据
const postData = async () => {
  try {
    const params = {
      name: 'joke',
      age: 18,
      sex: 'man'
    };
    const { data: res } = await postApiInfo(params);
    if (res.code === 200) {
      ElMessage.success({ message: '请求成功' });
    } else {
      ElMessage.error({ message: '请求失败' });
    }
  } catch (_error) {
    ElMessage.error({ message: '服务错误' });
  }
};

// 修改数据
const edit = () => {
  tableData.forEach((row, index) => {
    if (row.name === 'Tom') {
      row.name = 'Joke';
    }
    if (index % 2 === 0) {
      row.sex = 'man';
    } else {
      row.sex = 'woman';
    }
    row.flag = !row.flag;
  });
  console.log(tableData);
};

console.log(getRandomInt(100, 150));
const obj = {
  foo: 'bar',
  num: 42,
  arr: [1, 2, 3],
  obj: {
    dd: true,
    tableData,
    symbol: Symbol('symbol属性')
  },
  [Symbol('symbol属性')]: 'hello',
  fn: function aa() {
    console.log(11);
  }
};
const newObj = deepClone(obj);
newObj.obj.tableData[0].address = newObj.obj.tableData[0].address + '1';
console.log(obj, newObj, newObj.obj.symbol);
const randomColor = getRandomColor(Math.random());
console.log(randomColor);
</script>

<style scoped lang="scss">
.helloworld-container {
  text-align: center;
  padding: 20px;
  .dialog-footer {
    button:first-child {
      margin-right: 10px;
    }
  }
  .random-color {
    background-color: v-bind(randomColor); // style 直接使用 变量
  }
}
</style>
