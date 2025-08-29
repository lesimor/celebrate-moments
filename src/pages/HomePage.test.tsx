import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const renderHomePage = () => {
  return render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
};

describe('HomePage', () => {
  it('renders the main title and subtitle', () => {
    renderHomePage();
    
    expect(screen.getByText('마음전하기')).toBeInTheDocument();
    expect(screen.getByText('인생의 중요한 순간을 아름답고 편리하게 전달하세요')).toBeInTheDocument();
  });

  it('displays both wedding and funeral service cards', () => {
    renderHomePage();
    
    expect(screen.getByText('청첩장')).toBeInTheDocument();
    expect(screen.getByText('부고장')).toBeInTheDocument();
  });

  it('shows wedding card features', () => {
    renderHomePage();
    
    expect(screen.getByText('다양한 템플릿 제공')).toBeInTheDocument();
    expect(screen.getByText('갤러리 및 지도 연동')).toBeInTheDocument();
    expect(screen.getByText('참석 여부 확인')).toBeInTheDocument();
    expect(screen.getByText('축하 메시지 게시판')).toBeInTheDocument();
  });

  it('shows funeral card features', () => {
    renderHomePage();
    
    expect(screen.getByText('격식있는 템플릿')).toBeInTheDocument();
    expect(screen.getByText('발인 일시 및 장소')).toBeInTheDocument();
    expect(screen.getByText('조문 안내')).toBeInTheDocument();
    expect(screen.getByText('추모 메시지')).toBeInTheDocument();
  });

  it('displays service features section', () => {
    renderHomePage();
    
    expect(screen.getByText('서비스 특징')).toBeInTheDocument();
    expect(screen.getByText('5분 완성')).toBeInTheDocument();
    expect(screen.getByText('모바일 최적화')).toBeInTheDocument();
    expect(screen.getByText('개인정보 보호')).toBeInTheDocument();
    expect(screen.getByText('커스터마이징')).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    renderHomePage();
    
    const weddingLink = screen.getByRole('link', { name: /청첩장 만들기/i });
    const funeralLink = screen.getByRole('link', { name: /부고장 만들기/i });
    const loginLink = screen.getByRole('link', { name: /로그인/i });
    const myEventsLink = screen.getByRole('link', { name: /내 초대장 관리/i });
    
    expect(weddingLink).toHaveAttribute('href', '/wedding/new');
    expect(funeralLink).toHaveAttribute('href', '/funeral/new');
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(myEventsLink).toHaveAttribute('href', '/my-events');
  });

  it('renders service card buttons', () => {
    renderHomePage();
    
    const weddingButton = screen.getAllByText('청첩장 만들기')[0];
    const funeralButton = screen.getAllByText('부고장 만들기')[0];
    
    expect(weddingButton).toBeInTheDocument();
    expect(funeralButton).toBeInTheDocument();
  });
});