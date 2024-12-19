import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(recipient_email, subject, message_body):
    # Your email credentials
    sender_email = "chanderullas@gmail.com"  # Replace with your Gmail address
    sender_password = "ipin trox mmnv wsuc"  # Replace with your generated App Password

    try:
        # Create the email
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject

        # Attach the email body
        msg.attach(MIMEText(message_body, 'plain'))

        # Connect to Gmail's SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Upgrade to secure connection
            server.login(sender_email, sender_password)  # Login
            server.sendmail(sender_email, recipient_email, msg.as_string())  # Send email
        print(f"Email sent successfully to {recipient_email}!")

    except smtplib.SMTPAuthenticationError:
        print("Authentication error: Please check your email and app password.")
    except smtplib.SMTPException as e:
        print(f"SMTP error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Example usage
send_email("spandanavaishnav2005@gmail.com", "Hello from Python", "This is a test message!")
send_email("nshreya22@gmail.com", "Hello from Python", "This is a test message!")