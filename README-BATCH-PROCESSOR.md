# FAQ Batch Processor - Complete Documentation

## 🎯 Overview

A sophisticated web application that batch processes FAQ questions, generates AI-powered content, and stores them via RESTful APIs for both Arabic and English languages.

## ✨ Key Features

### 1. **Batch Processing**
- Process multiple FAQ questions simultaneously
- One question per line input
- Automatic language detection and processing

### 2. **AI Content Generation**
- **1 Tag** per question (relevant category)
- **10 Synonyms** per question (alternative phrasings)
- **2 Responses** per question (detailed answers)
- Generated for both Arabic and English

### 3. **API Integration**
- Automatic API calls to store all generated content
- Sequential processing: Arabic → English
- Real-time status tracking for each API call

### 4. **Advanced Error Handling**
- **State Persistence**: Generated content is never lost
- **Individual Retry**: Retry specific failed API calls
- **Batch Retry**: Retry all failed calls at once
- **Detailed Error Messages**: Know exactly what failed and why

### 5. **Apple-Inspired Design**
- Clean, minimalist interface
- San Francisco font stack
- Solid colors (no gradients)
- Generous whitespace
- Intuitive user experience

---

## 🔧 Configuration

### Required Fields

#### 1. **Assistant Code**
- **Default**: `li6monObUb`
- **Editable**: Yes
- **Description**: Identifies the AI assistant instance

#### 2. **Version Code**
- **Default**: `li68VXoo7d`
- **Editable**: Yes
- **Description**: API version identifier

#### 3. **FAQ ID** *
- **Default**: None (user input)
- **Required**: Yes
- **Description**: Identifies the FAQ collection

#### 4. **JWT Token** *
- **Default**: None (user input)
- **Required**: Yes
- **Description**: Authentication token for API calls
- **Storage**: Saved in localStorage

#### 5. **API Base URL**
- **Default**: `https://api.liveapp.com.sa`
- **Editable**: Yes
- **Description**: Base URL for all API endpoints

### AI Settings

- **Provider**: Google Gemini (default), OpenAI, or OpenRouter
- **Model**: Various models available per provider
- **API Key**: Required for AI content generation
- **AI Instructions** (Optional): Context or category information to guide AI content generation
  - Example: "These questions are about e-commerce payment and shipping services"
  - Helps AI generate more accurate and relevant content
  - Stored in localStorage for future sessions

---

## 📡 API Endpoints

All requests include:
- **Authorization**: `Bearer {jwt}`
- **Content-Type**: `application/json`

### A. Create Question
- **Method**: `POST`
- **Endpoint**: `/api/knowledge_ai/{assistantCode}/{versionCode}/faq/{faqId}/{languageId}/question`
- **Body**: `{"question": "string"}`
- **Response**: `{"createdId": "string"}` → Used as `questionId`

### B. Add Tag
- **Method**: `POST`
- **Endpoint**: `/api/knowledge_ai/{assistantCode}/{versionCode}/faq/{faqId}/{languageId}/question/{questionId}/tag`
- **Body**: `{"tag": "string"}`
- **Note**: One tag per request

### C. Add Synonym
- **Method**: `POST`
- **Endpoint**: `/api/knowledge_ai/{assistantCode}/{versionCode}/faq/{faqId}/{languageId}/question/{questionId}/synonym`
- **Body**: `{"questionSynonym": "string"}`
- **Note**: Called 10 times (one per synonym)

### D. Add Response
- **Method**: `POST`
- **Endpoint**: `/api/knowledge_ai/{assistantCode}/{versionCode}/faq/{faqId}/{languageId}/question/{questionId}/short_messages`
- **Body**: `{"messageText": "string"}` (properly escaped)
- **Note**: Called 2 times (one per response)

---

## 🔄 Processing Workflow

For each question, the system follows this workflow:

### **Phase 1: Arabic Processing (languageId = 1)**

1. **AI Generation**
   - Generate Arabic question
   - Generate 1 tag
   - Generate 10 synonyms
   - Generate 2 responses

