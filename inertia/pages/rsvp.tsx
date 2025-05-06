import { useQueryParams } from '~/hooks/common'

export default function rsvp() {
  const searchParams = useQueryParams()
  const key = searchParams.get('key')

  return <div>RSVP Keys : {key}</div>
}
