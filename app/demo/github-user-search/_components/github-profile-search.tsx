"use client";

import { useState, useEffect } from "react";
import styles from "./github-search.module.css";
import { Loader2, Users, BookOpen, MapPin, Link as LinkIcon, Building, Search, UserCheck } from "lucide-react";

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

export function GithubProfileSearch() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [followersList, setFollowersList] = useState<GitHubFollower[]>([]);
  const [requestsLeft, setRequestsLeft] = useState("60/60");

  const fetchProfile = async (user: string) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${user}`);
      
      const remaining = res.headers.get("x-ratelimit-remaining");
      const limit = res.headers.get("x-ratelimit-limit");
      if (remaining && limit) {
        setRequestsLeft(`${remaining}/${limit}`);
      }

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("User not found");
        }
        throw new Error("Failed to fetch profile");
      }
      const data = await res.json();
      setProfile(data);

      const followersRes = await fetch(`https://api.github.com/users/${user}/followers?per_page=10`);
      if (followersRes.ok) {
        const followersData = await followersRes.json();
        setFollowersList(followersData);
      }
    } catch (err: any) {
      setError(err.message);
      setProfile(null);
      setFollowersList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile("kundalik-dev");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProfile(username);
  };

  return (
    <div className={styles.container} data-testid="github-search-app">
      {/* Search Header */}
      <div className={styles.searchHeader}>
        <form onSubmit={handleSearch} className={styles.searchForm} data-testid="search-form">
          <Search className={styles.searchIcon} />
          <label htmlFor="github-username" className="sr-only">Enter Github User Name</label>
          <input
            id="github-username"
            name="username"
            type="text"
            className={styles.searchInput}
            placeholder="Search GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="search-input"
          />
          <button 
            type="submit" 
            className={styles.searchBtn}
            disabled={loading}
            data-testid="search-button"
          >
            {loading ? <Loader2 className={styles.loader} /> : "Search"}
          </button>
        </form>
        <div className={styles.requestsCount} data-testid="requests-count">
          Requests: {requestsLeft}
        </div>
      </div>

      {error && (
        <div className={styles.errorBox} data-testid="error-message">
          {error}
        </div>
      )}

      {profile ? (
        <div className={styles.profileContainer}>
          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <StatCard icon={<BookOpen className={styles.statIconRepos} />} value={profile.public_repos} label="Repos" type="repos" />
            <StatCard icon={<Users className={styles.statIconFollowers} />} value={profile.followers} label="Followers" type="followers" />
            <StatCard icon={<UserCheck className={styles.statIconFollowing} />} value={profile.following} label="Following" type="following" />
            <StatCard icon={<Code2Icon />} value={profile.public_gists || 0} label="Gists" type="gists" />
          </div>

          {/* Content Grid */}
          <div className={styles.contentGrid}>
            {/* User Card */}
            <div className={styles.userCard} data-testid="profile-card">
              <div className={styles.cardHeader}>
                Profile Information
              </div>
              <div className={styles.userContent}>
                <div className={styles.profileTop}>
                  <img 
                    src={profile.avatar_url} 
                    alt={`${profile.login}'s avatar`} 
                    className={styles.avatar} 
                    data-testid="user-avatar"
                  />
                  <div className={styles.profileMain}>
                    <h1 className={styles.name}>{profile.name || profile.login}</h1>
                    <a 
                      href={profile.html_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={styles.username}
                      data-testid="user-handle"
                    >
                      @{profile.login}
                    </a>
                  </div>
                  <button className={styles.followBtn}>
                    Follow
                  </button>
                </div>

                <div className={styles.bioSection}>
                  <span className="sr-only">Biography</span>
                  <p className={styles.bio}>
                    {profile.bio || "No bio available."}
                  </p>
                </div>

                <div className={styles.detailsList}>
                  <DetailItem icon={<Building className={styles.detailIcon} aria-label="Company" />} text={profile.company || "Not specified"} />
                  <DetailItem icon={<MapPin className={styles.detailIcon} aria-label="Location" />} text={profile.location || "Not specified"} />
                  <div className={styles.detailItem}>
                    <LinkIcon className={styles.detailIcon} aria-label="Blog" />
                    {profile.blog ? (
                      <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className={styles.detailLink}>
                        {profile.blog}
                      </a>
                    ) : (
                      <span className={styles.detailText}>Not specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Followers Card */}
            <div className={styles.followersCard} data-testid="followers-card">
              <div className={styles.followersCardHeader}>
                <span>Followers</span>
                <span className={styles.followersCount}>{followersList.length}</span>
              </div>
              <div className={styles.followersList}>
                {followersList.length > 0 ? (
                  followersList.map((follower) => (
                    <div key={follower.id} className={styles.followerItem} data-testid="follower-item">
                      <img src={follower.avatar_url} alt={follower.login} className={styles.followerAvatar} />
                      <div className={styles.followerInfo}>
                        <span className={styles.followerName}>{follower.login}</span>
                        <a href={follower.html_url} target="_blank" rel="noreferrer" className={styles.followerLink}>
                          {follower.html_url}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyFollowers}>
                    No followers found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : !loading && !error ? (
        <div className={styles.emptyState}>
          <Search className={styles.emptyStateIcon} />
          <p className={styles.emptyStateText}>Search for a GitHub user to view their profile details.</p>
        </div>
      ) : null}
    </div>
  );
}

function StatCard({ icon, value, label, type }: { icon: React.ReactNode, value: number, label: string, type: string }) {
  return (
    <div className={styles.statCard} data-stat-type={type}>
      <div className={styles.statIconWrapper}>
        {icon}
      </div>
      <div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
}

function DetailItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className={styles.detailItem}>
      <span className="shrink-0">{icon}</span>
      <span className={styles.detailText}>{text}</span>
    </div>
  );
}

function Code2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.statIconGists} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}
