const routes = [
  {
    path: "/403",
    hidden: false,
    meta: {
      title: "403",
      elIcon: "help",
    },
  },
  {
    path: "/404",
    meta: {
      title: "404",
      elIcon: "camera",
    },
    hidden: false,
  },
  {
    path: "/",
    hidden: false,
    children: [
      {
        path: "dashboard",
        meta: {
          title: "首页",
          elIcon: "eleme",
          affix: true
        },
      },
    ],
  },
];

export default routes;
