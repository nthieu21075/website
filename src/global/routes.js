const LOGIN_PAGE = '/login'
const REGISTER_PAGE = '/register'
const HOME_PAGE = '/'
const PROFILE_PAGE = '/my-profile'
const TOURNAMENTS_PAGE = '/tournaments'

export default {
  REGISTER_PAGE,
  LOGIN_PAGE,
  users: {
    HOME_PAGE,
    PROFILE_PAGE,
    TOURNAMENTS_PAGE
  },
  organizers: {
    LOGIN: '/organizer/login',
    HOMEPAGE: '/organizer',
    MY_PROFILE: '/organizer/my-profile',
    CREATE_TOURNAMENT: '/organizer/create-tournament',
    TOURNAMENT_DETAIL: '/organizer/tournament/:id',
    TOURNAMENTS: '/organizer/tournaments'
  }
}
