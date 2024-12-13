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
        <div className="qr-container">
          <h2 className="subheading">Scan to join</h2>
          <QRCodeSVG className={"qr-code"} value={qrValue} bgColor={"#222"} fgColor={"#fff"} />
          <p className="instruction small">or, use Game ID:</p>
          <h2 className="reduced-margin-top">{gameId}</h2>
        </div>
      </>
    );
  };
  
  export default QRCodeGenerator;