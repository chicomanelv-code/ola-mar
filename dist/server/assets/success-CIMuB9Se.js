import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function CheckoutSuccess() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center p-5", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl p-12 border text-center max-w-lg", children: [
    /* @__PURE__ */ jsx("div", { className: "text-6xl mb-6", children: "✓" }),
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: "Payment Successful!" }),
    /* @__PURE__ */ jsx("p", { className: "mb-8", children: "Thank you for your purchase. Your order is on its way!" }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block px-6 py-3 rounded-lg border", children: "Back to Home" })
  ] }) });
}
export {
  CheckoutSuccess as component
};
