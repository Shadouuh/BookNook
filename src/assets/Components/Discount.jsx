import QRCode from "qrcode";
import { useEffect } from "react";
const Coupon = () => {
  const couponURL = "https://imgur.com/a/zxLqQse";

  useEffect(() => {
    // Generar el código QR dentro del canvas
    const canvas = document.getElementById("qrCanvas");
    QRCode.toCanvas(canvas, couponURL, {
      width: 200,
      margin: 1,
      color: {
        dark: "#000", 
        light: "#ffffff", 
      },
    });
  }, [couponURL]);

  return (

    <div style={styles.container}>
        <div className="margin"></div>
      <h1 style={styles.title}>
        ¡Aquí tienes tu cupón de <span style={styles.discount}>5% de descuento</span> en Bubble Tea!
      </h1>
      <p style={styles.description}>
        Muestra este código QR en la tienda para aplicar tu descuento.
      </p>
      <div style={styles.qrContainer}>
        <canvas id="qrCanvas" style={styles.canvas}></canvas>
      </div>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "1.8rem",
    color: "#ff6347",
  },
  discount: {
    fontWeight: "bold",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    margin: "10px 0",
  },
  qrContainer: {
    marginTop: "20px",
    padding: "10px",
    border: "2px solid #ff6347",
    borderRadius: "10px",
    display: "inline-block",
  },
  canvas: {
    width: "200px",
    height: "200px",
  },
};

export default Coupon;
