export class RateLimiter {
  private requests: Map<string, { count: number, resetTime: number }> = new Map();

  constructor(private limit: number, private windowMs: number) {}

  check(ip: string): boolean {
    const now = Date.now();
    const record = this.requests.get(ip);

    if (!record) {
      this.requests.set(ip, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + this.windowMs;
      return true;
    }

    if (record.count >= this.limit) {
      return false; // Rate limit exceeded
    }

    record.count++;
    return true;
  }
}

// Global instance for login attempts (5 attempts per 15 minutes per IP)
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000);
