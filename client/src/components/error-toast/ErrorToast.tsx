import styles from "./ErrorToast.module.css";

interface ErrorToastProps {
    error_description: string
}

export const ErrorToast = ({error_description}: ErrorToastProps) => {

    return (
        <>
            <div id={styles.error}>Error Occurred: {error_description}</div>
        </>
    )
}