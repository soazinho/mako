variable "aws_region" {
  default     = "us-east-1"
  description = "AWS Region."
  type        = string
}

variable "aws_access_key" {
  description = "AWS Access Key."
  type        = string
}

variable "aws_secret_key" {
  description = "AWS Secret Key."
  type        = string
}
