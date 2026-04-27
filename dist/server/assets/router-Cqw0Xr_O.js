import { createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useReducer, createContext, useContext } from "react";
import { p as products } from "./products-BvvSTCBQ.js";
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const idx = state.items.findIndex(
        (i) => i.product.id === action.product.id && i.size === action.size
      );
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
        return { ...state, items, isOpen: true };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: 1, size: action.size }
        ],
        isOpen: true
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.size === action.size)
        )
      };
    case "UPDATE_QUANTITY": {
      const idx = state.items.findIndex(
        (i) => i.product.id === action.productId && i.size === action.size
      );
      if (idx < 0) return state;
      const newQty = state.items[idx].quantity + action.delta;
      if (newQty <= 0) {
        return { ...state, items: state.items.filter((_, i) => i !== idx) };
      }
      const items = [...state.items];
      items[idx] = { ...items[idx], quantity: newQty };
      return { ...state, items };
    }
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}
const CartContext = createContext(null);
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  });
  const addItem = (product, size) => dispatch({ type: "ADD_ITEM", product, size });
  const removeItem = (productId, size) => dispatch({ type: "REMOVE_ITEM", productId, size });
  const updateQuantity = (productId, size, delta) => dispatch({ type: "UPDATE_QUANTITY", productId, size, delta });
  const openCart = () => dispatch({ type: "OPEN_CART" });
  const closeCart = () => dispatch({ type: "CLOSE_CART" });
  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return /* @__PURE__ */ jsx(
    CartContext.Provider,
    {
      value: {
        state,
        addItem,
        removeItem,
        updateQuantity,
        openCart,
        closeCart,
        total,
        count
      },
      children
    }
  );
}
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OlaMar — Ropa Deportiva de Lujo" },
      {
        name: "description",
        content: "Ropa deportiva de lujo desde Cuenca, Ecuador. Colecciones diseñadas para el movimiento, la fuerza y la elegancia."
      }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: ""
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&display=swap"
      }
    ]
  }),
  component: () => /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$3 = () => import("./index-DQoedet5.js");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./_productId-eu5DbrPl.js");
const Route$2 = createFileRoute("/products/$productId")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  loader: async ({
    params
  }) => {
    const product = products.find((product2) => product2.id === +params.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
});
const $$splitComponentImporter$1 = () => import("./success-CIMuB9Se.js");
const Route$1 = createFileRoute("/checkout/success")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./cancel-Dq7g7TXn.js");
const Route = createFileRoute("/checkout/cancel")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const ProductsProductIdRoute = Route$2.update({
  id: "/products/$productId",
  path: "/products/$productId",
  getParentRoute: () => Route$4
});
const CheckoutSuccessRoute = Route$1.update({
  id: "/checkout/success",
  path: "/checkout/success",
  getParentRoute: () => Route$4
});
const CheckoutCancelRoute = Route.update({
  id: "/checkout/cancel",
  path: "/checkout/cancel",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  CheckoutCancelRoute,
  CheckoutSuccessRoute,
  ProductsProductIdRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  router as r,
  useCart as u
};
