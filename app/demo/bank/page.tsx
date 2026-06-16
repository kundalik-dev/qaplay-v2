import React from "react";

import { demoBankPageMetadata } from "@/data/meta-data/demo/demo-bank-page-meta-data";

export const metadata = demoBankPageMetadata;

const BankDemoApp = () => {
  return (
    <section data-testid="demo-bank-page">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Bank Demo App
      </h1>
    </section>
  );
};

export default BankDemoApp;
