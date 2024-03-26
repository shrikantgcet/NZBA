using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using Service.Dtos;
using Service.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Text.Encodings.Web;

namespace Service.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

      /*  public void SendEmailold(EmailDto emailDto)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration.GetSection("EmailConfiguration:From").Value));
            email.To.Add(MailboxAddress.Parse(emailDto.To));
            email.Subject = emailDto.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = emailDto.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(_configuration.GetSection("EmailConfiguration:SmtpServer").Value,
                Int32.Parse(_configuration.GetSection("EmailConfiguration:Port").Value),
                SecureSocketOptions.StartTls);

            smtp.Authenticate(_configuration.GetSection("EmailConfiguration:Username").Value,
                _configuration.GetSection("EmailConfiguration:Password").Value);

            var returnEmail = smtp.Send(email);
            smtp.Disconnect(true);
        }
*/
        public void SendEmail(EmailDto emailDto)
        {
            var apiKey = _configuration.GetSection("EmailConfiguration:SendgridKey").Value;
            var client = new SendGridClient(apiKey);
            var from_email = new EmailAddress(_configuration.GetSection("EmailConfiguration:From").Value);
            var subject = emailDto.Subject;

            var htmlContent =
                        "NZBA Accounting Software - Verify your email address to access your account!" +
                        $"<p style=\"font-family:Calibri;font-size:16px\">Hi TestUser,</p>" +
                        $"<p style=\"font-family:Calibri;font-size:16px\">Thank you for signing up to use our accounting software.</p>" +
                        $"<p style=\"font-family:Calibri;font-size:16px\">The last step of the registration process is to verify your email address by clicking the link below. Once this has been completed, you will be able to log into your account.</p>" +
                        $"<p style=\"font-family:Calibri;font-size:16px\">Please confirm your account by <a href='{HtmlEncoder.Default.Encode(emailDto.Body)}'>clicking here</a>.</p>" +
                        $"<p style=\"font-family:Calibri;font-size:16px\">If you did not sign up to use our accounting software, please discard this email and contact us at contact@nzba.org.</p>" +
                        $"<p style=\"font-family:Calibri;font-size:16px\">Thank you</p>" +
                        $"<p style=\"font-family:Calibri;font-size:16px\">NZBA</p>";

            var to_email = new EmailAddress(emailDto.To);
            var plainTextContent = "NZBA User Registration";
            //var htmlContent = emailDto.Body;
            var msg = MailHelper.CreateSingleEmail(from_email, to_email, subject, plainTextContent, htmlContent);
            var response =  client.SendEmailAsync(msg).ConfigureAwait(false);
        }
    }
}
