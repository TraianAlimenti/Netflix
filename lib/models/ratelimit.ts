const rateLimit = require("express-rate-limit");

const max = 5;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: max, // limit each IP to 100 requests per windowMs
  message: "Rate limit",
});

export function maxReqPerMinute() {
    return max;
}

export default limiter;