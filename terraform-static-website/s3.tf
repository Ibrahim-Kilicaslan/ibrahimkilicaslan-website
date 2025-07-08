# S3 bucket and policy for static website hosting

# Create an S3 bucket to host the static website
resource "aws_s3_bucket" "website" {
  bucket = var.domain_name
  website {
    index_document = "index.html"   # Main entry point for the website
    error_document = "error.html"   # Error page for the website
  }
  force_destroy = true               # Allow bucket to be destroyed even if not empty
}

# Allow public read access to all objects in the S3 bucket
resource "aws_s3_bucket_policy" "website_policy" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website_policy.json
}

# IAM policy document granting public read access to the S3 bucket
# (Used by the bucket policy above)
data "aws_iam_policy_document" "website_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
} 