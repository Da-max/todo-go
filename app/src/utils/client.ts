import { cache, ClientPlugin, dedup, fetch } from 'villus'

export const cachePlugin = cache()
export const fetchPlugin = fetch()
export const defaultPlugins = (): ClientPlugin[] => [
    cachePlugin,
    fetchPlugin,
    dedup(),
]
