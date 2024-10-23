import React from "react";
import { QRCodeSVG } from 'qrcode.react';

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

interface QRCodeGeneratorProps {
    gameId: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ gameId }) => {
    const qrValue = `${frontendUrl}/game/${gameId}`;  // The data to be encoded in the QR code.
    
  
    return (
      <>
        <h2>Scan to join</h2>
        <div className="qr-container">
        <QRCodeSVG className={"qr-code"} value={qrValue} bgColor={"#222"} fgColor={"#fff"} />
        </div>
      </>
    );
  };
  
  export default QRCodeGenerator;