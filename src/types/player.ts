export interface PreviewState {
    position: { x: number; y: number } | null;
    time: number;
    isVisible: boolean;
}

export interface ControlButtonProps {
    onClick: () => void;
    icon: string;
    className: string;
}