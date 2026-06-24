"use client";

import { CheckCircle2 } from "lucide-react";

export function TestCasesTab() {
  const testCases = [
    {
      id: "GH-001",
      title: "Search for valid user",
      type: "positive",
      steps: [
        "Enter 'kundalik-dev' in the search input using <code>getByLabel('GitHub Username')</code>",
        "Click the Search button using <code>getByRole('button', { name: 'Search' })</code>",
        "Verify that the user's name is displayed",
        "Verify that the 'Repositories' stat value is greater than 0 by locating <code>[data-stat-type=\"repos\"]</code>"
      ],
      expected: "The profile card renders correctly with accurate repository stats."
    },
    {
      id: "GH-002",
      title: "Search for invalid user",
      type: "negative",
      steps: [
        "Enter 'invalid-user-xyz-123' in the search input",
        "Click the Search button",
        "Wait for the error message using <code>getByTestId('error-message')</code>"
      ],
      expected: "An error message 'User not found' should be displayed and the profile card should not render."
    },
    {
      id: "GH-003",
      title: "Locate User Biography",
      type: "challenge",
      steps: [
        "Search for a valid user",
        "Locate the biography text by finding the paragraph that is a sibling of the hidden <code>Biography</code> span. Use XPath: <code>//span[text()='Biography']/following-sibling::p</code>"
      ],
      expected: "The correct bio text is successfully retrieved from the DOM."
    },
    {
      id: "GH-004",
      title: "Extract Location without data-testid",
      type: "challenge",
      steps: [
        "Search for 'kundalik-dev'",
        "Locate the Location detail text without using a direct test ID. Hint: Use the <code>aria-label=\"Location\"</code> icon and find its sibling <code>span.detail-text</code>"
      ],
      expected: "The correct location text or 'Not specified' is successfully retrieved."
    }
  ];

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-7 py-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Automation Test Cases</h2>
        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
          {testCases.length} Scenarios
        </span>
      </div>
      
      <div className="grid gap-4">
        {testCases.map((tc) => (
          <div 
            key={tc.id} 
            className="bg-card border border-border shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                  {tc.id}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{tc.title}</h3>
              </div>
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                tc.type === 'positive' ? 'bg-success/10 text-success border border-success/20' :
                tc.type === 'negative' ? 'bg-destructive/10 text-destructive border border-destructive/20' :
                'bg-secondary/10 text-secondary border border-secondary/20'
              }`}>
                {tc.type}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Steps</h4>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  {tc.steps.map((step, idx) => (
                    <li key={idx} className="text-[15px]" dangerouslySetInnerHTML={{ __html: step }} />
                  ))}
                </ol>
              </div>
              
              <div className="bg-success/5 border border-success/20 rounded-lg p-3 flex gap-3">
                <CheckCircle2 className="text-success shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-medium text-success uppercase tracking-wider mb-1">Expected Result</h4>
                  <p className="text-foreground/80 text-[15px]">{tc.expected}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
