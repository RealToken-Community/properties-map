import axios from "axios";
import CacheService from "../services/cache.service";
import { NextFunction, Request, Response } from "express";

const PropertiesCacheKey = 'properties'

// TTL is in seconds, 1 hour
const cachedTime = 60 * 60

export async function get(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
  try {
    const cacheService = CacheService.getInstance();
    const cached = cacheService.get(PropertiesCacheKey)
    if (cached) {
      console.log('Returning cached properties')
      return res.json(cached)
    }

    const { data: properties } = await axios.get('https://dashboard.realtoken.community/api/properties')
    cacheService.set(PropertiesCacheKey, properties, cachedTime)
    return res.json(properties)
  } catch (err) {
    console.error(`Error while getting properties`, (err as any).message)
    next(err)
  }
  return res.status(500).json({ message: 'Internal server error' })
}
