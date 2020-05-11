export const PublicRouters = [
    { path: "/login", models: [], component: "layout/LoginLayout" },
    { path: "/404", models: [], component: "exception/404" },
];
export const PrivateRouters = [
    { path: "/system", models: [], component: "layout/SystemLayout" },
];
export const SystemRouters = [
    { path: "/system/order/shopOrder/myOrder", models: [], component: "order/shopOrder/MyOrder" },
    { path: "/system/order/shopOrder/goodsOrder", models: [], component: "order/shopOrder/GoodsOrder" },
    { path: "/system/order/otherOrder/myOrder", models: [], component: "order/otherOrder/MyOrder" },
    { path: "/system/order/otherOrder/goodsOrder", models: [], component: "order/otherOrder/GoodsOrder" },
];