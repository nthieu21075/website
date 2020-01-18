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

export const residences = [
  {
    value: 'Thành phố Hồ Chí Minh',
    label: 'Thành phố Hồ Chí Minh',
    children: [
      {
        value: 'Quận 1',
        label: 'Quận 1',
        children: [
          {
            label: 'Phường Tân Định',
            value: 'Phường Tân Định'
          },
          {
            label: 'Phường Đa Kao',
            value: 'Phường Đa Kao'
          },
          {
            label: 'Phường Bến Nghé',
            value: 'Phường Bến Nghé'
          },
          {
            label: 'Phường Bến Thành',
            value: 'Phường Bến Thành'
          },
          {
            label: 'Phường Nguyễn Thái Bình',
            value: 'Phường Nguyễn Thái Bình'
          },
          {
            label: 'Phường Phạm Ngũ Lão',
            value: 'Phường Phạm Ngũ Lão'
          },
          {
            label: 'Phường Cầu Ông Lãnh',
            value: 'Phường Cầu Ông Lãnh'
          },
          {
            label: 'Phường Cô Giang',
            value: 'Phường Cô Giang'
          },
          {
            label: 'Phường Nguyễn Cư Trinh',
            value: 'Phường Nguyễn Cư Trinh'
          },
          {
            label: 'Phường Cầu Kho',
            value: 'Phường Cầu Kho'
          }
        ]
      },
      {
        value: 'Quận 2',
        label: 'Quận 2',
        children: [
          {
            label: 'Phường Thảo Điền',
            value: 'Phường Thảo Điền'
          },
          {
            label: 'Phường An Phú',
            value: 'Phường An Phú'
          },
          {
            label: 'Phường Bình An',
            value: 'Phường Bình An'
          },
          {
            label: 'Phường Bình Trưng Đông',
            value: 'Phường Bình Trưng Đông'
          },
          {
            label: 'Phường Bình Trưng Tây',
            value: 'Phường Bình Trưng Tây'
          },
          {
            label: 'Phường Bình Khánh',
            value: 'Phường Bình Khánh'
          },
          {
            label: 'Phường An Khánh',
            value: 'Phường An Khánh'
          },
          {
            label: 'Phường Cát Lái',
            value: 'Phường Cát Lái'
          },
          {
            label: 'Phường Thạnh Mỹ Lợi',
            value: 'Phường Thạnh Mỹ Lợi'
          },
          {
            label: 'Phường An Lợi Đông',
            value: 'Phường An Lợi Đông'
          },
          {
            label: 'Phường Thủ Thiêm',
            value: 'Phường Thủ Thiêm'
          }
        ]
      },
      {
        value: 'Quận 3',
        label: 'Quận 3',
        children: [
          {
            label: 'Phường 08',
            value: 'Phường 08'
          },
          {
            label: 'Phường 07',
            value: 'Phường 07'
          },
          {
            label: 'Phường 14',
            value: 'Phường 14'
          },
          {
            label: 'Phường 12',
            value: 'Phường 12'
          },
          {
            label: 'Phường 11',
            value: 'Phường 11'
          },
          {
            label: 'Phường 13',
            value: 'Phường 13'
          },
          {
            label: 'Phường 06',
            value: 'Phường 06'
          },
          {
            label: 'Phường 09',
            value: 'Phường 09'
          },
          {
            label: 'Phường 10',
            value: 'Phường 10'
          },
          {
            label: 'Phường 04',
            value: 'Phường 04'
          },
          {
            label: 'Phường 05',
            value: 'Phường 05'
          },
          {
            label: 'Phường 03',
            value: 'Phường 03'
          },
          {
            label: 'Phường 02',
            value: 'Phường 02'
          },
          {
            label: 'Phường 01',
            value: 'Phường 01'
          },
        ]
      },
    ],
  }
]