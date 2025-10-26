# output "curl_domain_url" {
#   depends_on = [aws_api_gateway_base_path_mapping.example]
#
#   description = "API Gateway Domain URL (self-signed certificate)"
#   value       = aws_api_gateway_domain.example.domain_name
# }

# output "curl_stage_invoke_url" {
#   description = "API Gateway Stage Invoke URL"
#   value       = aws_api_gateway_stage.example.invoke_url
# }
