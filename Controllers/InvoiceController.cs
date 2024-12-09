using Amazon.Runtime.Documents;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBackendProject.Models;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.StyledXmlParser.Jsoup.Nodes;
using System.Net;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("invoice")]    
    public class InvoiceController : Controller
    {
        DbAppContext db = new DbAppContext();

        [HttpGet]
        [Route("get/{user_id}")] //GET: invoice/get/{user_id}
        public ActionResult GetPayment(int user_id)
        {
            var payments = db.Payments
                .Where(p => p.Booking.User.Id == user_id)
                .Select(p => new
                {
                    p.Booking.User.UserProfile.FirstName,
                    p.Booking.User.UserProfile.LastName,
                    p.Booking.User.UserProfile.Address,
                    p.BookingId,
                    p.Booking.BookingDate,
                    p.Booking.TourPackage.Name,
                    p.Booking.NumOfPeople,
                    p.PaymentDate,
                    p.PaymentAmount,
                    p.PaymentMethod,
                    p.PaymentStatus,
                    p.TransactionId,
                    
                })
                .ToList();

            return Json(payments, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("pdf")] // GET: invoice/pdf
        public ActionResult GeneratePdf(string transactionId)
        {
            var invoice = db.Payments.FirstOrDefault(p => p.TransactionId == transactionId);
            if (invoice == null) return new HttpStatusCodeResult(HttpStatusCode.NotFound, "Invoice not found.");

            var pdf = GeneratePdfForInvoice(invoice);

            if (pdf == null || pdf.Length == 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "Failed to generate PDF.");
            }

            return File(pdf, "application/pdf", $"Invoice-{transactionId}.pdf");
        }


        private byte[] GeneratePdfForInvoice(Payment invoice)
        {
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    var writer = new PdfWriter(memoryStream);
                    var pdf = new PdfDocument(writer);

                    var document = new iText.Layout.Document(pdf);

                    document.Add(new iText.Layout.Element.Paragraph("Invoice"));
                    document.Add(new iText.Layout.Element.Paragraph($"Transaction ID: {invoice.TransactionId}"));
                    document.Add(new iText.Layout.Element.Paragraph($"Payment Date: {invoice.PaymentDate:yyyy-MM-dd}"));
                    document.Add(new iText.Layout.Element.Paragraph($"Amount: ${invoice.PaymentAmount}"));

                    document.Close();

                    return memoryStream.ToArray();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating PDF: {ex.Message}");
                return null;
            }
        }
    }
}