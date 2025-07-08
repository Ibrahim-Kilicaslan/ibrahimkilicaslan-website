# Route53 DNS configuration for the website

# Create a hosted zone for the main domain
resource "aws_route53_zone" "main" {
  name = var.domain_name
}

# Create DNS records for ACM certificate validation.
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  zone_id = aws_route53_zone.main.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
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