2. **API Calls** (Sequential)
   - ✅ Create Question → Get `questionId`
   - ✅ Add Tag (1 call)
   - ✅ Add Synonyms (10 calls)
   - ✅ Add Responses (2 calls)
   - **Total**: 14 API calls

### **Phase 2: English Processing (languageId = 2)**

1. **AI Generation**
   - Translate/generate English question
   - Generate 1 tag
   - Generate 10 synonyms
   - Generate 2 responses

2. **API Calls** (Sequential)
   - ✅ Create Question → Get `questionId`
   - ✅ Add Tag (1 call)
   - ✅ Add Synonyms (10 calls)
   - ✅ Add Responses (2 calls)
   - **Total**: 14 API calls

### **Per Question Total**: 28 API calls (14 Arabic + 14 English)

---

## 🎨 User Interface

### Configuration Section
- Clean form with proper labeling
- Smart defaults for common fields
- localStorage persistence

### Processing View
- Real-time loading indicator
- Progress feedback
- Non-blocking UI

### Results View
- **Summary Dashboard**
  - Total Questions
  - Successful Calls
  - Failed Calls
  - Total API Calls

- **Question Cards**
  - Expandable sections for Arabic and English
  - Generated content preview
  - API call status for each operation
  - Individual retry buttons for failed calls

### Status Indicators
- 🟢 **Green**: Success
- 🔴 **Red**: Failed
- ⚪ **Gray**: Pending

---

## 💾 State Management

### Persistent Storage (localStorage)
- JWT Token
- Assistant Code
- Version Code
- Base URL
- AI Provider & Model
- AI API Key

### Runtime State
All generated content is stored in memory:
```javascript
{
  index: number,
  originalQuestion: string,
  arabic: {
    question: string,
    questionId: string | null,
    tag: string,
    synonyms: [string...],
    responses: [string...],
    apiCalls: {
      createQuestion: { status, error },
      addTag: { status, error },
      addSynonyms: [{ status, error }...],
      addResponses: [{ status, error }...]
    }
  },
  english: { /* same structure */ }
}
```

### Key Benefits
- ✅ **No data loss** on API failure
- ✅ **Selective retry** without regeneration
- ✅ **Full audit trail** of all operations
- ✅ **Export capability** for analysis

---

## 🔁 Error Handling & Retry

### Individual Retry
- Each failed API call has a dedicated "Retry" button
- Retries use stored data (no AI regeneration)
- Updates status in real-time

### Batch Retry
- "Retry All Failed" button at the bottom
- Processes all failed calls sequentially
- Skips successful calls
- Shows completion notification

### Error Information
- Specific error messages for debugging
- Network errors vs API errors
- Authentication failures
- Invalid data errors

---

## 📊 Export Functionality

### Export Report (JSON)
```json
{
  "timestamp": "2025-11-27T...",
  "configuration": {
    "assistantCode": "...",
    "versionCode": "...",
    "faqId": "..."
  },
  "questions": [
    {
      "index": 1,
      "originalQuestion": "...",
      "arabic": { /* full data */ },
      "english": { /* full data */ }
    }
  ]
}
```

### Use Cases
- Audit trail
- Debugging
- Analytics
- Backup
- Integration with other systems

---

## 🚀 Quick Start Guide

### Step 1: Configuration
1. Enter your **FAQ ID**
2. Enter your **JWT Token**
3. (Optional) Adjust Assistant Code, Version Code, or Base URL
4. Verify Base URL is correct

### Step 2: AI Setup
1. Select AI Provider (Gemini recommended for free tier)
2. Choose Model
3. Enter AI API Key
4. (Optional) Add AI Instructions for context

### Step 3: Provide Context (Optional but Recommended)
Add instructions to help AI understand the category/context:
```
Example: These questions are about an e-commerce platform's 
payment and shipping services. Focus on customer support 
and technical assistance.
```

This helps the AI generate:
- More relevant tags
- Better synonyms
- More accurate responses

