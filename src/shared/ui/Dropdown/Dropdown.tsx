'use client';

import { FC, ReactNode, useState, cloneElement, isValidElement } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  useHover,
  safePolygon,
} from '@floating-ui/react';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  openOnHover?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
}

export const Dropdown: FC<DropdownProps> = ({ 
  trigger, 
  children, 
  className, 
  openOnHover = false,
  placement = 'bottom-start'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
    placement,
  });

  const click = useClick(context, { enabled: !openOnHover });
  const hover = useHover(context, {
    enabled: openOnHover,
    handleClose: safePolygon(),
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`${styles.trigger} ${className || ''}`}
      >
        {trigger}
      </div>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={styles.content}
          >
            {children}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
