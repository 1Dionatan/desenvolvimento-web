import "../styles/buttons.css"
import type React from "react"

interface IButtonProps {
    text: string;
    secondary?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ text, secondary, onClick }: IButtonProps) {
    return (
        <button className={secondary ? "btn-secondary" : "btn-primary"} onClick={onClick}>
            {text}
        </button>
    )
}