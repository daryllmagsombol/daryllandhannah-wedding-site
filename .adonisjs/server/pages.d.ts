import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'admin-login': ExtractProps<(typeof import('../../inertia/pages/admin-login.tsx'))['default']>
    'admin/guests': ExtractProps<(typeof import('../../inertia/pages/admin/guests.tsx'))['default']>
    'admin/statistics': ExtractProps<(typeof import('../../inertia/pages/admin/statistics.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'rsvp': ExtractProps<(typeof import('../../inertia/pages/rsvp.tsx'))['default']>
    'seat-inquiry': ExtractProps<(typeof import('../../inertia/pages/seat-inquiry.tsx'))['default']>
    'shared/loader': ExtractProps<(typeof import('../../inertia/pages/shared/loader.tsx'))['default']>
    'valentines': ExtractProps<(typeof import('../../inertia/pages/valentines.tsx'))['default']>
  }
}
