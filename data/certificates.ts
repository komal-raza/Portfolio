export type Certificate = {
  title: string
  issuer: string
  date: string
  credentialUrl: string
  fileUrl?: string
  image?: string
}

export const certificates: Certificate[] = [
  {
    title: 'Advanced React',
    issuer: 'Meta · Coursera',
    date: 'Mar 30, 2023',
    credentialUrl: 'https://coursera.org/verify/BPLDMC5PUPHP',
    fileUrl: '/certificates/advancereact.pdf',
  },
  {
    title: 'Developing Back-End Apps with Node.js and Express',
    issuer: 'IBM · Coursera',
    date: 'Mar 12, 2023',
    credentialUrl: 'https://coursera.org/verify/4CK4CAKE56BX',
    fileUrl: '/certificates/backend.pdf',
  },
  {
    title: 'Programming with JavaScript',
    issuer: 'Meta · Coursera',
    date: 'Mar 4, 2023',
    credentialUrl: 'https://coursera.org/verify/59QXJMBTNT8F',
    fileUrl: '/certificates/javascript.pdf',
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'Meta · Coursera',
    date: 'Feb 28, 2023',
    credentialUrl: 'https://coursera.org/verify/5MEK7DNNEBSB',
    fileUrl: '/certificates/frontend.pdf',
  },
]
