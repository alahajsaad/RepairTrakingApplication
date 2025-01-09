export interface MyInputProps {
   
    name: string;
    type?: string; // Default to 'text'
    placeholder?: string;
    label?: string;
    validation?: object;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }