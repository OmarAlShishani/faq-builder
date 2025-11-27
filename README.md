# FAQ Builder - AI Powered Tool

## Overview
An advanced HTML tool powered by AI that transforms FAQ questions into comprehensive, bilingual content with synonyms, multiple answers, and tags. Supports multiple AI providers for maximum flexibility.

## Features

✨ **Bilingual Support**: Works with both Arabic and English questions
🤖 **Multiple AI Providers**: Choose between OpenAI, Google Gemini, or OpenRouter
🎯 **Model Selection**: Select your preferred AI model from each provider
🔄 **Smart Rephrasing**: Rephrases questions in both Arabic and English
🔤 **Synonym Generation**: Creates 10 synonyms for each question in both languages
^^  **Formatted Synonyms**: Generates synonyms with ^^ instead of spaces
💡 **Multiple Answers**: Provides 5 detailed answers for each question
🏷️ **Auto-Tagging**: Generates relevant tags for categorization
💾 **Export Functionality**: Export all data to JSON format with metadata
📋 **Copy to Clipboard**: Easy copying of any section

## Supported AI Providers

### 1. OpenAI
- **Models**: GPT-4o Mini, GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Get API Key**: [OpenAI Platform](https://platform.openai.com/api-keys)
- **Best For**: General purpose, high quality responses

### 2. Google Gemini (Default)
- **Models**: Gemini 2.0 Flash (Latest), Gemini 1.5 Flash, Gemini 1.5 Pro, Gemini 1.0 Pro
- **Get API Key**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Best For**: Fast processing, cost-effective, FREE tier available

### 3. OpenRouter
- **Models**: Access to 50+ models including GPT-4o, Claude, Llama, Mistral
- **Get API Key**: [OpenRouter](https://openrouter.ai/keys)
- **Best For**: Maximum flexibility, model comparison

## How to Use

### Step 1: Choose Your AI Provider & Get API Key

**Option A: OpenAI**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (starts with `sk-`)

**Option B: Google Gemini**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Create API key
4. Copy the key

**Option C: OpenRouter**
1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (starts with `sk-`)

### Step 2: Open the Tool
1. Simply open `index.html` in any modern web browser
2. No installation or server required!

### Step 3: Configure AI Settings
1. Select your AI Provider from the dropdown (OpenAI, Gemini, or OpenRouter)
2. Choose your preferred Model
3. Paste your API key
4. Settings are saved automatically for next time

### Step 4: Enter Questions
1. Type or paste your FAQ questions in the text area
2. Put each question on a new line
3. Questions can be in Arabic, English, or both

Example:
```
كيف يمكنني إعادة تعيين كلمة المرور؟
How do I reset my password?
ما هي طريقة الدفع المتاحة؟
```

### Step 5: Process
1. Click the "🚀 Process Questions" button
2. Wait for the AI to process (may take 10-30 seconds per question)
3. Review the results

### Step 6: Use the Results
- **Copy**: Click any "Copy" button to copy that section
- **Export**: Click "💾 Export to JSON" to download all data

## Output Format

For each question, you'll get:

1. **Original Question**: Your input question
2. **Rephrased Arabic**: Professional Arabic version
3. **Rephrased English**: Professional English version
4. **Synonyms Arabic**: 10 alternative phrasings in Arabic
5. **Synonyms English**: 10 alternative phrasings in English
6. **Formatted Synonyms (Arabic)**: Same as above with ^^ for spaces
7. **Formatted Synonyms (English)**: Same as above with ^^ for spaces
8. **5 Answers**: Detailed, helpful responses
9. **Tags**: Relevant categorization tags

## Technical Details

- **AI Providers**: Supports OpenAI, Google Gemini, and OpenRouter APIs
- **No Backend**: Runs entirely in the browser
- **Privacy**: Your API key stays in your browser (localStorage)
- **Browser Support**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- **Dynamic Model Selection**: Choose the best model for your needs and budget

## Cost Estimates

**OpenAI:**
- GPT-4o Mini: ~$0.01-0.02 per question (Recommended)
- GPT-4o: ~$0.05-0.10 per question
- GPT-3.5 Turbo: ~$0.005-0.01 per question

**Google Gemini:**
- Gemini 1.5 Flash: ~$0.001-0.005 per question (Very affordable!)
- Gemini 1.5 Pro: ~$0.01-0.02 per question

**OpenRouter:**
- Varies by model, typically $0.001-0.10 per question
- Access to 50+ models with different pricing

*Note: Costs are approximate and depend on question complexity and response length.*

## Troubleshooting

**Problem**: "API request failed" error
- **Solution**: 
  - Verify your API key is valid and has credits
  - Check that you selected the correct provider
  - For Gemini: Ensure you have the API enabled in Google Cloud Console

**Problem**: No results showing
- **Solution**: Check browser console (F12) for errors and network requests

**Problem**: Slow processing
- **Solution**: This is normal - AI processing takes time. Try:
  - Using faster models (Gemini Flash, GPT-4o Mini)
  - Processing fewer questions at once
  - Checking your internet connection

**Problem**: Model not working
- **Solution**: Some models require specific permissions or credits. Try switching to a different model.

## Privacy & Security

- ✅ API key stored only in your browser's localStorage
- ✅ Direct connection to OpenAI (no intermediary servers)
- ✅ No data collection or tracking
- ✅ All processing happens in real-time

## Example Use Cases

1. **Customer Support**: Build comprehensive FAQ sections
2. **Documentation**: Create multilingual help content
3. **Chatbot Training**: Generate training data with synonyms
4. **SEO**: Create content variations for better search coverage
5. **Knowledge Base**: Develop detailed Q&A resources

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## License

Free to use and modify for personal and commercial projects.

---

**Created with ❤️ for efficient FAQ management**

