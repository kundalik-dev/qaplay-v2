import type { FrameworkMethods } from "@/data/practice-data/types";

export interface BookRow {
  id: string; // e.g. "book-001"
  srNo: number;
  bookName: string;
  bookGenre: string;
  bookAuthor: string;
  bookIsbn: string;
  bookPublished: string;
}

export const bookRows: BookRow[] = [
  {
    id: "book-001",
    srNo: 1,
    bookName: "The Pragmatic Programmer",
    bookGenre: "Technology",
    bookAuthor: "Andrew Hunt",
    bookIsbn: "ISBN-9780135957059",
    bookPublished: "1999-10-20",
  },
  {
    id: "book-002",
    srNo: 2,
    bookName: "Clean Code",
    bookGenre: "Technology",
    bookAuthor: "Robert C. Martin",
    bookIsbn: "ISBN-9780132350884",
    bookPublished: "2008-08-01",
  },
  {
    id: "book-003",
    srNo: 3,
    bookName: "Design Patterns",
    bookGenre: "Technology",
    bookAuthor: "Erich Gamma",
    bookIsbn: "ISBN-9780201633610",
    bookPublished: "1994-10-31",
  },
  {
    id: "book-004",
    srNo: 4,
    bookName: "The Hobbit",
    bookGenre: "Fantasy",
    bookAuthor: "J.R.R. Tolkien",
    bookIsbn: "ISBN-9780547928227",
    bookPublished: "1937-09-21",
  },
  {
    id: "book-005",
    srNo: 5,
    bookName: "Dune",
    bookGenre: "Science Fiction",
    bookAuthor: "Frank Herbert",
    bookIsbn: "ISBN-9780441013593",
    bookPublished: "1965-08-01",
  },
  {
    id: "book-006",
    srNo: 6,
    bookName: "1984",
    bookGenre: "Dystopian",
    bookAuthor: "George Orwell",
    bookIsbn: "ISBN-9780451524935",
    bookPublished: "1949-06-08",
  },
  {
    id: "book-007",
    srNo: 7,
    bookName: "Refactoring",
    bookGenre: "Technology",
    bookAuthor: "Martin Fowler",
    bookIsbn: "ISBN-9780134757599",
    bookPublished: "1999-07-08",
  },
  {
    id: "book-008",
    srNo: 8,
    bookName: "The Great Gatsby",
    bookGenre: "Fiction",
    bookAuthor: "F. Scott Fitzgerald",
    bookIsbn: "ISBN-9780743273565",
    bookPublished: "1925-04-10",
  },
  {
    id: "book-009",
    srNo: 9,
    bookName: "Sapiens",
    bookGenre: "Non-Fiction",
    bookAuthor: "Yuval Noah Harari",
    bookIsbn: "ISBN-9780062316097",
    bookPublished: "2011-01-01",
  },
  {
    id: "book-010",
    srNo: 10,
    bookName: "To Kill a Mockingbird",
    bookGenre: "Fiction",
    bookAuthor: "Harper Lee",
    bookIsbn: "ISBN-9780061935466",
    bookPublished: "1960-07-11",
  },
];

export const tableColumnHeaders = [
  { label: "Sr No.", testId: "col-sr-no", dataCol: "sr-no" },
  { label: "Book Name", testId: "col-book-name", dataCol: "book-name" },
  { label: "Book Genre", testId: "col-book-genre", dataCol: "book-genre" },
  { label: "Book Author", testId: "col-book-author", dataCol: "book-author" },
  { label: "Book ISBN", testId: "col-book-isbn", dataCol: "book-isbn" },
  {
    label: "Book Published",
    testId: "col-book-published",
    dataCol: "book-published",
  },
  { label: "Actions", testId: "col-actions", dataCol: "actions" },
];

export const genres = [
  "All",
  "Technology",
  "Fantasy",
  "Science Fiction",
  "Dystopian",
  "Fiction",
  "Non-Fiction",
];

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "findElements(By.tagName(\"tr\"))" },
      { color: "blue", label: "findElement(By.xpath(...))" },
      { color: "orange", label: "getText()" },
      { color: "green", label: "getAttribute()" },
      { color: "yellow", label: "getCssValue()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "locator(\"tbody tr\").count()" },
      { color: "blue", label: ".filter({ hasText: ... })" },
      { color: "orange", label: ".allTextContents()" },
      { color: "green", label: ".nth(i).locator(\"td:nth-child(n)\")" },
      { color: "yellow", label: "expect(row).toBeVisible()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: "cy.get(\"tbody tr\")" },
      { color: "blue", label: ".contains(text)" },
      { color: "orange", label: ".its(\"length\")" },
      { color: "green", label: ".find(\"td\").eq(n)" },
      { color: "yellow", label: ".invoke(\"text\")" },
    ],
  },
};
