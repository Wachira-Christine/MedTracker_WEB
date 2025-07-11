"use client";
import React from "react";
import styles from "./med_dash.module.css";

const getStatus = (med) => {
    if (med.taken) return "taken";
    const [hour, minute] = med.time.split(":").map(Number);
    const medTime = new Date();
    medTime.setHours(hour, minute, 0, 0);
    const now = new Date();
    const fiveMinutesAfter = new Date(medTime.getTime() + 5 * 60000);

    if (now > fiveMinutesAfter) return "missed";
    return "upcoming";
};

const getLabel = (status) => {
    if (status === "taken")  return  "✅Taken";
    if (status === "missed") return "❌Missed";
    return "⏳Upcoming";
};

export default function TodaySchedule({ medications, onMarkAsTaken }) {
    return (
        <>
            <h2 style={{marginBottom: '1.5rem', color: '#d1d5db', fontWeight: 800, fontSize: '2rem', textAlign: 'center'}}>Today's Medications</h2>
            <div style={{width: '100%', maxWidth: 900, margin: '0 auto'}}>
                {medications.length === 0 ? (
                    <p style={{color: '#8ca0b3', fontSize: '1.15rem', textAlign: 'center'}}>No medication scheduled for today.</p>
                ) : (
                    <div className={styles.medicationGrid}>
                        {medications.map((med, index) => {
                            const status = getStatus(med);
                            return (
                                <div className={`${styles.medCard} ${styles[status]}`} key={index}>
                                    <h4>{med.name}</h4>
                                    <p>
                                        <strong>Dosage:</strong> {med.dosage}
                                    </p>
                                    <p>
                                        <strong>Time:</strong> {med.time}
                                    </p>
                                    <p>
                                        <strong>Frequency:</strong> {med.frequency}
                                    </p>
                                    <p>
                                        <strong>Instructions:</strong> {med.instructions || "-"}
                                    </p>
                                    <div className={styles.medFooter}>
                                        <span className={`${styles.statusLabel} ${styles[status]}`}>
                                            {getLabel(status)}
                                        </span>
                                        {status === "upcoming" && !med.taken && onMarkAsTaken && (
                                            <button
                                                className={styles.markTakenBtn}
                                                onClick={() => onMarkAsTaken(index)}
                                            >
                                                Mark as Taken
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}