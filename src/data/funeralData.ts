import type { FuneralEvent } from '../types/event';

export const funeralData: FuneralEvent = {
  type: 'funeral',
  id: 'funeral-001',
  url: 'funeral-001',
  template: {
    id: 'traditional-1',
    name: '전통 부고장',
    style: 'traditional',
    colors: {
      primary: '#2c3e50',
      secondary: '#95a5a6',
      text: '#2c2c2c',
      background: '#f8f9fa'
    },
    fonts: {
      heading: 'Noto Serif KR',
      body: 'Noto Sans KR'
    },
    isPremium: false
  },
  deceased: {
    name: '홍길동',
    birthDate: '1950-03-15',
    deathDate: '2025-01-15',
    age: 74,
    religion: 'none'
  },
  chiefMourner: {
    name: '홍철수',
    relation: '장남',
    phone: '010-1234-5678'
  },
  mourners: [
    {
      name: '홍영희',
      relation: '장녀',
      phone: '010-2345-6789'
    },
    {
      name: '홍민수',
      relation: '차남',
      phone: '010-3456-7890'
    }
  ],
  funeral: {
    mortuary: {
      name: '서울대학교병원 장례식장',
      hall: '특1호실',
      address: '서울특별시 종로구 대학로 101',
      phone: '02-1234-5678',
      coordinates: {
        lat: 37.5796,
        lng: 127.0062
      }
    },
    funeralDate: '2025-01-18',
    funeralTime: '08:00',
    burialDate: '2025-01-18',
    burialTime: '10:00',
    burialLocation: '서울 추모공원'
  },
  message: {
    title: '삼가 고인의 명복을 빕니다',
    content: `평소 고인과 친분이 있으신 여러분께 
비보를 전해드리게 되어 황송한 마음을 금할 길 없습니다.

고인의 명복을 빌어주시고
유족들에게 따뜻한 위로의 말씀 전해주시면 
큰 힘이 되겠습니다.`
  },
  bank: [
    {
      bank: '국민은행',
      account: '123-456-789012',
      holder: '홍철수'
    },
    {
      bank: '신한은행',
      account: '110-123-456789',
      holder: '홍영희'
    }
  ],
  condolences: [],
  statistics: {
    views: 0,
    shares: 0,
    condolenceCount: 0
  }
};