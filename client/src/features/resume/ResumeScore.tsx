
interface ResumeScoreProps {
    score: number;
}

export const ResumeScore = ({ score }: ResumeScoreProps) => {
    if (score === undefined || score === null) return null;

    let bgColor = "";
    let textColor = "#fff";

    if (score <= 0.49) {
        bgColor = "linear-gradient(135deg, #ff0000, #cc0000)";; // red-ish gradient
    } else if (score > 0.5 && score  <= 0.75) {
        bgColor = "linear-gradient(135deg, #f2994a, #f2c94c)"; // orange gradient
    } else {
        bgColor = "linear-gradient(135deg, #27ae60, #6fcf97)"; // green gradient
    }

    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.75rem 1.5rem",
        borderRadius: "1.25rem", // pill shape
        fontWeight: "bold",
        fontSize: "1rem",
        color: textColor,
        background: bgColor,
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease",
        cursor: "default" as const,
    };

    return (
        <div style={style}>
            Score {(score * 100).toFixed(2)}
        </div>
    );
};


// interface ResumeScore {
//     score: number;
// }


// export const ResumeScore = ({ score }: ResumeScore) => {


//     return (
//         <div style={{ display: score ? "flex" : "none" }}>
//             Score { (score* 100).toFixed(2) }
//         </div>
//     )
// }