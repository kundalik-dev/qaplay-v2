/**
 * Data for the /ui-practice/tables route — single source of truth.
 *
 * Ported 1:1 from the original static HTML/JS prototype so every section
 * (static, sortable, search, pagination, row actions, combined grid)
 * renders identical rows.
 */

export type Department = "Engineering" | "Marketing" | "HR" | "Sales";
export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  dept: Department;
  salary: number;
  /** ISO date string, e.g. "2022-03-15" */
  joined: string;
  status: EmployeeStatus;
}

export const employees: Employee[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    dept: "Engineering",
    salary: 85000,
    joined: "2022-03-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    dept: "Marketing",
    salary: 62000,
    joined: "2021-07-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    dept: "Engineering",
    salary: 92000,
    joined: "2020-01-10",
    status: "Active",
  },
  {
    id: 4,
    name: "Sneha Rao",
    dept: "HR",
    salary: 55000,
    joined: "2023-05-01",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Vikram Singh",
    dept: "Sales",
    salary: 70000,
    joined: "2019-11-30",
    status: "Active",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    dept: "Marketing",
    salary: 58000,
    joined: "2022-09-12",
    status: "Active",
  },
  {
    id: 7,
    name: "Karan Joshi",
    dept: "Engineering",
    salary: 105000,
    joined: "2018-06-25",
    status: "Active",
  },
  {
    id: 8,
    name: "Meera Nair",
    dept: "HR",
    salary: 48000,
    joined: "2024-01-08",
    status: "Inactive",
  },
  {
    id: 9,
    name: "Arjun Kapoor",
    dept: "Sales",
    salary: 77000,
    joined: "2021-03-17",
    status: "Active",
  },
  {
    id: 10,
    name: "Divya Verma",
    dept: "Engineering",
    salary: 98000,
    joined: "2020-08-22",
    status: "Active",
  },
  {
    id: 11,
    name: "Rahul Desai",
    dept: "Marketing",
    salary: 65000,
    joined: "2023-02-14",
    status: "Active",
  },
  {
    id: 12,
    name: "Pooja Iyer",
    dept: "HR",
    salary: 52000,
    joined: "2022-11-05",
    status: "Active",
  },
  {
    id: 13,
    name: "Suresh Kumar",
    dept: "Sales",
    salary: 80000,
    joined: "2017-09-18",
    status: "Active",
  },
  {
    id: 14,
    name: "Nisha Bose",
    dept: "Engineering",
    salary: 72000,
    joined: "2023-08-30",
    status: "Inactive",
  },
  {
    id: 15,
    name: "Amit Tiwari",
    dept: "Sales",
    salary: 68000,
    joined: "2021-12-01",
    status: "Active",
  },
];

export interface Product {
  id: number;
  product: string;
  category: string;
  price: string;
  stockLabel: string;
  inStock: boolean;
  rating: string;
}

export const products: Product[] = [
  {
    id: 1,
    product: "MacBook Pro",
    category: "Laptops",
    price: "$1,299",
    stockLabel: "45 in stock",
    inStock: true,
    rating: "4.8",
  },
  {
    id: 2,
    product: "iPhone 15",
    category: "Phones",
    price: "$999",
    stockLabel: "120 in stock",
    inStock: true,
    rating: "4.7",
  },
  {
    id: 3,
    product: "AirPods Pro",
    category: "Accessories",
    price: "$249",
    stockLabel: "85 in stock",
    inStock: true,
    rating: "4.6",
  },
  {
    id: 4,
    product: "iPad Air",
    category: "Tablets",
    price: "$599",
    stockLabel: "Out of stock",
    inStock: false,
    rating: "4.5",
  },
  {
    id: 5,
    product: "Apple Watch",
    category: "Wearables",
    price: "$399",
    stockLabel: "32 in stock",
    inStock: true,
    rating: "4.4",
  },
  {
    id: 6,
    product: "Magic Mouse",
    category: "Accessories",
    price: "$99",
    stockLabel: "200 in stock",
    inStock: true,
    rating: "3.9",
  },
];
