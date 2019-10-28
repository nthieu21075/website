import categoryImage from 'public/images/category.jpg'

export const tournamentData = [
  {
    src: categoryImage,
    title: 'Title 1',
    description: 'Description',
    organizer: 'Jack'
  },
  {
    src: categoryImage,
    title: 'Title 2',
    description: 'Description',
    organizer: 'Jack'
  },
  {
    src: categoryImage,
    title: 'Title 3',
    description: 'Description',
    organizer: 'Jack'
  },
  {
    src: categoryImage,
    title: 'Title 4',
    description: 'Description',
    organizer: 'Jack'
  }
]

export const tournamentCategories = [
  {
    title: 'All',
    key: 'all',
    child: []
  },
  {
    title: 'Sports',
    key: 'category:1',
    child: [
      {
        title: 'Football',
        key: 'category:1:sub:1'
      },
      {
        title: 'Basketball',
        key: 'category:1:sub:2'
      },
      {
        title: 'Volleyball',
        key: 'category:1:sub:3'
      },
    ]
  },
  {
    title: 'ESports',
    key: 'category:2',
    child: [
      {
        title: 'League of legend',
        key: 'category:2:sub:1'
      },
      {
        title: 'Dota',
        key: 'category:2:sub:2'
      },
      {
        title: 'Starcraft',
        key: 'category:2:sub:3'
      },
    ]
  },
]
