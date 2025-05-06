import { usePage } from '@inertiajs/react'

export function useQueryParams() {
  const { url } = usePage()
  return new URLSearchParams(url.split('?')[1] || '')
}
