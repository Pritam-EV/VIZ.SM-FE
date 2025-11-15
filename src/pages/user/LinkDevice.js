import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import { Html5Qrcode } from 'html5-qrcode';
import './LinkDevice.css';

export default function LinkDevice() {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState('');
  const html5QrRef = useRef(null);
  const scannerStartedRef = useRef(false);

  // ==================================================================
  //  IMMEDIATELY REQUEST CAMERA ON PAGE LOAD AND START SCANNING
  // ==================================================================
  useEffect(() => {
    async function startCamera() {
      try {
        // FORCE permission popup
        await navigator.mediaDevices.getUserMedia({ video: true });

        // Start scanner after a tiny delay to ensure DOM is ready
        setTimeout(() => {
          startScanner();
        }, 200);
      } catch (err) {
        console.error("Camera permission denied:", err);
      }
    }

    startCamera();

    return () => {
      stopScanner();
    };
  }, []);

  // ==================================================================
  // START HTML5QRCODE DIRECT SCANNER
  // ==================================================================
  const startScanner = async () => {
    try {
      // Only start once
      if (scannerStartedRef.current) {
        return;
      }

      if (!html5QrRef.current) {
        html5QrRef.current = new Html5Qrcode("qr-reader-direct");
      }

      await html5QrRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 230, height: 230 }
        },
        (decodedText) => {
          console.log("QR CODE DETECTED:", decodedText);
          setSerialNumber(decodedText);
          stopScanner();
          handleLinkDevice(decodedText);
        },
        (error) => {
            console.warn("QR Decode error:", error); 
          // Ignore scanning errors silently
        }
      );

      scannerStartedRef.current = true;
    } catch (err) {
      console.error("Failed to start QR scanner:", err);
      alert('Could not start camera. Please check permissions.');
    }
  };

  // ==================================================================
  // STOP SCANNER CLEANLY
  // ==================================================================
  const stopScanner = async () => {
    try {
      if (html5QrRef.current && scannerStartedRef.current) {
        await html5QrRef.current.stop();
        await html5QrRef.current.clear();
        html5QrRef.current = null;
        scannerStartedRef.current = false;
      }
    } catch (err) {
      console.error("Stop error:", err);
    }
  };

  // ==================================================================
  // AUTO SUBMIT ON SCAN OR MANUAL ENTRY
  // ==================================================================
  const handleLinkDevice = (value) => {
    const finalValue = value || serialNumber;

    if (!finalValue.trim()) {
      alert("Please scan a valid serial number or enter one manually");
      return;
    }

    console.log("LINKING DEVICE:", finalValue);
    // TODO: Call your API to link device
    // Then navigate to success/home
    // navigate('/home');
  };

  const handleBack = () => {
    stopScanner();
    navigate('/home');
  };

  return (
    <div className="link-device-root">
      
      {/* HEADER */}
      <div className="link-device-header">
        <div className="link-device-header-side">
          <button className="link-device-back-btn" onClick={handleBack} aria-label="Back">
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
        <div className="link-device-header-center">
          <h1 className="link-device-title">Link Device</h1>
        </div>
        <div className="link-device-header-side"></div>
      </div>

      {/* BODY */}
      <div className="link-device-container">

        <p className="link-device-instruction">Scan QR on device</p>

        {/* DIRECT SCANNER - ALWAYS ACTIVE */}
        <div id="qr-reader-direct" className="qr-scanner-direct"></div>

        <div className="link-device-divider">
          <span>----- OR -----</span>
        </div>

        {/* MANUAL SECTION */}
        <div className="link-device-manual-section">
          <p className="link-device-manual-label">Enter device Serial<br />Number manually</p>
          <Input
            type="text"
            placeholder="Enter Serial Number"
            className="link-device-input"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
        </div>

        <Button
          onClick={() => handleLinkDevice()}
          className="link-device-btn"
          style={{
            background: '#0A1F35',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '0.8rem 2rem',
            borderRadius: '1.8rem',
            border: 'none',
            minHeight: '2.4rem',
            marginTop: '1rem',
          }}
        >
          Link Device
        </Button>

      </div>
    </div>
  );
}
