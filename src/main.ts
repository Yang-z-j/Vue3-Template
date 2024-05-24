import App from './App.vue';
// 自动更新配置
import './utils/autoUpdate';
// 全局css
import './assets/style/global.scss';
// 重置element-ui样式
import './assets/style/resetEl.scss';

const app = createApp(App);

// 配置全局使用store
app.use(store);
// 配置全局使用router
app.use(router);

app.mount('#app');
