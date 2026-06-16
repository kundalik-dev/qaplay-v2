import React from "react";

const BankDemoLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="demo-bank-layout" data-section="demo-bank">
      {children}
    </div>
  );
};

export default BankDemoLayout;
