import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { WeddingForm } from './WeddingForm';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const renderWeddingForm = () => {
  return render(
    <BrowserRouter>
      <WeddingForm />
    </BrowserRouter>
  );
};

describe('WeddingForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with initial step', () => {
    renderWeddingForm();
    
    expect(screen.getByText('청첩장 만들기')).toBeInTheDocument();
    expect(screen.getByText('템플릿 선택')).toBeInTheDocument();
  });

  it('displays template options in step 1', () => {
    renderWeddingForm();
    
    expect(screen.getByText('클래식')).toBeInTheDocument();
    expect(screen.getByText('모던')).toBeInTheDocument();
    expect(screen.getByText('미니멀')).toBeInTheDocument();
    expect(screen.getByText('일러스트')).toBeInTheDocument();
  });

  it('navigates to next step when clicking next button', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);
    
    expect(screen.getByText('신랑 정보')).toBeInTheDocument();
  });

  it('navigates to previous step when clicking prev button', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Go to step 2
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);
    
    // Go back to step 1
    const prevButton = screen.getByRole('button', { name: /이전/i });
    await user.click(prevButton);
    
    expect(screen.getByText('템플릿 선택')).toBeInTheDocument();
  });

  it('disables prev button on first step', () => {
    renderWeddingForm();
    
    const prevButton = screen.getByRole('button', { name: /이전/i });
    expect(prevButton).toBeDisabled();
  });

  it('shows groom information form in step 2', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to step 2
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);
    
    expect(screen.getByText('신랑 정보')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 훈희')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 이훈희')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 이재성')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 김미영')).toBeInTheDocument();
  });

  it('shows bride information form in step 3', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to step 3
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);
    await user.click(nextButton);
    
    expect(screen.getByText('신부 정보')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 유리')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 박유리')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 박상준')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 최은정')).toBeInTheDocument();
  });

  it('shows wedding information form in step 4', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to step 4
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(nextButton);
    
    expect(screen.getByText('결혼식 정보')).toBeInTheDocument();
    expect(screen.getByLabelText('날짜')).toBeInTheDocument();
    expect(screen.getByLabelText('시간')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 더베뉴G')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 그랜드볼룸')).toBeInTheDocument();
  });

  it('shows message form in step 5', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to step 5
    const nextButton = screen.getByRole('button', { name: /다음/i });
    for (let i = 0; i < 4; i++) {
      await user.click(nextButton);
    }
    
    expect(screen.getByText('인사말')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('예: 우리 결혼합니다')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('인사말을 입력하세요')).toBeInTheDocument();
    expect(screen.getByText('참석 여부 확인 기능 사용')).toBeInTheDocument();
  });

  it('shows gallery upload form in step 6', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to step 6
    const nextButton = screen.getByRole('button', { name: /다음/i });
    for (let i = 0; i < 5; i++) {
      await user.click(nextButton);
    }
    
    expect(screen.getByText('갤러리')).toBeInTheDocument();
    expect(screen.getByText('메인 이미지')).toBeInTheDocument();
    expect(screen.getByText('갤러리 이미지 (최대 10장)')).toBeInTheDocument();
  });

  it('shows save button on last step', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to last step
    const nextButton = screen.getByRole('button', { name: /다음/i });
    for (let i = 0; i < 5; i++) {
      await user.click(nextButton);
    }
    
    expect(screen.getByRole('button', { name: /저장하기/i })).toBeInTheDocument();
  });

  it('shows step indicator with correct active step', () => {
    const { container } = renderWeddingForm();
    
    const stepDots = container.querySelectorAll('.step-dot');
    expect(stepDots).toHaveLength(6);
    expect(stepDots[0]).toHaveClass('active');
    expect(stepDots[1]).not.toHaveClass('active');
  });

  it('updates input values when typing', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to step 2
    const nextButton = screen.getByRole('button', { name: /다음/i });
    await user.click(nextButton);
    
    const groomNameInput = screen.getByPlaceholderText('예: 훈희');
    await user.type(groomNameInput, '철수');
    
    expect(groomNameInput).toHaveValue('철수');
  });

  it('shows preview button', () => {
    renderWeddingForm();
    
    expect(screen.getByRole('button', { name: /미리보기/i })).toBeInTheDocument();
  });

  it('navigates to preview when clicking preview button', async () => {
    const user = userEvent.setup();
    renderWeddingForm();
    
    const previewButton = screen.getByRole('button', { name: /미리보기/i });
    await user.click(previewButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/wedding/preview');
  });

  it('alerts and navigates to my-events when saving', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const user = userEvent.setup();
    renderWeddingForm();
    
    // Navigate to last step
    const nextButton = screen.getByRole('button', { name: /다음/i });
    for (let i = 0; i < 5; i++) {
      await user.click(nextButton);
    }
    
    const saveButton = screen.getByRole('button', { name: /저장하기/i });
    await user.click(saveButton);
    
    expect(alertSpy).toHaveBeenCalledWith('청첩장이 저장되었습니다!');
    expect(mockNavigate).toHaveBeenCalledWith('/my-events');
    
    alertSpy.mockRestore();
  });
});