export type ButtonType = {
    label: string;
    type?: 'submit' | 'close' | 'cancel' | 'confirm';
    disabled?: boolean;
    onClick?: () => void;
};
