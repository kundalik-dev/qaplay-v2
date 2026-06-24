"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Loader2,
  Users,
  BookOpen,
  MapPin,
  Link as LinkIcon,
  Building,
  Search,
  UserCheck,
  Code2,
  GitBranch,
  Star,
  GitFork,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { gitHub_username } from "@/data/settings-data/basic-settings";

/* ── Types ─────────────────────────────────────────────────────── */
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  created_at: string;
}

interface GitHubFollower {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  visibility: string;
  fork: boolean;
}

type SortField = "name" | "stars" | "forks" | "updated_at";
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  JavaScript: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  Python: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  Go: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Rust: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Java: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  CSS: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  HTML: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Shell: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

function langClass(lang: string | null) {
  if (!lang) return "bg-muted text-muted-foreground";
  return LANGUAGE_COLORS[lang] ?? "bg-muted text-muted-foreground";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ── SortIcon ───────────────────────────────────────────────────── */
function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (sortField !== field) return <ArrowUpDown className="size-3 ml-1 text-muted-foreground/50" />;
  return sortDir === "asc"
    ? <ArrowUp className="size-3 ml-1 text-primary" />
    : <ArrowDown className="size-3 ml-1 text-primary" />;
}

/* ── Main Component ─────────────────────────────────────────────── */
export function GithubProfileSearch() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [followersList, setFollowersList] = useState<GitHubFollower[]>([]);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [requestsLeft, setRequestsLeft] = useState("60/60");

  /* Repo table state */
  const [sortField, setSortField] = useState<SortField>("updated_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchProfile = async (user: string) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    setRepos([]);
    try {
      const [profileRes, followersRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${user}`),
        fetch(`https://api.github.com/users/${user}/followers?per_page=10`),
        fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`),
      ]);

      const remaining = profileRes.headers.get("x-ratelimit-remaining");
      const limit = profileRes.headers.get("x-ratelimit-limit");
      if (remaining && limit) setRequestsLeft(`${remaining}/${limit}`);

      if (!profileRes.ok) {
        throw new Error(profileRes.status === 404 ? "User not found" : "Failed to fetch profile");
      }

      const [profileData, followersData, reposData] = await Promise.all([
        profileRes.json(),
        followersRes.ok ? followersRes.json() : [],
        reposRes.ok ? reposRes.json() : [],
      ]);

      setProfile(profileData);
      setFollowersList(followersData);
      setRepos(Array.isArray(reposData) ? reposData : []);
      setPage(1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
      setProfile(null);
      setFollowersList([]);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial profile load on mount; fetchProfile manages its own loading/error state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile(gitHub_username);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProfile(username);
  };

  /* ── Sorted + paginated repos ─────────────────────────────────── */
  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      let valA: string | number;
      let valB: string | number;
      if (sortField === "stars") { valA = a.stargazers_count; valB = b.stargazers_count; }
      else if (sortField === "forks") { valA = a.forks_count; valB = b.forks_count; }
      else if (sortField === "updated_at") { valA = new Date(a.updated_at).getTime(); valB = new Date(b.updated_at).getTime(); }
      else { valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [repos, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sortedRepos.length / pageSize));
  const pagedRepos = sortedRepos.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
    setPage(1);
  };

  return (
    <div
      className="w-full max-w-[1100px] mx-auto px-4 sm:px-7 py-6 space-y-5"
      data-testid="github-search-app"
    >
      {/* ── Search bar ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <form
          onSubmit={handleSearch}
          className="flex flex-1 max-w-md items-center gap-2"
          data-testid="search-form"
        >
          <label htmlFor="github-username" className="sr-only">Enter GitHub username</label>
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              id="github-username"
              name="username"
              type="text"
              className="pl-8"
              placeholder="Search GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="search-input"
            />
          </div>
          <Button type="submit" size="default" disabled={loading} data-testid="search-button">
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : "Search"}
          </Button>
        </form>
        <Badge variant="outline" className="ml-auto text-xs font-medium shrink-0" data-testid="requests-count">
          Requests: {requestsLeft}
        </Badge>
      </div>

      {/* ── Error ──────────────────────────────────────────────── */}
      {error && (
        <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg px-4 py-2.5 text-sm text-center font-medium" data-testid="error-message">
          {error}
        </div>
      )}

      {/* ── Profile ────────────────────────────────────────────── */}
      {profile ? (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-400">

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={<BookOpen className="size-4 text-primary" />} value={profile.public_repos} label="Repos" type="repos" />
            <StatCard icon={<Users className="size-4 text-violet-500" />} value={profile.followers} label="Followers" type="followers" />
            <StatCard icon={<UserCheck className="size-4 text-orange-500" />} value={profile.following} label="Following" type="following" />
            <StatCard icon={<Code2 className="size-4 text-sky-500" />} value={profile.public_gists} label="Gists" type="gists" />
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Profile card */}
            <Card className="lg:col-span-2" data-testid="profile-card">
              <CardHeader className="border-b">
                <CardTitle className="text-sm font-semibold text-foreground">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-5 space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar className="!size-16 sm:!size-20 rounded-full ring-2 ring-border shrink-0" size="lg">
                    <AvatarImage src={profile.avatar_url} alt={`${profile.login}'s avatar`} data-testid="user-avatar" />
                    <AvatarFallback className="text-base font-semibold">
                      {(profile.name || profile.login)[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-foreground tracking-tight leading-tight" data-testid="user-display-name">
                      {profile.name || profile.login}
                    </h2>
                    <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline" data-testid="user-handle">
                      @{profile.login}
                    </a>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">Follow</Button>
                </div>

                {profile.bio && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="sr-only">Biography: </span>{profile.bio}
                  </p>
                )}

                <div className="grid sm:grid-cols-2 gap-2.5 pt-4 border-t text-sm text-muted-foreground">
                  <DetailItem icon={<Building className="size-3.5 shrink-0" aria-label="Company" />} text={profile.company || "Not specified"} />
                  <DetailItem icon={<MapPin className="size-3.5 shrink-0" aria-label="Location" />} text={profile.location || "Not specified"} />
                  <div className="flex items-center gap-2">
                    <LinkIcon className="size-3.5 shrink-0" aria-label="Blog" />
                    {profile.blog ? (
                      <a href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">
                        {profile.blog}
                      </a>
                    ) : (
                      <span className="text-foreground truncate">Not specified</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Followers card */}
            <Card className="flex flex-col overflow-hidden" style={{ maxHeight: 420 }} data-testid="followers-card">
              <CardHeader className="border-b shrink-0 flex-row items-center justify-between space-y-0 py-3">
                <CardTitle className="text-sm font-semibold text-foreground">Followers</CardTitle>
                <Badge variant="secondary" className="text-xs">{followersList.length}</Badge>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {followersList.length > 0 ? (
                  followersList.map((follower) => (
                    <div key={follower.id} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted/50 transition-colors" data-testid="follower-item">
                      <Avatar className="size-8 shrink-0">
                        <AvatarImage src={follower.avatar_url} alt={follower.login} />
                        <AvatarFallback className="text-xs">{follower.login[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-foreground truncate">{follower.login}</span>
                        <a href={follower.html_url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary truncate">
                          {follower.html_url}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground py-10 text-center">
                    No followers found.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── Repos table ──────────────────────────────────────── */}
          {loading && (
            <Card>
              <CardHeader className="border-b py-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Skeleton header row */}
                <div className="flex gap-4 px-4 py-2.5 border-b bg-muted/40">
                  {[140, 200, 80, 60, 60, 90, 60].map((w, i) => (
                    <Skeleton key={i} className="h-3 rounded" style={{ width: w }} />
                  ))}
                </div>
                {/* Skeleton data rows */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex gap-4 px-4 py-3.5 border-b last:border-0 items-center">
                    <Skeleton className="h-3 rounded" style={{ width: 130 - (i % 3) * 20 }} />
                    <Skeleton className="h-3 rounded" style={{ width: 180 - (i % 4) * 30 }} />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-3 w-8 rounded" />
                    <Skeleton className="h-3 w-8 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                ))}
                {/* Skeleton pagination */}
                <div className="flex items-center justify-between px-4 py-3 border-t">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-10 rounded" />
                    <Skeleton className="h-7 w-14 rounded-md" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="size-8 rounded-md" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && repos.length > 0 && (
            <Card data-testid="repos-table-card">
              <CardHeader className="border-b py-3">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Repositories</CardTitle>
                  <Badge variant="secondary" className="text-xs">{repos.length} repos</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="repos-table">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        {/* Name */}
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">
                          <button
                            onClick={() => toggleSort("name")}
                            className="inline-flex items-center gap-0.5 hover:text-foreground transition-colors"
                            data-testid="sort-name"
                          >
                            Name <SortIcon field="name" sortField={sortField} sortDir={sortDir} />
                          </button>
                        </th>
                        {/* Description */}
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                          Description
                        </th>
                        {/* Language */}
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">
                          Language
                        </th>
                        {/* Stars */}
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">
                          <button
                            onClick={() => toggleSort("stars")}
                            className="inline-flex items-center gap-0.5 hover:text-foreground transition-colors"
                            data-testid="sort-stars"
                          >
                            <Star className="size-3 mr-0.5" /> Stars <SortIcon field="stars" sortField={sortField} sortDir={sortDir} />
                          </button>
                        </th>
                        {/* Forks */}
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">
                          <button
                            onClick={() => toggleSort("forks")}
                            className="inline-flex items-center gap-0.5 hover:text-foreground transition-colors"
                            data-testid="sort-forks"
                          >
                            <GitFork className="size-3 mr-0.5" /> Forks <SortIcon field="forks" sortField={sortField} sortDir={sortDir} />
                          </button>
                        </th>
                        {/* Updated */}
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">
                          <button
                            onClick={() => toggleSort("updated_at")}
                            className="inline-flex items-center gap-0.5 hover:text-foreground transition-colors"
                            data-testid="sort-updated"
                          >
                            Updated <SortIcon field="updated_at" sortField={sortField} sortDir={sortDir} />
                          </button>
                        </th>
                        {/* Visibility */}
                        <th className="text-left px-4 py-2.5 font-medium text-muted-foreground whitespace-nowrap">
                          Visibility
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedRepos.map((repo) => (
                        <tr
                          key={repo.id}
                          className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                          data-testid="repo-row"
                          data-repo-name={repo.name}
                        >
                          {/* Name */}
                          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-primary hover:underline"
                              data-testid="repo-link"
                            >
                              {repo.name}
                              <ExternalLink className="size-3 opacity-50" />
                            </a>
                          </td>
                          {/* Description */}
                          <td className="px-4 py-3 text-muted-foreground max-w-[240px]">
                            <span className="line-clamp-1">{repo.description || "—"}</span>
                          </td>
                          {/* Language */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            {repo.language ? (
                              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", langClass(repo.language))}>
                                {repo.language}
                              </span>
                            ) : (
                              <span className="text-muted-foreground text-xs">—</span>
                            )}
                          </td>
                          {/* Stars */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                              <Star className="size-3 text-yellow-500" />
                              {repo.stargazers_count.toLocaleString()}
                            </span>
                          </td>
                          {/* Forks */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                              <GitFork className="size-3" />
                              {repo.forks_count.toLocaleString()}
                            </span>
                          </td>
                          {/* Updated */}
                          <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                            {formatDate(repo.updated_at)}
                          </td>
                          {/* Visibility */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge
                              variant={repo.visibility === "public" ? "outline" : "secondary"}
                              className="text-[10px] capitalize"
                            >
                              {repo.visibility}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Pagination ────────────────────────────────── */}
                <div className="flex items-center justify-between px-4 py-3 border-t gap-4 flex-wrap">
                  {/* Left: page-size + info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Show</span>
                    <select
                      className="h-7 rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      value={pageSize}
                      onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                      data-testid="page-size-select"
                      aria-label="Rows per page"
                    >
                      {PAGE_SIZE_OPTIONS.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <span>per page</span>
                    <span className="text-muted-foreground/60">·</span>
                    <span data-testid="pagination-info">
                      {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sortedRepos.length)} of {sortedRepos.length}
                    </span>
                  </div>

                  {/* Right: nav buttons */}
                  <div className="flex items-center gap-1" data-testid="pagination-controls">
                    <Button
                      variant="outline" size="icon"
                      onClick={() => setPage(1)} disabled={page === 1}
                      aria-label="First page" data-testid="pagination-first"
                    >
                      <ChevronsLeft className="size-3.5" />
                    </Button>
                    <Button
                      variant="outline" size="icon"
                      onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      aria-label="Previous page" data-testid="pagination-prev"
                    >
                      <ChevronLeft className="size-3.5" />
                    </Button>

                    {/* Page number chips */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                      .reduce<(number | "…")[]>((acc, p, i, arr) => {
                        if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, i) =>
                        p === "…" ? (
                          <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground text-xs">…</span>
                        ) : (
                          <Button
                            key={p}
                            variant={page === p ? "default" : "outline"}
                            size="icon"
                            onClick={() => setPage(p as number)}
                            aria-label={`Page ${p}`}
                            aria-current={page === p ? "page" : undefined}
                            data-page={p}
                          >
                            <span className="text-xs">{p}</span>
                          </Button>
                        )
                      )}

                    <Button
                      variant="outline" size="icon"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      aria-label="Next page" data-testid="pagination-next"
                    >
                      <ChevronRight className="size-3.5" />
                    </Button>
                    <Button
                      variant="outline" size="icon"
                      onClick={() => setPage(totalPages)} disabled={page === totalPages}
                      aria-label="Last page" data-testid="pagination-last"
                    >
                      <ChevronsRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      ) : !loading && !error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
          <GitBranch className="size-10 opacity-20" />
          <p className="text-sm">Search for a GitHub user to view their profile.</p>
        </div>
      ) : null}
    </div>
  );
}

/* ── StatCard ───────────────────────────────────────────────────── */
function StatCard({ icon, value, label, type }: { icon: React.ReactNode; value: number; label: string; type: string }) {
  return (
    <Card data-stat-type={type}>
      <CardContent className="flex items-center gap-3 py-4">
        <div className="size-8 rounded-md bg-muted flex items-center justify-center shrink-0">{icon}</div>
        <div>
          <div className="text-xl font-bold text-foreground leading-none mb-0.5">{value}</div>
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── DetailItem ─────────────────────────────────────────────────── */
function DetailItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-foreground truncate">{text}</span>
    </div>
  );
}
