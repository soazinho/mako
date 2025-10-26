output "ses_verification_status" {
  value       = aws_ses_email_identity.sender_email.arn
  description = "SES email identity ARN - check your inbox for verification email"
}
