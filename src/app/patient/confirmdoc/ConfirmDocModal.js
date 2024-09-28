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

    createAppointment(doctor._id, startDate, endDate).then(() => {
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm Booking With {doctor.firstName} {doctor.lastName}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label>Select Start Date & Time</label>
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
                  minDate={new Date()}  // Prevent selecting past dates
                />
              </div>
              <div style={{ marginTop: '15px' }}>
                <label>Select End Date & Time</label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="form-control"
                  placeholderText="Select end date and time"
                  minDate={startDate || new Date()}  // Prevent selecting past dates, and ensure end date is not before start date
                />
              </div>
              {errorMessage && (
                <div style={{ color: 'red', marginTop: '15px' }}>
                  {errorMessage}
                </div>
              )}

              <hr />
              <div>
                Total cost: ${(endDate && startDate) ? ((endDate - startDate) / (1000 * 60 * 60) * doctor.consultationFee).toFixed(2) : 0}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
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
    backgroundColor: '#28a745',
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
};
