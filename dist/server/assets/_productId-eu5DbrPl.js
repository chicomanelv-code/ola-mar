import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { R as Route } from "./router-Cqw0Xr_O.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "./products-BvvSTCBQ.js";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getStripeEnabled = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3d2e99b45e2882a4173fd21ceaa20ca741129ca5fa4868bce25b4278795eeeaf"));
const createCheckoutSession = createServerFn({
  method: "POST"
}).inputValidator((productId) => productId).handler(createSsrRpc("331287a1bf0e39b2e44801cb3b35904ce6c343245195fa09bb019bb3f15ea58c"));
function BuyButton({
  productId,
  className = ""
}) {
  const [loading, setLoading] = useState(false);
  const [stripeEnabled, setStripeEnabled] = useState(null);
  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled);
  }, []);
  const handleClick = async () => {
    setLoading(true);
    try {
      const url = await createCheckoutSession({ data: productId });
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };
  if (stripeEnabled === false) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        disabled: true,
        className: `px-6 py-2 rounded-lg border ${className}`,
        title: "Checkout is not available",
        children: "Checkout Unavailable"
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleClick,
      disabled: loading || stripeEnabled === null,
      className: `px-6 py-2 rounded-lg border disabled:cursor-wait ${className}`,
      children: loading ? "Processing..." : "Buy Now"
    }
  );
}
function RouteComponent() {
  const product = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 p-5", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-[55%]", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "w-full rounded-2xl object-cover" }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-[45%] p-8", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block mb-4", children: "← Back to all products" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", children: product.name }),
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: product.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
          "$",
          product.price.toLocaleString()
        ] }),
        /* @__PURE__ */ jsx(BuyButton, { productId: product.id })
      ] })
    ] })
  ] });
}
export {
  RouteComponent as component
};
