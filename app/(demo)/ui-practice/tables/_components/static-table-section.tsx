import { products } from "@/data/ui-practice-data/tables-data";

/**
 * Section 1 — basic static table (Beginner).
 * No interactivity, so this stays a plain Server Component.
 */
export function StaticTableSection() {
  return (
    <section className="section" id="sec-static">
      <h2>
        1. Basic static table{" "}
        <span className="badge badge-green">Beginner</span>
      </h2>
      <p className="hint">
        Fixed hard-coded data. Practice all locator strategies:{" "}
        <code>getByRole(&apos;table&apos;)</code> ·{" "}
        <code>getByRole(&apos;columnheader&apos;)</code> ·{" "}
        <code>getByRole(&apos;row&apos;)</code> ·{" "}
        <code>getByRole(&apos;cell&apos;)</code> · <code>nth()</code> ·{" "}
        <code>filter(&#123; hasText &#125;)</code> · <code>data-testid</code>.
        Also practice locating a cell by its column index and by row context.
      </p>
      <table data-testid="static-table" aria-label="Product inventory">
        <thead>
          <tr>
            <th scope="col" data-testid="th-product">
              Product
            </th>
            <th scope="col" data-testid="th-category">
              Category
            </th>
            <th scope="col" data-testid="th-price">
              Price
            </th>
            <th scope="col" data-testid="th-stock">
              Stock
            </th>
            <th scope="col" data-testid="th-rating">
              Rating
            </th>
          </tr>
        </thead>
        <tbody data-testid="static-tbody">
          {products.map((p, i) => (
            <tr key={p.id} data-testid={`static-row-${i + 1}`}>
              <td data-testid={`cell-${i + 1}-product`}>{p.product}</td>
              <td data-testid={`cell-${i + 1}-category`}>{p.category}</td>
              <td data-testid={`cell-${i + 1}-price`}>{p.price}</td>
              <td>
                <span
                  className={p.inStock ? "stock-in" : "stock-out"}
                  data-testid={`cell-${i + 1}-stock`}
                >
                  {p.stockLabel}
                </span>
              </td>
              <td data-testid={`cell-${i + 1}-rating`}>{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
