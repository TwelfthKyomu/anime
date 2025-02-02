'use client';

import { FC, ReactNode } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import styles from './Tabs.module.scss';

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export const Tabs: FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={`${styles.root} ${className || ''}`}
    >
      {children}
    </TabsPrimitive.Root>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: FC<TabsListProps> = ({ children, className }) => {
  return (
    <TabsPrimitive.List className={`${styles.list} ${className || ''}`}>
      {children}
    </TabsPrimitive.List>
  );
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger: FC<TabsTriggerProps> = ({ value, children, className }) => {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={`${styles.trigger} ${className || ''}`}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent: FC<TabsContentProps> = ({ value, children, className }) => {
  return (
    <TabsPrimitive.Content
      value={value}
      className={`${styles.content} ${className || ''}`}
    >
      {children}
    </TabsPrimitive.Content>
  );
};
