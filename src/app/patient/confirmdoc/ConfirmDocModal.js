"use client";

import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createAppointment } from './actions';
import { useRouter } from 'next/navigation';

export default function ConfirmDocModal({ doctor }) {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && modalRef.current) {
      const bootstrap = require('bootstrap');
      const modalElement = modalRef.current;
      const modalInstance = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false,
      });

      if (isModalVisible) {
        modalInstance.show();
      } else {
        modalInstance.hide();
      }

      return () => {
        modalInstance.hide();
      };
    }
  }, [isModalVisible]);

  useEffect(() => {
    validateData();
  }, [startDate, endDate]);

  const handleShowModal = () => {
    setModalVisible(true);
    setErrorMessage('');
  };

  const handleCloseModal = () => setModalVisible(false);
  
  const validateData = () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please select both start and end date/time");
      return false;
    }

    const duration = (endDate - startDate) / (1000.0 * 60 * 60);
    if (duration > 4) {
      setErrorMessage("The appointment duration cannot exceed 4 hours.");
      return false;
    }

    if(duration < 0.5) {
      setErrorMessage("The appointment duration must be at least 30 minutes.");
      return false;
    }

    setErrorMessage();
    return true;
  }

  const handleSaveChanges = () => {
    if(!validateData()) return;
    
    const chatHistoryData = JSON.parse(localStorage.getItem("user_llm_chat_data") || "[]");
    console.log(chatHistoryData);
    createAppointment(doctor._id, startDate, endDate, chatHistoryData).then(() => {
      router.push(`/patient?newappt=${encodeURIComponent(startDate.toISOString())}`);
    });
  };

  return (
    <>
      <button
        type="button"
        style={styles.button}
        onClick={handleShowModal}
      >
        Create Booking
      </button>
  
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={styles.modalContent}>
            <div className="modal-header" style={styles.modalHeader}>
              <h5 className="modal-title" id="exampleModalLabel" style={styles.modalTitle}>
                Confirm Booking With {doctor.firstName} {doctor.lastName}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
                style={styles.closeButton}
              ></button>
            </div>
            <div className="modal-body" style={styles.modalBody}>
              <div>
                <label style={styles.label}>Select Start Date & Time </label>
                <DatePicker
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                    setEndDate(date);
                  }}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                  placeholderText="Select start date and time"
                  minDate={new Date()}
                  style={styles.datePicker}
                />
              </div>
              <div style={{ marginTop: '15px' }}>
                <label style={styles.label}>Select End Date & Time </label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                  placeholderText="Select end date and time"
                  minDate={startDate || new Date()}
                  style={styles.datePicker}
                />
              </div>
              {errorMessage && (
                <div style={{ color: 'red', marginTop: '15px' }}>
                  {errorMessage}
                </div>
              )}
  
              <hr />
              <div style={styles.totalCost}>
                Total cost: ${(endDate && startDate) ? ((endDate - startDate) / (1000 * 60 * 60) * doctor.consultationFee).toFixed(2) : 0}
              </div>
            </div>
            <div className="modal-footer" style={styles.modalFooter}>
              <button
                type="button"
                className="btn"
                onClick={handleCloseModal}
                style={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn"
                onClick={handleSaveChanges}
                style={styles.submitButton}
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  
const styles = {
  button: {
    display: 'block',
    width: '100%',
    padding: '15px',
    backgroundColor: '#6a0dad',  // Changed to purple
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '30px',
  },
  modalContent: {
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
  },
  modalHeader: {
    borderBottom: 'none',
    paddingBottom: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#6a0dad',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#6a0dad',  // Purple color for the close button
  },
  modalBody: {
    paddingTop: '10px',
  },
  label: {
    color: '#6a0dad',  // Purple label color
    fontSize: '16px',
    fontWeight: 'bold',
    paddingRight: '5px',
  },
  datePicker: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  totalCost: {
    marginTop: '15px',
    fontSize: '18px',
    color: '#333',
  },
  modalFooter: {
    borderTop: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '15px',
  },
  cancelButton: {
    backgroundColor: '#ddd',
    color: '#333',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#6a0dad',  // Changed to purple
    color: '#fff',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
