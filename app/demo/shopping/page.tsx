import React from "react";

import { demoShoppingPageMetadata } from "@/data/meta-data/demo/demo-shopping-page-meta-data";

export const metadata = demoShoppingPageMetadata;

const ShoppingDemoApp = () => {
  return (
    <section data-testid="demo-shopping-page">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Shopping Demo App
      </h1>
    </section>
  );
};

export default ShoppingDemoApp;
