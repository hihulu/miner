import Vue from 'vue'
import Router from 'vue-router'
// 登录注册改忘密码
import Login from '@/pages/login/Login'
import Regist from '@/pages/login/regist'
import FindPassword from '@/pages/login/FindPassword'

// 主屏
import Main from '@/pages/Mains/Main'
import Home from '@/pages/Mains/home/home'
import Car from '@/pages/Mains/car/car'
import Me from '@/pages/Mains/me/me'


//分类职位
import Job11 from '@/pages/Mains/home/Job11'
import Job12 from '@/pages/Mains/home/Job12'
import Job13 from '@/pages/Mains/home/Job13'
import Job21 from '@/pages/Mains/home/Job21'
import Job22 from '@/pages/Mains/home/Job22'
//详细页面
import Detail from '@/pages/Mains/detail/detail'
import Comments from '@/pages/comments/comments'

// 我的
import Order from '@/pages/Mains/me/order'
import Like from '@/pages/Mains/me/like'
import Mobile from '@/pages/Mains/me/mobile'
import MobileYes from '@/pages/Mains/me/mobileyes'
import ChangePsd from '@/pages/Mains/me/ChangePsd'

//商品管理
import List from '@/pages/item/list'
import Create from '@/pages/item/create'

//评价
import MyComment from '@/pages/comments/mycomment'
import CommentList from '@/pages/comments/commentlist'



Vue.use(Router)



const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path:'/login',
        name:'Login',
        component: Login
    },
    {
        path:'/regist',
        name:'Regist',
        component: Regist
    },
    {
        path:'/findpassword',
        name:'FindPassword',
        component:FindPassword
    },
    {
      path:'/order',
      name:'Order',
      component: Order
    },
    {
      path:'/comments',
      name:'Comments',
      component: Comments
    },
    {
      path:'/like',
      name:'Like',
      component: Like
    },
    {
      path:'/mobile',
      name:'Mobile',
      component: Mobile
    },
    {
      path:'/mobileyes',
      name:'MobileYes',
      component: MobileYes
    },
    {
        path:'/changepsd',
        name:'ChangePsd',
        component:ChangePsd
    },
    {
        path: '/',
        component: Main,
        children: [
          {
            path: '/',
            name: 'Home',
            component: Home
          },
          {
            path: '/car',
            name: 'Car',
            component: Car
          },
          {
            path: '/Me',
            name: 'Me',
            component: Me
          }
        ]
      },
      {
        path:'/job11',
        name:'Job11',
        component: Job11
      },
      {
        path:'/job12',
        name:'Job12',
        component: Job12
      },
      {
        path:'/job13',
        name:'Job13',
        component: Job13
      },
      {
        path:'/job21',
        name:'Job21',
        component: Job21
      },
      {
        path:'/job22',
        name:'Job22',
        component: Job22
      },
      {
        path:'/detail',
        name:'Detail',
        component:Detail
      },
      {
          path:'/list',
          name:'List',
          component:List
      },
      {
          path:'/create',
          name:'Create',
          component:Create
      },
      {
          path:'/mycomment',
          name:'MyComment',
          component:MyComment
      },
      {
          path:'/commentlist',
          name:'CommentList',
          component:CommentList
      }


    ]
});

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
 
//     if (token === null || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });


export default router;

