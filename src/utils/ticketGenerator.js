import jsPDF from "jspdf";
import QRCode from "qrcode";

export const downloadTicket = async (booking) => {
  try {
    const pdf = new jsPDF();

    const qrData = await QRCode.toDataURL(
      JSON.stringify({
        bookingId: booking._id,
        event: booking.event?.title,
      })
    );

    // HEADER
    pdf.setFillColor(220, 38, 38); // red
    pdf.rect(0, 0, 210, 30, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.text("UTSAV AI TICKET", 20, 20);

    // Reset color
    pdf.setTextColor(0, 0, 0);

    // MAIN CARD BORDER
    pdf.setDrawColor(200);
    pdf.roundedRect(10, 40, 190, 100, 5, 5);

    // EVENT DETAILS
    pdf.setFontSize(14);
    pdf.text("Event Details", 20, 55);

    pdf.setFontSize(12);
    pdf.text(`Event: ${booking.event?.title}`, 20, 70);
    pdf.text(`Location: ${booking.event?.location}`, 20, 80);
    pdf.text(
      `Date: ${new Date(booking.event?.date).toLocaleDateString()}`,
      20,
      90
    );
    pdf.text(`Tickets: ${booking.tickets}`, 20, 100);

    // STATUS BADGE
    pdf.setFillColor(34, 197, 94); // green
    pdf.rect(20, 110, 40, 10, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text("CONFIRMED", 23, 117);

    // reset
    pdf.setTextColor(0, 0, 0);

    // QR CODE RIGHT SIDE
    pdf.addImage(qrData, "PNG", 140, 60, 50, 50);

    // FOOTER
    pdf.setFontSize(10);
    pdf.setTextColor(120);
    pdf.text("Show this ticket at the entry gate", 20, 150);

    // SAVE
    pdf.save(`Utsav-Ticket-${booking._id}.pdf`);
  } catch (err) {
    console.error("Download error:", err);
  }
};
