import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShareModal } from './ShareModal';

// Mock QRCode
vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mockQRCode')
  }
}));

// Mock react-share
vi.mock('react-share', () => ({
  FacebookShareButton: ({ children }: any) => <div>{children}</div>,
  TwitterShareButton: ({ children }: any) => <div>{children}</div>,
  WhatsappShareButton: ({ children }: any) => <div>{children}</div>,
  LineShareButton: ({ children }: any) => <div>{children}</div>,
  FacebookIcon: () => <div>Facebook Icon</div>,
  TwitterIcon: () => <div>Twitter Icon</div>,
  WhatsappIcon: () => <div>Whatsapp Icon</div>,
  LineIcon: () => <div>Line Icon</div>,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ShareModal', () => {
  const mockOnClose = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: '이훈희 ♥ 박유리',
    url: '/wedding/001',
    type: 'wedding' as const,
  };

  it('renders modal when isOpen is true', () => {
    render(<ShareModal {...defaultProps} />);
    
    expect(screen.getByText('공유하기')).toBeInTheDocument();
    expect(screen.getByText('QR 코드')).toBeInTheDocument();
    expect(screen.getByText('링크 복사')).toBeInTheDocument();
    expect(screen.getByText('SNS 공유')).toBeInTheDocument();
    expect(screen.getByText('문자 메시지')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<ShareModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('공유하기')).not.toBeInTheDocument();
  });

  it('displays QR code image', async () => {
    render(<ShareModal {...defaultProps} />);
    
    await waitFor(() => {
      const qrImage = screen.getByAltText('QR Code');
      expect(qrImage).toBeInTheDocument();
      expect(qrImage).toHaveAttribute('src', 'data:image/png;base64,mockQRCode');
    });
  });

  it('copies URL when copy button is clicked', async () => {
    const user = userEvent.setup();
    render(<ShareModal {...defaultProps} />);
    
    const copyButtons = screen.getAllByRole('button', { name: /복사/i });
    const urlCopyButton = copyButtons[0]; // First copy button is for URL
    await user.click(urlCopyButton);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('/wedding/001')
    );
    
    await waitFor(() => {
      expect(screen.getByText('복사됨!')).toBeInTheDocument();
    });
  });

  it('shows correct message template for wedding', () => {
    render(<ShareModal {...defaultProps} />);
    
    const smsTemplate = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(smsTemplate.value).toContain('💌 결혼식 초대');
    expect(smsTemplate.value).toContain('이훈희 ♥ 박유리');
  });

  it('shows correct message template for funeral', () => {
    render(<ShareModal {...defaultProps} type="funeral" title="故 홍길동" />);
    
    const smsTemplate = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(smsTemplate.value).toContain('🕊️ 부고 안내');
    expect(smsTemplate.value).toContain('故 홍길동');
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ShareModal {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: '' }); // X button
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<ShareModal {...defaultProps} />);
    
    const overlay = container.querySelector('.share-modal-overlay');
    if (overlay) {
      await user.click(overlay);
    }
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not close when modal content is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<ShareModal {...defaultProps} />);
    
    const modalContent = container.querySelector('.share-modal');
    if (modalContent) {
      await user.click(modalContent);
    }
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders social share buttons', () => {
    render(<ShareModal {...defaultProps} />);
    
    expect(screen.getByText('카카오톡')).toBeInTheDocument();
    expect(screen.getByText('페이스북')).toBeInTheDocument();
    expect(screen.getByText('트위터')).toBeInTheDocument();
    expect(screen.getByText('왓츠앱')).toBeInTheDocument();
    expect(screen.getByText('라인')).toBeInTheDocument();
  });

  it('shows download QR button', () => {
    render(<ShareModal {...defaultProps} />);
    
    const downloadButton = screen.getByRole('button', { name: /QR 코드 저장/i });
    expect(downloadButton).toBeInTheDocument();
  });

  it('displays the full URL in input field', () => {
    render(<ShareModal {...defaultProps} />);
    
    const urlInput = screen.getByDisplayValue(/\/wedding\/001/i) as HTMLInputElement;
    expect(urlInput).toBeInTheDocument();
    expect(urlInput.readOnly).toBe(true);
  });
});