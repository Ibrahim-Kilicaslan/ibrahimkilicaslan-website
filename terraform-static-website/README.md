# Terraform Static Website on AWS

This module provides a complete, modular, and production-ready Infrastructure as Code (IaC) solution for hosting a static website on AWS using S3, CloudFront, Route53, and ACM, all managed with Terraform. It is designed to be clear, reusable, and easy for anyone to adapt for their own projects.

---

## 🚀 What Does This Module Do?
- **Creates an S3 bucket** for static website hosting
- **Sets up CloudFront** for global CDN, HTTPS, and custom domains
- **Manages Route53 DNS** (hosted zone, A records, validation records)
- **Requests and validates ACM SSL certificates** (wildcard, auto-DNS validation)
- **Outputs all important endpoints** for easy integration
- **Supports full automation and CI/CD** (see main project README)

---

## 🗂️ File & Module Structure

- `main.tf` – Providers (AWS, regions) and entry point
- `variables.tf` – All variables (region, domain, aliases)
- `s3.tf` – S3 bucket, public access, and policy
- `cert.tf` – ACM wildcard certificate and DNS validation
- `route53.tf` – Hosted zone, DNS records, validation records
- `cloudfront.tf` – CloudFront distribution (CDN, HTTPS, aliases)
- `outputs.tf` – Outputs for endpoints and zone names

---

## ⚙️ How to Use This Module (Step by Step)

### 1. **Clone the Repository**
```sh
git clone <your-repo-url>
cd terraform-static-website
```

### 2. **Configure Your Variables**
Edit `variables.tf`:
- `aws_region`: AWS region for your resources (default: `us-east-1`)
- `domain_name`: Your main domain (e.g. `example.com`)
- `aliases`: List of all domains/subdomains (e.g. `www.example.com`, `info.example.com`)

> **Tip:** To add a new subdomain, just add it to the `aliases` list. All DNS and CloudFront settings will update automatically!

### 3. **Initialize Terraform**
```sh
terraform init
```

### 4. **Review the Plan**
```sh
terraform plan
```

### 5. **Apply the Infrastructure**
```sh
terraform apply -target=aws_acm_certificate.cert -target=aws_route53_zone.main
```

### 6. **Check the Outputs**
- S3 website endpoint
- CloudFront distribution domain
- Route53 hosted zone name

---

## 📄 Explanation of Each File

- **main.tf**: Sets up AWS providers. Uses a second provider for `us-east-1` (required for ACM certificates used by CloudFront).
- **variables.tf**: All user-editable variables. Only change values here for region, domain, and subdomains.
- **s3.tf**: Creates the S3 bucket, enables static website hosting, sets up public access, and applies a bucket policy for public read (required for static sites).
- **cert.tf**: Requests a wildcard SSL certificate from ACM (for both root and all subdomains), and validates it automatically via DNS.
- **route53.tf**: Creates the hosted zone, all DNS records (A/alias for CloudFront, CNAME for ACM validation), and ensures everything is managed by Terraform.
- **cloudfront.tf**: Sets up CloudFront distribution, connects it to S3, enables HTTPS, and adds all domains/subdomains as aliases.
- **outputs.tf**: Exposes useful endpoints and names for integration and verification.

---

## 🧩 How to Add a New Subdomain
1. Edit `variables.tf` and add your new subdomain to the `aliases` list:
   ```hcl
   variable "aliases" {
     default = [
       "ibrahimkilicaslan.click",
       "info.ibrahimkilicaslan.click",
       "www.ibrahimkilicaslan.click",
       "newsubdomain.ibrahimkilicaslan.click" # <--- Add here
     ]
   }
   ```
2. Run:
   ```sh
   terraform apply
   ```
3. That's it! All DNS and CloudFront settings update automatically.

---

## 🛡️ Best Practices & Notes
- **Never manually edit AWS Console resources** managed by Terraform.
- **All DNS records** (A, CNAME, etc.) should be managed by this module.
- **ACM certificates for CloudFront** must be created in `us-east-1` (even if your site is in another region).
- **S3 bucket names** must be globally unique.
- **Use version control** for your `.tf` files and keep your state files secure.
- **Delete any manual Route53 records** before applying to avoid conflicts.
- **Force destroy** is enabled for the S3 bucket (for easy cleanup in dev/test). Remove for production if you want to protect data.

---

## 🆘 Troubleshooting & FAQ
- **Terraform apply fails with "already exists"**: There may be a manual record or resource in AWS. Delete it or import it into Terraform.
- **ACM validation stuck**: Check that Route53 CNAME validation records exist and are correct.
- **CloudFront not serving HTTPS**: Certificate must be in `us-east-1` and fully validated.
- **S3 access denied**: Check bucket policy and public access block settings.
- **DNS not resolving**: Make sure your domain's NS records at your registrar match the Route53 hosted zone.

---

## 📚 Resources
- [Terraform Documentation](https://www.terraform.io/docs/)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)

---


## 💡 Extra Tips
- This module is designed for learning, prototyping, and production use.
- You can easily extend it for multi-environment (dev/stage/prod) setups by using workspaces or variable overrides.
- For private/static sites, consider using CloudFront Origin Access Control (OAC) or OAI for S3.
- Always review AWS costs before deploying in production.
- Pull requests and suggestions are welcome!


## ⚙️ Step-by-Step: Two-Stage Apply for ACM/Route53 Validation

If you encounter errors related to ACM certificate DNS validation (such as 'Invalid for_each argument' or 'value not known until apply'), follow these steps to resolve the issue:

### **Step 1: Apply Only ACM Certificate and Route53 Hosted Zone**
1. Open your terminal and navigate to the `terraform-static-website` directory.
2. Run the following command:
   ```sh
   terraform apply -target=aws_acm_certificate.cert -target=aws_route53_zone.main
   ```
   - This will create the ACM certificate and the Route53 hosted zone.
   - Terraform will output the DNS validation records required for ACM.

### **Step 2: Wait for DNS Validation Records to Appear**
3. Check the outputs or the AWS Console to see the required CNAME validation records.
4. Make sure these CNAME records are present in your Route53 hosted zone (Terraform usually creates them automatically in the next step).

### **Step 3: Apply the Rest of the Infrastructure**
5. Run the following command to create all remaining resources:
   ```sh
   terraform apply
   ```
   - This will create the DNS validation records (if not already present), CloudFront, S3, and all other resources.

### **Step 4: Wait for ACM Validation and DNS Propagation**
6. ACM may take several minutes to validate the certificate (especially if you just updated your domain's NS records).
7. You can monitor the certificate status in the AWS Certificate Manager Console. Once it is 'Issued', HTTPS will work for your site.

**Tip:**
- If you change your domain's NS records, DNS propagation can take 5–30 minutes (sometimes longer). ACM validation will not succeed until propagation is complete.
- If you see 'already exists' errors, check for duplicate DNS records in Route53 and remove any manual entries.

---

## 📝 License
MIT

---

## 👤 Author
Ibrahim Kilicaslan

---