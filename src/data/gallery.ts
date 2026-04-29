export type GalleryItem =
  | {
      type: 'image'
      src: string
      alt: string
      title?: string
      location?: string
      date?: string
    }
  | {
      type: 'video'
      src: string
      title: string
      poster?: string
      location?: string
      date?: string
    }

export const galleryItems: GalleryItem[] = [
  {
    type: 'image',
    src: '/gallery/gallery-01.png',
    alt: 'Gallery image 01',
  },
  {
    type: 'image',
    src: '/gallery/gallery-02.png',
    alt: 'Gallery image 02',
  },
  {
    type: 'image',
    src: '/gallery/gallery-03.png',
    alt: 'Gallery image 03',
  },
  {
    type: 'image',
    src: '/gallery/gallery-04.png',
    alt: 'Gallery image 04',
  },
  {
    type: 'image',
    src: '/gallery/gallery-05.png',
    alt: 'Gallery image 05',
  },
  {
    type: 'image',
    src: '/gallery/gallery-06.png',
    alt: 'Gallery image 06',
  },
  {
    type: 'image',
    src: '/gallery/gallery-07.png',
    alt: 'Gallery image 07',
  },
  {
    type: 'image',
    src: '/gallery/gallery-08.png',
    alt: 'Gallery image 08',
  },
  {
    type: 'image',
    src: '/gallery/gallery-09.png',
    alt: 'Gallery image 09',
  },
  {
    type: 'image',
    src: '/gallery/gallery-10.png',
    alt: 'Gallery image 10',
  },
  {
    type: 'image',
    src: '/gallery/gallery-11.png',
    alt: 'Gallery image 11',
  },
  {
    type: 'image',
    src: '/gallery/gallery-12.png',
    alt: 'Gallery image 12',
  },
  {
    type: 'image',
    src: '/gallery/gallery-13.png',
    alt: 'Gallery image 13',
  },
  {
    type: 'image',
    src: '/gallery/gallery-14.png',
    alt: 'Gallery image 14',
  },
  {
    type: 'image',
    src: '/gallery/gallery-15.png',
    alt: 'Gallery image 15',
  },
  {
    type: 'image',
    src: '/gallery/gallery-16.png',
    alt: 'Gallery image 16',
  },
  {
    type: 'image',
    src: '/gallery/gallery-17.png',
    alt: 'Gallery image 17',
  },
]
