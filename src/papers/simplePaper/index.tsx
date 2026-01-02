import { CSSProperties } from 'react';
import { BASE_COLORS } from '../../helpers/common';
import '../papers.css';

export const SimplePaper: React.FC<{
  style?: CSSProperties;
  children?: React.ReactNode;
}> = ({ style, children }) => {
  const cssVariables = {
    '--font-family': 'Pixelify Sans, sans-serif',
    '--text-color': BASE_COLORS.textColor,
    '--paper-color': BASE_COLORS.paperColor,
    '--border': BASE_COLORS.borderColor,
    borderTop: ' var(--border) 4px solid',
    ...style,
  } as React.CSSProperties;
  return (
    <div className='paper' style={cssVariables}>
      {children}
    </div>
  );
};
