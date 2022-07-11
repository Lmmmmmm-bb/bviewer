import {
  FC,
  PropsWithChildren,
  HTMLAttributes,
  useRef,
  MouseEvent
} from 'react';

interface IHoverDelayProps extends HTMLAttributes<HTMLDivElement> {
  delay: number;
  onMouseHover: (e: MouseEvent) => void;
}

const HoverDelay: FC<PropsWithChildren<IHoverDelayProps>> = (props) => {
  const { delay, children, onMouseHover, ...rest } = props;
  const delayTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    rest.onMouseEnter && rest.onMouseEnter(e);
    delayTimer.current = setTimeout(() => {
      onMouseHover(e);
    }, delay);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    rest.onMouseLeave && rest.onMouseLeave(e);
    delayTimer.current && clearTimeout(delayTimer.current);
  };

  return (
    <div
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default HoverDelay;
