import Link from "next/link";
import { Code, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { githubProjects } from "./about-me-data";

export function GithubProjectsSection() {
  return (
    <section
      data-testid="about-me-github"
      data-section="github-projects"
      className="mt-10"
    >
      <h2 className="flex items-center gap-2 text-2xl font-semibold">
        <Code className="text-primary" aria-hidden="true" /> My GitHub Projects
      </h2>
      <hr />
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {githubProjects.map((repo) => (
          <Card
            key={repo.id}
            data-card={repo.id}
            data-testid={`about-me-github-${repo.id}`}
            className="border-l-4 border-primary transition-shadow duration-300 hover:shadow-lg"
          >
            <CardContent className="flex h-full flex-col p-5">
              <div className="mb-2 flex items-center gap-2">
                <Code className="text-primary" size={20} aria-hidden="true" />
                <h3 className="text-lg font-bold">{repo.name}</h3>
              </div>
              <p className="flex-1 text-sm text-muted-foreground">
                {repo.description}
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="flex w-full items-center gap-2"
                  >
                    <Code size={16} aria-hidden="true" />
                    View on GitHub
                  </Button>
                </Link>
                <Link
                  href={repo.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="secondary"
                    className="flex w-full items-center gap-2"
                  >
                    <Globe size={16} aria-hidden="true" />
                    Live Project
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
