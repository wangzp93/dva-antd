export const MenuList = [
    { path: "order", name: "订单管理", icon: "UserOutlined", children: [
        { path: "shopOrder", name: "商城订单", icon: "UserOutlined", children: [
            { path: "myOrder", name: "我的订单" },
            { path: "goodsOrder", name: "到货验收" },
        ]},
        { path: "otherOrder", name: "专区订单", icon: "UserOutlined", children: [
            { path: "myOrder", name: "我的订单" },
            { path: "goodsOrder", name: "到货验收" },
        ]},
    ]},
]