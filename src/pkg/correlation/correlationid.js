import crypto from 'node:crypto';
export function correlationId(res,req,next) {
    const id= crypto.randomUUID();
    req.correlationId=id;
    res.setHeader('X-Correlation-Id');
    next();
}