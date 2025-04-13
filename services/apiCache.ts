// Simple in-memory cache service with expiration

interface CacheEntry<T> {
  value: T
  expiry: number
}

class ApiCache {
  private cache: Map<string, CacheEntry<unknown>>
  private defaultExpiryMs: number

  constructor(defaultExpiryMs = 5 * 60 * 1000) {
    // Default 5 minutes
    this.cache = new Map()
    this.defaultExpiryMs = defaultExpiryMs
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined

    if (!entry) {
      return null
    }

    // Check if entry has expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }

    return entry.value
  }

  set<T>(key: string, value: T, expiryMs?: number): void {
    const expiry = Date.now() + (expiryMs ?? this.defaultExpiryMs)

    this.cache.set(key, {
      value,
      expiry,
    })
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key)
      }
    }
  }
}

// Export singleton instance
export const apiCache = new ApiCache()

// Set up automatic cleanup every minute
setInterval(() => {
  apiCache.cleanup()
}, 60000)
