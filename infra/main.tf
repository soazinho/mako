terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region  = "us-east-1"
  profile = "mako"
}

resource "aws_ses_email_identity" "sender_email" {
  email = "huguescarlos.soares@gmail.com"
}
