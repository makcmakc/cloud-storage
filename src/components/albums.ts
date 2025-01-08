export interface Album {
  name: string
  artist?: string
  cover?: string
  url?: string
  type?: string
}

export const madeForYouAlbums: Album[] = [
  {
    name: 'Made in Japan',
    artist: 'Ysa Ferrer',
    url: `${import.meta.env.VITE_API_ENDPOINT}/uploads/Ysa_Ferrer_-_Made_in_Japan_48275178.mp3`,
    cover: 'https://m.media-amazon.com/images/I/81GPO64o5PL._UF894,1000_QL80_.jpg',
    type: 'audio'
  },
  {
    name: 'Despair',
    artist: 'TOHA',
    url: `${import.meta.env.VITE_API_ENDPOINT}/uploads/despair.mp3`,
    cover: '',
    type: 'audio'
  },  
  {
    name: 'L Theme',
    artist: 'Gabriele Motta',
    cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkysFYX_J8EkYbcziVVTTrR-HqeO0iCVSDOg&s',
    url: `${import.meta.env.VITE_API_ENDPOINT}/uploads/Gabriele_Motta_-_Ls_Theme.mp3`,
    type: 'audio'
  },
  {
    name: 'Stateful Symphony',
    artist: 'Beth Binary',
    cover:
      'https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80',
  },
  {
    name: 'Async Awakenings',
    artist: 'Nina Netcode',
    cover:
      'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
  },
  {
    name: 'The Art of Reusability',
    artist: 'Lena Logic',
    cover:
      'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80',
  },
]