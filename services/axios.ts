import axios from 'axios'
// import dynamic from 'next/dynamic'

// const axios = dynamic(() => import('axios'), { ssr: false })

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/',
})
