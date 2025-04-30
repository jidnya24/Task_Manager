using System.Net.Mail;
using System.Net;

namespace TaskManager.Services
{
    public class EmailService
    {
        private readonly string smtpServer = "smtp.gmail.com";
        private readonly int smtpPort = 587;
        private readonly string senderEmail = "taskify.work@gmail.com";
        private readonly string senderPassword = "lhiu pqay urqt dbyl";

        public async Task SendLoginEmail(string recipientEmail, string uname)
        {
            try
            {
                using (SmtpClient client = new SmtpClient(smtpServer, smtpPort))
                {
                    client.Credentials = new NetworkCredential(senderEmail, senderPassword);
                    client.EnableSsl = true;

                    MailMessage mailMessage = new MailMessage
                    {
                        From = new MailAddress(senderEmail),
                        Subject = "Successful Login to Your Account!",
                        Body = $@"
                            <html>
                            <body>
                                <p>Hello <b>{uname}</b>,</p>
                                <p>You have successfully logged in to your account.</p>
                                <p>If this wasn't you, please reset your password immediately.</p>
                                <p>Stay organized and manage your tasks efficiently with <b>Taskify!</b></p>
                                <p>If you need any assistance, feel free to reach out to our support team.</p>
                                <br>
                                <p>Best Regards,<br><b>Taskify Team</b></p>
                            </body>
                            </html>",
                        IsBodyHtml = true
                    };
                    mailMessage.To.Add(recipientEmail);

                    await client.SendMailAsync(mailMessage);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        }
    }
}
