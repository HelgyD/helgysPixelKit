import { CSSProperties, ReactElement } from 'react';
import { BASE_COLORS } from '../../helpers/common';
import { adjustShade } from '../../helpers/colorConversion';
import '../papers.css';

export const Paper: React.FC<{
  style?: CSSProperties;
  title?: string | ReactElement;
  children?: ReactElement;
  paperColor?: string;
  textColor?: string;
  borderColor?: string;
}> = ({
  style,
  children,
  title = '',
  paperColor = BASE_COLORS.paperColor,
  textColor = BASE_COLORS.textColor,
  borderColor = BASE_COLORS.borderColor,
}) => {
  const paperShade = adjustShade(paperColor, -0.15, -0.5);
  console.log(paperShade);
  const cssVariables = {
    '--border': borderColor,
    '--font-family': 'Pixelify Sans, sans-serif',
    '--text-color': textColor,
    '--paper-color': paperColor,
    '--paper-shade': paperShade,
    ...style,
  } as React.CSSProperties;
  return (
    <div style={cssVariables}>
      <div className='paperTitle'>{title}</div>
      <div className='paper'>{children}</div>
    </div>
  );
};
