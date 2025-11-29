import { ReactElement } from 'react';
import './colorButton.css';
import { adjustShade } from '../../helpers/colorConversion';
import type { CSSProperties } from 'react';
const BASE_COLORS = {
  primary: '#4faa85',
  basePrimary: '#798186',
  textColor: '#efcfa5',
  borderColor: '#222034',
};
export const ColorButton: React.FC<{
  onClick?(): void;
  children?: ReactElement | string;
  disabled?: boolean;
  style?: CSSProperties;
  primary?: string;
  basePrimary?: string;
  textColor?: string;
  borderColor?: string;
}> = ({
  onClick,
  children = 'Color Button',
  style,
  disabled = false,
  primary = BASE_COLORS.primary,
  basePrimary = BASE_COLORS.basePrimary,
  textColor = BASE_COLORS.textColor,
  borderColor = BASE_COLORS.borderColor,
}) => {
  const buttonPrimary = primary;
  const buttonBright = adjustShade(buttonPrimary, 0.05);
  const buttonDark = adjustShade(buttonPrimary, -0.05);
  const buttonDisabledPrimary = adjustShade(buttonPrimary, -0.2);
  const buttonDisabledBright = adjustShade(buttonPrimary, -0.175);
  const buttonDisabledDark = adjustShade(buttonPrimary, -0.225);
  const textColorDisabled = adjustShade(textColor, -0.4);
  const baseDark = adjustShade(basePrimary, -0.05);
  const cssVariables = {
    '--button-primary': buttonPrimary,
    '--button-primary-bright': buttonBright,
    '--button-primary-dark': buttonDark,
    '--button-primary-disabled': buttonDisabledPrimary,
    '--button-primary-disabled-bright': buttonDisabledBright,
    '--button-primary-disabled-dark': buttonDisabledDark,
    '--button-base-dark': baseDark,
    '--button-base-primary': basePrimary,
    '--text-color': textColor,
    '--text-color-disabled': textColorDisabled,
    '--border': borderColor,
    ...style,
  } as React.CSSProperties;
  return (
    <div className='pixelButton' style={cssVariables}>
      <span className='buttonBase' style={style}>
        <span className='buttonBaseTop'>
          <span
            className={
              disabled ? 'aroundColorButton-disabled' : 'aroundColorButton'
            }
          >
            <button
              disabled={disabled}
              className='colorButton'
              onClick={onClick}
            >
              {children}
            </button>
          </span>
        </span>
      </span>
    </div>
  );
};

export default ColorButton;
