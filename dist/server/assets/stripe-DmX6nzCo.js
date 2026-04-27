import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "../server.js";
import { p as products } from "./products-BvvSTCBQ.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getStripeEnabled_createServerFn_handler = createServerRpc({
  id: "3d2e99b45e2882a4173fd21ceaa20ca741129ca5fa4868bce25b4278795eeeaf",
  name: "getStripeEnabled",
  filename: "src/lib/stripe.ts"
}, (opts) => getStripeEnabled.__executeServer(opts));
const getStripeEnabled = createServerFn({
  method: "GET"
}).handler(getStripeEnabled_createServerFn_handler, () => !!process.env.STRIPE_SECRET_KEY);
const createCheckoutSession_createServerFn_handler = createServerRpc({
  id: "331287a1bf0e39b2e44801cb3b35904ce6c343245195fa09bb019bb3f15ea58c",
  name: "createCheckoutSession",
  filename: "src/lib/stripe.ts"
}, (opts) => createCheckoutSession.__executeServer(opts));
const createCheckoutSession = createServerFn({
  method: "POST"
}).inputValidator((productId) => productId).handler(createCheckoutSession_createServerFn_handler, async ({
  data: productId
}) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe is not configured");
  }
  const {
    default: Stripe
  } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error("Product not found");
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.shortDescription,
          images: [product.image]
        },
        unit_amount: product.price * 100
      },
      quantity: 1
    }],
    mode: "payment",
    success_url: `${process.env.SITE_URL ?? "http://localhost:3000"}/checkout/success`,
    cancel_url: `${process.env.SITE_URL ?? "http://localhost:3000"}/checkout/cancel`
  });
  return session.url;
});
export {
  createCheckoutSession_createServerFn_handler,
  getStripeEnabled_createServerFn_handler
};
