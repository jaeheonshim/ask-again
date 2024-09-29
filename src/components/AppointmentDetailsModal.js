import { updateAppointmentDoctorNotes } from "@/actions/updateAppointmentDoctorNotes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AppointmentDetailsModal({selectedAppointment, handleClose, editable}) {
    const [doctorNotes, setDoctorNotes] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && modalRef.current) {
            const bootstrap = require('bootstrap');
            const modalElement = modalRef.current;
            const modalInstance = new bootstrap.Modal(modalElement, {
                backdrop: 'static',
                keyboard: false,
            });

            if (selectedAppointment) {
                modalInstance.show();
                setDoctorNotes(selectedAppointment.doctorNotes);
            } else {
                modalInstance.hide();
            }

            return () => {
                modalInstance.hide();
            };
        }
    }, [selectedAppointment]);

    const handleCloseModal = () => {
        handleClose();
    };

    const handleCloseModalAndSave = () => {
        updateAppointmentDoctorNotes(selectedAppointment._id, doctorNotes);
        handleClose();
    };

    return <div className="modal" id="appointmentModal" tabIndex={-1} aria-labelledby="appointmentModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" id="appointmentModalLabel">
                        Appointment Details
                    </h4>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                    <div>
                        <strong>Patient Full Name:</strong> {selectedAppointment.patient.fullName}
                    </div>
                    <div>
                        <strong>Age:</strong> {selectedAppointment.patient.age}
                    </div>
                    <div>
                        <strong>Gender:</strong> {selectedAppointment.patient.gender}
                    </div>
                    <hr />
                    <div>
                        <strong>Doctor:</strong> {selectedAppointment.doctor.firstName} {selectedAppointment.doctor.lastName}
                    </div>
                    <div>
                        <strong>Speciality:</strong> {selectedAppointment.doctor.speciality}
                    </div>
                    <hr />
                    <div>
                        <strong>Start:</strong> {new Date(selectedAppointment.start).toLocaleString()}
                    </div>
                    <div>
                        <strong>End:</strong> {new Date(selectedAppointment.end).toLocaleString()}
                    </div>
                    <div>
                        <strong>Duration:</strong> {((new Date(selectedAppointment.end) - new Date(selectedAppointment.start)) / (1000 * 60 * 60)).toFixed(2)} hours
                    </div>
                    <div>
                        <strong>Total Cost:</strong> ${(selectedAppointment.costPerHour * ((new Date(selectedAppointment.end) - new Date(selectedAppointment.start)) / (1000 * 60 * 60))).toFixed(2)}
                    </div>
                    <hr />
                    <div>
                        <strong>Chat Summary:</strong> {selectedAppointment.chatSummary}
                    </div>
                    <Link href={`/patient/chat_history/${selectedAppointment._id}`} >View patient chat logs</Link>
                    <hr />
                    <div>
                        <strong>Doctor Notes:</strong>
                        <textarea className="form-control" readOnly={!editable} value={doctorNotes} onChange={(e) => {
                            setDoctorNotes(e.target.value);
                        }}></textarea>
                    </div>
                    <hr />
                    <a href="" className="btn btn-primary">Join Meeting</a>
                </div>
                <div className="modal-footer">
                    {editable ?
                        <button type="button" className="btn btn-primary" onClick={handleCloseModalAndSave}>Save and Close</button> :
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                    }
                </div>
            </div>
        </div>
    </div>
}