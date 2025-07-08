# Terraform Static Website on AWS

This project provides a complete, modular Infrastructure as Code (IaC) solution for hosting a static website on AWS using S3, CloudFront, Route53, and ACM, managed with Terraform.

## Features
- **S3** for static website hosting
- **CloudFront** for global CDN and HTTPS
- **Route53** for DNS management
- **ACM** for automatic SSL/TLS certificates (wildcard support)
- Modular, well-documented Terraform code
- GitHub Actions workflow for automatic deployment

## Prerequisites
- [Terraform](https://www.terraform.io/) v1.0+
- An AWS account with permissions for S3, CloudFront, Route53, and ACM
- Your domain name managed in AWS Route53
- [GitHub Actions](https://docs.github.com/en/actions) (for CI/CD)

## File Structure
- `main.tf` – Providers and entry point
- `variables.tf` – All variables (region, domain, etc.)
- `s3.tf` – S3 bucket and policy
- `cert.tf` – ACM wildcard certificate and validation
- `route53.tf` – DNS zone and records
- `cloudfront.tf` – CloudFront distribution
- `outputs.tf` – Useful outputs (endpoints, domain names)

## Setup & Usage
1. **Clone this repository**
2. **Configure your variables**
   - Edit `variables.tf` to set your AWS region and domain name
   - (Optional) Edit the aliases in `cloudfront.tf` and `route53.tf` for your subdomains
3. **Initialize Terraform**
   ```sh
   terraform init
   ```
4. **Review the plan**
   ```sh
   terraform plan
   ```
5. **Apply the infrastructure**
   ```sh
   terraform apply
   ```
6. **Check the outputs**
   - S3 website endpoint
   - CloudFront distribution domain
   - Route53 hosted zone name

## GitHub Actions Deployment
- See `.github/workflows/deploy.yml` for the CI/CD pipeline
- On every push to `main`, your site will be automatically synced to S3 and CloudFront cache will be invalidated
- Store your AWS credentials and CloudFront distribution ID as GitHub secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `CLOUDFRONT_DISTRIBUTION_ID`

## Customization
- **Region:** Change `aws_region` in `variables.tf`
- **Domain:** Change `domain_name` in `variables.tf`
- **Aliases:** Update the domain list in `cloudfront.tf` and `route53.tf`

## Notes
- All DNS records should be managed by Terraform. Delete any manual records in Route53 before applying.
- ACM certificates for CloudFront must be created in `us-east-1`.
- The project is modular—add or remove `.tf` files as needed.

## License
MIT 