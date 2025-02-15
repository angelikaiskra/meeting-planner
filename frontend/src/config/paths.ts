export const paths = {
  home: {
    path: '/',
    getHref: () => '/'
  },

  createPoll: {
    path: '/create',
    getHref: () => '/create',
    menuTitle: 'Create poll'
  },

  managePoll: {
    path: '/poll/:pollId',
    getHref: (pollId: string) => `/poll/${pollId}`,
  },

  register: {
    path: '/auth/register',
    getHref: (redirectTo?: string | null | undefined) =>
      `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    menuTitle: 'Sign up'
  },

  login: {
    path: '/auth/login',
    getHref: (redirectTo?: string | null | undefined) =>
      `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    menuTitle: 'Login'
  }
} as const;