### Step 4: Input Questions
1. Enter questions in the text area
2. One question per line
3. Mix Arabic and English as needed

### Step 4: Process
1. Click "Process Questions"
2. Wait for AI generation and API calls
3. Monitor progress

### Step 5: Review & Retry
1. Check the results dashboard
2. Review individual question results
3. Retry any failed API calls
4. Export report if needed

---

## 🔒 Security & Privacy

### Data Storage
- **localStorage**: Configuration only (JWT, codes, keys)
- **Memory**: Processing data (cleared on page reload)
- **No server**: All processing happens in browser

### API Security
- JWT authentication for all API calls
- Secure HTTPS connections
- No data logged or tracked

### Best Practices
1. **Rotate JWT tokens** regularly
2. **Keep API keys secure**
3. **Use HTTPS** for all connections
4. **Review exports** before sharing
5. **Clear browser data** when done

---

## 📈 Performance & Limitations

### Processing Time
- **Per Question**: ~30-60 seconds
  - AI Generation: 10-20 seconds
  - API Calls: 20-40 seconds (28 calls)
- **10 Questions**: ~5-10 minutes
- **100 Questions**: ~50-100 minutes

### Rate Limits
Consider:
- **AI Provider**: Gemini free tier = 15 req/min
- **Your API**: Check your backend rate limits
- **Network**: Stable connection required

### Recommendations
- Process in batches of 10-20 questions
- Use Gemini for cost-effectiveness
- Monitor for failed calls
- Export results regularly

---

## 🐛 Troubleshooting

### Problem: "Failed to create question"
**Solutions**:
- Verify JWT token is valid
- Check FAQ ID exists
- Verify base URL is correct
- Check network connection

### Problem: "AI generation failed"
**Solutions**:
- Verify AI API key
- Check provider rate limits
- Try different AI model
- Check internet connection

### Problem: Multiple failed API calls
**Solutions**:
- Check JWT token expiration
- Verify API endpoint availability
- Check for rate limiting
- Review error messages

### Problem: Slow processing
**Solutions**:
- Process fewer questions at once
- Use faster AI model (Gemini Flash)
- Check network speed
- Verify API response times

---

## 💡 Pro Tips

1. **Start Small**: Test with 2-3 questions first
2. **Provide Context**: Use AI Instructions field for better results
3. **Monitor Status**: Watch the first question complete fully
4. **Save JWT**: Token is saved automatically
5. **Export Often**: Export results after each batch
6. **Use Gemini**: Free tier perfect for testing
7. **Retry Smart**: Use individual retry for specific failures
8. **Check Base URL**: Ensure it matches your API endpoint

## 🎯 Using AI Instructions Effectively

The AI Instructions field helps the AI understand your specific context and category. This leads to:
- **More relevant tags** that match your domain
- **Better synonyms** that use appropriate terminology
- **More accurate responses** tailored to your industry

### Examples of Good Instructions:

**E-commerce Platform:**
```
These questions are about an online shopping platform. 
Topics include: payment methods, shipping, returns, 
account management, and order tracking. Focus on 
customer support and technical assistance.
```

**Banking Services:**
```
These FAQs are for a digital banking application.
Categories: account opening, transactions, security,
cards, loans, and mobile banking. Use formal, 
professional language suitable for financial services.
```

**Technical Support:**
```
IT helpdesk questions for enterprise software.
Topics: login issues, software installation, 
troubleshooting, password resets, and system access.
Use technical but clear language.
```

**Healthcare Portal:**
```
Patient portal FAQs for a healthcare system.
Topics: appointments, medical records, billing,
prescriptions, and contact information. Use 
compassionate, clear, HIPAA-compliant language.
```

---

## 🎯 Success Criteria

A successful batch process should show:
- ✅ All questions processed
- ✅ 28 API calls per question = Success
- ✅ Green status indicators
- ✅ No error messages
- ✅ Export available

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review error messages
3. Try the retry mechanism
4. Export report for debugging
5. Contact API administrator if needed

---

**Built with ❤️ for efficient FAQ management**

