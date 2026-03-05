import styles from "./GlitchText.module.css";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <span
            className={`${styles.wrapper} ${className}`}
            data-text={text}
        >
            {text}
        </span>
    );
}
