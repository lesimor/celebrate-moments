import type { WeddingData } from '../types/wedding'

export const weddingData: WeddingData = {
  couple: {
    groom: {
      name: "훈희",
      fullName: "이훈희",
      father: "이재성",
      mother: "김미영",
      order: "장남"
    },
    bride: {
      name: "유리",
      fullName: "박유리",
      father: "박상준",
      mother: "최은정",
      order: "장녀"
    }
  },
  wedding: {
    date: "2025-03-15",
    time: "14:30",
    venue: {
      name: "더베뉴G",
      hall: "그랜드볼룸",
      address: "서울특별시 강남구 테헤란로 87길 36",
      phone: "02-1234-5678",
      mapUrl: "https://map.naver.com",
      coordinates: {
        lat: 37.5080,
        lng: 127.0352
      }
    }
  },
  message: {
    title: "우리 결혼합니다",
    content: `봄날의 따스한 햇살처럼
서로를 비추며 살아가겠습니다.
귀한 걸음으로 축복해 주시면
큰 기쁨이 되겠습니다.`
  },
  gallery: {
    mainImage: "/images/main.jpg",
    images: [
      "/images/gallery-1.jpg",
      "/images/gallery-2.jpg",
      "/images/gallery-3.jpg",
      "/images/gallery-4.jpg",
      "/images/gallery-5.jpg",
      "/images/gallery-6.jpg"
    ]
  },
  rsvp: {
    enabled: true,
    deadline: "2025-03-01",
    formUrl: "https://forms.google.com/example"
  },
  bank: {
    groom: [
      {
        bank: "국민은행",
        account: "123-456-789012",
        holder: "이훈희"
      },
      {
        bank: "신한은행",
        account: "110-123-456789",
        holder: "이재성"
      }
    ],
    bride: [
      {
        bank: "하나은행",
        account: "987-654-321098",
        holder: "박유리"
      },
      {
        bank: "우리은행",
        account: "1002-123-456789",
        holder: "박상준"
      }
    ]
  },
  contact: {
    groom: [
      {
        name: "이훈희",
        relation: "신랑",
        phone: "010-1234-5678"
      },
      {
        name: "이재성",
        relation: "신랑 아버지",
        phone: "010-2345-6789"
      },
      {
        name: "김미영",
        relation: "신랑 어머니",
        phone: "010-3456-7890"
      }
    ],
    bride: [
      {
        name: "박유리",
        relation: "신부",
        phone: "010-9876-5432"
      },
      {
        name: "박상준",
        relation: "신부 아버지",
        phone: "010-8765-4321"
      },
      {
        name: "최은정",
        relation: "신부 어머니",
        phone: "010-7654-3210"
      }
    ]
  }
}