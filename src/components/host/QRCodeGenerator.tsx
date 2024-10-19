import React from "react";
import { QRCodeSVG } from 'qrcode.react';

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

interface QRCodeGeneratorProps {
    gameId: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ gameId }) => {
    const qrValue = `${frontendUrl}/game/${gameId}`;  // The data to be encoded in the QR code.
    
  
    return (
      <div>
        <h1>Scan this QR code</h1>
        <QRCodeSVG value={qrValue} size={256} bgColor={"#ffffff"} fgColor={"#000000"} />
      </div>
    );
  };
  
  export default QRCodeGenerator;