import { readonly, ref } from 'vue'

const REPO_API_URL = 'https://api.github.com/repos/tegnike/aituber-kit'
const RELEASE_API_URL =
  'https://api.github.com/repos/tegnike/aituber-kit/releases/latest'
const MAIN_COMMIT_API_URL =
  'https://api.github.com/repos/tegnike/aituber-kit/commits/main'

type GithubRepoStats = {
  stars: number | null
  release: string | null
  lastCommitAt: string | null
}

const stats = ref<GithubRepoStats>({
  stars: null,
  release: null,
  lastCommitAt: null,
})

let statsRequest: Promise<void> | null = null

export const useGithubRepoStats = () => {
  const loadStats = () => {
    if (typeof window === 'undefined') return Promise.resolve()

    if (!statsRequest) {
      statsRequest = Promise.all([
        fetch(REPO_API_URL, {
          headers: { Accept: 'application/vnd.github+json' },
        }),
        fetch(RELEASE_API_URL, {
          headers: { Accept: 'application/vnd.github+json' },
        }),
        fetch(MAIN_COMMIT_API_URL, {
          headers: { Accept: 'application/vnd.github+json' },
        }),
      ])
        .then(async ([repoResponse, releaseResponse, commitResponse]) => {
          const repo = repoResponse.ok ? await repoResponse.json() : null
          const release = releaseResponse.ok
            ? await releaseResponse.json()
            : null
          const commit = commitResponse.ok ? await commitResponse.json() : null

          stats.value = {
            stars:
              typeof repo?.stargazers_count === 'number'
                ? repo.stargazers_count
                : null,
            release:
              typeof release?.tag_name === 'string' ? release.tag_name : null,
            lastCommitAt:
              typeof commit?.commit?.committer?.date === 'string'
                ? commit.commit.committer.date
                : null,
          }
        })
        .catch(() => {
          statsRequest = null
        })
    }

    return statsRequest
  }

  return {
    stats: readonly(stats),
    loadStats,
  }
}

export const formatStars = (stars: number | null) => {
  if (stars === null) return '...'

  return stars >= 1000
    ? `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k`
    : `${stars}`
}

export const formatRelease = (release: string | null) => release ?? '...'

export const formatShortDate = (date: string | null) => {
  if (date === null) return '...'

  const parsed = new Date(date)

  if (Number.isNaN(parsed.getTime())) {
    return '...'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parsed)
}
