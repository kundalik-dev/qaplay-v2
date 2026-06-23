import { NextResponse } from "next/server";

const MOCK_DATA = {
  balance: 14500.5,
  transactions: [
    {
      id: "trx-1001",
      date: "2026-06-20",
      description: "TechCorp Salary",
      amount: 5000.0,
      category: "Income",
    },
    {
      id: "trx-1002",
      date: "2026-06-19",
      description: "Whole Foods Market",
      amount: -120.5,
      category: "Groceries",
    },
    {
      id: "trx-1003",
      date: "2026-06-18",
      description: "Electric Bill",
      amount: -95.0,
      category: "Utilities",
    },
    {
      id: "trx-1004",
      date: "2026-06-15",
      description: "Amazon.com",
      amount: -45.99,
      category: "Shopping",
    },
    {
      id: "trx-1005",
      date: "2026-06-14",
      description: "Uber Rides",
      amount: -18.0,
      category: "Transport",
    },
    {
      id: "trx-1006",
      date: "2026-06-10",
      description: "Freelance Design",
      amount: 850.0,
      category: "Income",
    },
    {
      id: "trx-1007",
      date: "2026-06-08",
      description: "Starbucks",
      amount: -6.5,
      category: "Dining",
    },
    {
      id: "trx-1008",
      date: "2026-06-05",
      description: "Internet Provider",
      amount: -60.0,
      category: "Utilities",
    },
    {
      id: "trx-1009",
      date: "2026-06-02",
      description: "Target",
      amount: -110.25,
      category: "Shopping",
    },
    {
      id: "trx-1010",
      date: "2026-06-01",
      description: "Gym Membership",
      amount: -40.0,
      category: "Health",
    },
  ],
};

export async function GET() {
  return NextResponse.json(MOCK_DATA);
}
