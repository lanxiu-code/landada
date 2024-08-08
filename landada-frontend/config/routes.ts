import access from "@/access";
import { AccessEnum } from "../src/enum/AccessEnum";
const routes = [
  {
    path: "/",
    redirect: "/home",
    hideInMenu: true,
  },
  {
    path: "/",
    component: "@/layouts/BasicLayout",
    routes: [
      {
        path: "/home",
        name: "Home",
        component: "home",
        meta: {
          title: "首页",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
    ],
  },
  {
    path: "/app",
    component: "@/layouts/BasicLayout",
    hideInMenu: true,
    routes: [
      {
        path: "/app/detail/:id",
        name: "AppDetail",
        component: "app/detail",
        meta: {
          title: "应用详情",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
    ],
  },
  {
    path: "/answer",
    component: "@/layouts/BasicLayout",
    routes: [
      {
        path: "/answer/do/:id",
        name: "AnswerDo",
        component: "answer/do",
        hideInMenu: true,

        meta: {
          title: "应用答题",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
      {
        path: "/answer/result/:id",
        name: "AnswerResult",
        component: "answer/result",
        hideInMenu: true,
        meta: {
          title: "答题结果",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
      {
        path: "/answer/my",
        name: "AnswerMy",
        component: "answer/my",
        meta: {
          title: "我的答题",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
    ],
  },
  {
    path: "/add",
    component: "@/layouts/BasicLayout",
    routes: [
      {
        path: "/add/app",
        name: "AddApp",
        component: "add/app",
        meta: {
          title: "创建应用",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
      {
        path: "/add/question",
        name: "AddQuestion",
        component: "add/question",
        hideInMenu: true,
        meta: {
          title: "创建题目",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
      {
        path: "/add/scoring_result",
        name: "AddScoringResult",
        component: "add/scoring_result",
        hideInMenu: true,
        meta: {
          title: "创建评分结果",
          access: [AccessEnum.USER, AccessEnum.VIP, AccessEnum.ADMIN],
        },
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: "@/layouts/BasicLayout",
    access: [AccessEnum.ADMIN],
    routes: [
      {
        path: "/admin/user",
        name: "User",
        component: "admin/user",
        meta: {
          title: "用户管理",
          access: [AccessEnum.ADMIN],
        },
      },
      {
        path: "/admin/app",
        name: "App",
        component: "admin/app",
        meta: {
          title: "应用管理",
          access: [AccessEnum.ADMIN],
        },
      },
      {
        path: "/admin/question",
        name: "Question",
        component: "admin/question",
        meta: {
          title: "题目管理",
          access: [AccessEnum.ADMIN],
        },
      },
      {
        path: "/admin/scoring_result",
        name: "ScoringResult",
        component: "admin/scoring_result",
        meta: {
          title: "评分管理",
          access: [AccessEnum.ADMIN],
        },
      },
      {
        path: "/admin/user_answer",
        name: "UserAnswer",
        component: "admin/user_answer",
        meta: {
          title: "回答管理",
          access: [AccessEnum.ADMIN],
        },
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    component: "@/layouts/UserLayout",
    hideInMenu: true,
    routes: [
      {
        path: "/user/login",
        name: "Login",
        component: "user/login",
        wrappers: ["@/wrappers/auth"],
        meta: {
          title: "用户登录",
          access: [AccessEnum.UN_LOGIN],
        },
      },
      {
        path: "/user/register",
        name: "Register",
        component: "user/register",
        wrappers: ["@/wrappers/auth"],
        meta: {
          title: "用户注册",
          access: [AccessEnum.UN_LOGIN],
        },
      },
    ],
  },
  { path: "*", component: "404", hideInMenu: true },
  { path: "/no_permission", component: "403", hideInMenu: true },
];
export default routes;
