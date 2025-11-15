import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common';
import './HelpSupport.css';

export default function HelpSupport() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const supportOptions = [
    'Device not working',
    'POOL positive but device OFF',
    'Refunds related',
    'Withdraw WALLET',
    'Account related',
    'Raise consumption dispute',
    'Other',
  ];

  // Sample ticket history data
  const ticketHistory = [
    {
      id: 'TKT123456',
      title: 'Device not working',
      status: 'Resolved',
      timeline: [
        { time: '2025-11-14 10:30 AM', status: 'Ticket Created', description: 'Your support ticket has been created' },
        { time: '2025-11-14 11:15 AM', status: 'Assigned', description: 'Ticket assigned to support team' },
        { time: '2025-11-14 02:45 PM', status: 'In Progress', description: 'Support team is investigating the issue' },
        { time: '2025-11-14 05:20 PM', status: 'Resolved', description: 'Issue resolved. Device is now working' },
      ],
    },
    {
      id: 'TKT123457',
      title: 'Withdraw WALLET',
      status: 'Pending',
      timeline: [
        { time: '2025-11-13 09:00 AM', status: 'Ticket Created', description: 'Your support ticket has been created' },
        { time: '2025-11-13 10:30 AM', status: 'Assigned', description: 'Ticket assigned to support team' },
      ],
    },
  ];

  const handleBack = () => {
    navigate('/home');
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRaiseTicket = () => {
    if (!selectedOption) {
      alert('Please select an option');
      return;
    }
    if (!description.trim()) {
      alert('Please describe your issue in detail');
      return;
    }

    const generatedTicket = `TKT${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(generatedTicket);
    setShowModal(true);

    console.log('Raise ticket:', {
      option: selectedOption,
      description,
      attachment: attachment?.name || 'none',
      ticket: generatedTicket,
    });

    setTimeout(() => {
      setSelectedOption(null);
      setDescription('');
      setAttachment(null);
      setShowModal(false);
    }, 3000);
  };

  return (
    <div className="help-support-root">
      {/* ============ HEADER ============ */}
      <div className="help-support-header">
        <button
          className="help-support-back-btn"
          onClick={handleBack}
          aria-label="Back"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="help-support-title">Help & Support</h1>
        <button
          className="help-support-history-btn"
          onClick={() => setShowHistory(true)}
          aria-label="Ticket History"
        >
          <i className="fas fa-history"></i>
        </button>
      </div>

      {/* ============ CONTENT ============ */}
      <div className="help-support-container">
        <p className="help-support-instruction">Select the options you want help with</p>

        <div className="help-support-options">
          {supportOptions.map((option) => (
            <button
              key={option}
              className={`help-support-option-btn ${
                selectedOption === option ? 'selected' : ''
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="help-support-section">
          <label className="help-support-label">Describe in detail *</label>
          <textarea
            className="help-support-textarea"
            placeholder="Enter your description here..."
            value={description}
            onChange={handleDescriptionChange}
            rows={6}
          />
        </div>

        <div className="help-support-attachment">
          <label htmlFor="attachment-input" className="help-support-attachment-label">
            <i className="fas fa-paperclip"></i>
            Add attachment
          </label>
          <input
            id="attachment-input"
            type="file"
            onChange={handleAttachmentChange}
            style={{ display: 'none' }}
            aria-label="Add attachment"
          />
          {attachment && (
            <p className="help-support-attachment-name">{attachment.name}</p>
          )}
        </div>

        <Button
          onClick={handleRaiseTicket}
          className="help-support-raise-btn"
          style={{
            background: '#0A1F35',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0.8rem 2.5rem',
            borderRadius: '1.8rem',
            border: 'none',
            minHeight: '2.5rem',
            marginTop: '1.5rem',
          }}
        >
          Raise Ticket
        </Button>
      </div>

      {/* ============ SUCCESS MODAL ============ */}
      {showModal && (
        <div className="help-support-modal-overlay">
          <div className="help-support-modal">
            <div className="help-support-modal-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2 className="help-support-modal-title">Support Ticket Raised</h2>
            <p className="help-support-modal-ticket">Ticket # {ticketNumber}</p>
            <p className="help-support-modal-message">
              Your support ticket has been created successfully. Our team will contact you soon.
            </p>
          </div>
        </div>
      )}

      {/* ============ TICKET HISTORY MODAL ============ */}
      {showHistory && (
        <div className="help-support-history-overlay">
          <div className="help-support-history-modal">
            <div className="help-support-history-header">
              <h2 className="help-support-history-title">Ticket History</h2>
              <button
                className="help-support-history-close"
                onClick={() => setShowHistory(false)}
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="help-support-history-list">
              {ticketHistory.map((ticket) => (
                <div key={ticket.id} className="help-support-ticket-item">
                  <div className="help-support-ticket-header">
                    <div className="help-support-ticket-info">
                      <h3 className="help-support-ticket-id">{ticket.id}</h3>
                      <p className="help-support-ticket-title">{ticket.title}</p>
                    </div>
                    <span className={`help-support-ticket-status ${ticket.status.toLowerCase()}`}>
                      {ticket.status}
                    </span>
                  </div>

                  <div className="help-support-timeline">
                    {ticket.timeline.map((event, index) => (
                      <div key={index} className="help-support-timeline-item">
                        <div className="help-support-timeline-dot"></div>
                        <div className="help-support-timeline-content">
                          <p className="help-support-timeline-time">{event.time}</p>
                          <p className="help-support-timeline-status">{event.status}</p>
                          <p className="help-support-timeline-desc">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
