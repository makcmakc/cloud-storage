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
    url: 'http://localhost:3000/files/Ysa_Ferrer_-_Made_in_Japan_48275178.mp3',
    cover: 'https://m.media-amazon.com/images/I/81GPO64o5PL._UF894,1000_QL80_.jpg',
    type: 'audio'
  },
  {
    name: 'Despair',
    artist: 'TOHA',
    url: 'http://localhost:3000/files/despair.mp3',
    cover: '',
    type: 'audio'
  },  
  {
    name: 'React Rendezvous',
    artist: 'Ethan Byte',
    cover:
      'https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80',
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