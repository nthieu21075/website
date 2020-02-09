const LOGIN_PAGE = '/login'
const REGISTER_PAGE = '/register'
const HOME_PAGE = '/'
const PROFILE_PAGE = '/my-profile'
const TOURNAMENTS_PAGE = '/tournaments'
const TOURNAMENT_DETAIL_PAGE = '/tournament'

export default {
  REGISTER_PAGE,
  LOGIN_PAGE,
  users: {
    HOME_PAGE,
    PROFILE_PAGE,
    TOURNAMENTS_PAGE,
    TOURNAMENT_DETAIL_PAGE
  },
  organizers: {
    LOGIN: '/organizer/login',
    HOMEPAGE: '/organizer',
    MY_PROFILE: '/organizer/my-profile',
    CREATE_TOURNAMENT: '/organizer/create-tournament',
    TOURNAMENT_DETAIL: '/organizer/tournament/:id',
    TOURNAMENTS: '/organizer/tournaments',
    PENDING_REQUEST: '/organizer/tournaments/pending-request',
    FINISHED_TOURNAMENT: '/organizer/tournaments/finished',
    HAPPENING_TOURNAMENT: '/organizer/tournaments/happening',
    HAPPENING_MATCH: '/organizer/tournaments/happening-match',
    MANUAL: '/organizer/manual'
  },
  admins: {
    LOGIN: '/admins/login',
    ORGANIZERS: '/admins/organizers',
    ORGANIZER_CREATE: '/admins/organizer-create',
    ORGANIZER_DETAIL: '/admins/organizer-detail/:id',
    REFEREES: '/admins/referees',
    REFEREE_CREATE: '/admins/referee-create',
    REFEREE_DETAIL: '/admins/referee-detail/:id',
    PITCHES: '/admins/pitches',
    PITCH_CREATE: '/admins/pitch-create',
    PITCH_DETAIL: '/admins/pitch-detail/:id',
    CATEGORIES: '/admins/categories',
    CATEGORY_CREATE: '/admins/category-create',
    CATEGORY_DETAIL: '/admins/category-detail/:id',
    MANUAL: '/admins/manual'
  },
  referee: {
    LOGIN: '/referee/login',
    INVITED_MATCH: '/referee/invited-match',
    FINISHED_MATCH: '/referee/finished-match',
    HAPPENING_MATCH: '/referee/happening-match'
  }
}
