# CV Website

This project is a personal CV website hosted on AWS S3. It showcases professional experiences, skills, projects, education, and contact information in a structured and visually appealing manner.

## Project Structure

The project is organized as follows:

```
cv-website
├── src
│   ├── index.html          # Main entry point of the website
│   ├── css
│   │   └── styles.css      # Styles for the website
│   ├── js
│   │   └── scripts.js      # JavaScript for interactive features
│   ├── sections
│   │   ├── home.html       # Home section content
│   │   ├── berufserfahrungen.html # Professional experiences
│   │   ├── kompetenzen.html # Skills and competencies
│   │   ├── projekte.html    # Projects undertaken
│   │   ├── bildungs.html    # Educational qualifications
│   │   └── kontakt.html      # Contact information
├── assets
│   ├── fonts                # Custom fonts used in the website
│   └── images               # Images used throughout the website
├── README.md                # Documentation about the project
└── .gitignore               # Files to be ignored by version control
```

## Setup Instructions

1. **Clone the repository**: 
   ```
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```
   cd cv-website
   ```

3. **Open the project in your preferred code editor**.

4. **Run a local server** to view the website:
   - You can use tools like Live Server in VS Code or any other local server setup.

5. **Deploy to AWS S3**:
   - Create an S3 bucket in your AWS account.
   - Upload the contents of the `src` directory to the bucket.
   - Configure the bucket for static website hosting.

## Purpose

The purpose of this website is to provide a comprehensive overview of my professional background, skills, and projects. It serves as a digital resume that can be easily shared with potential employers and collaborators.