# Route53 DNS configuration for the website

# Create a hosted zone for the main domain
resource "aws_route53_zone" "main" {
  name = var.domain_name
}

locals {
  unique_cert_validations = distinct([
    for dvo in aws_acm_certificate.cert.domain_validation_options : {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  ])
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in local.unique_cert_validations : dvo.name => dvo
  }
  zone_id = aws_route53_zone.main.zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

# Create alias A records for each domain/subdomain to point to CloudFront
# IMPORTANT: All DNS records are managed by Terraform. Delete any manual records before applying.
resource "aws_route53_record" "cloudfront_alias" {
  for_each = toset([
    "ibrahimkilicaslan.click",
    "info.ibrahimkilicaslan.click",
    "www.ibrahimkilicaslan.click"
  ])
  zone_id = aws_route53_zone.main.zone_id
  name    = each.value
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
} 