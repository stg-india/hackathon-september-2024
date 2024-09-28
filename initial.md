Team Information:
Team Name: Cosmos Ninjas
Team Members:
Shreya Pahuja
Bhoomi
Krittika Jari
Muskan Khar
Problem Statement:
Automated Resume Screening and Microsoft Form Submission with RPA

Objective:
The goal is to develop an RPA (Robotic Process Automation) solution that automates the screening of resumes and inputs candidate details into a Microsoft Form. This will help HR teams streamline the recruitment process, reducing manual effort and errors.

Problem Overview:
HR professionals often spend substantial time manually reviewing resumes, a process that is both repetitive and error-prone. Missing out on potentially strong candidates due to human oversight is common. Our solution aims to automate this initial screening process, leading to:

Significant time savings
Improved accuracy in candidate selection
A digital audit trail for easy reference and reporting
Project Scope:
Input:
Emails with the subject line “STGi | New Hire(s)” that contain PDF attachments (resume forms).
Output:
Extract key candidate details from the PDF forms.
Automatically populate a Microsoft Form with the extracted data.
Generate a daily audit report summarizing all processed forms.
Key Features:
1. Email Fetching and Filtering:
Action: Retrieve emails from a specified inbox.
Condition: Filter based on the subject line “STGi | New Hire(s)”.
2. Attachment Handling:
Action: Download and store PDF attachments from the filtered emails.
3. Data Extraction:
Tool: Use RPA tools combined with OCR (Optical Character Recognition).
Details: Extract candidate information such as:
Name
Education
Skills
Years of Experience
4. Microsoft Form Submission:
Action: Automatically populate a predefined Microsoft Form with the extracted candidate data.
Execution: Use dynamic selectors or UI Descriptors to handle variations in form fields.
5. Audit Report Generation:
Report: Create a daily report summarizing all successfully processed submissions.
Format: Adhere to the provided report template.
6. Error Handling and Logging:
Action: Implement error management for handling failures like email retrieval issues or incorrect PDF formats.
Logging: Maintain logs to track errors, processed items, and overall system performance for troubleshooting and auditing.
Tools & Technologies:
RPA Platforms: UiPath or equivalent
Microsoft Excel: For data manipulation
Email Platforms: Outlook or Gmail for communication and report sharing
OCR (Optical Character Recognition): For extracting text from PDFs

