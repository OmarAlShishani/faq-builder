# 🔑 API Keys Guide

Complete guide to getting API keys for all supported AI providers.

---

## 🤖 OpenAI

### Step-by-Step:
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click on "API keys" in the sidebar
4. Click "Create new secret key"
5. Give it a name (e.g., "FAQ Builder")
6. Copy the key (starts with `sk-...`)
7. **Important**: Save it immediately - you can't see it again!

### Pricing:
- **GPT-4o Mini**: $0.150 / 1M input tokens, $0.600 / 1M output tokens
- **GPT-4o**: $5.00 / 1M input tokens, $15.00 / 1M output tokens
- **GPT-3.5 Turbo**: $0.50 / 1M input tokens, $1.50 / 1M output tokens

### Free Trial:
- $5 free credits for new accounts
- Enough for ~300-500 FAQ questions (with GPT-4o Mini)

### Notes:
- Best quality responses
- Most reliable API
- Requires credit card for continued use after trial

---

## 🔷 Google Gemini (DEFAULT & RECOMMENDED)

### Step-by-Step:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API key"
4. Click "Create API key in new project" or select existing project
5. Copy the generated API key
6. Save it securely

### Pricing:
- **Gemini 2.0 Flash**: $0.075 / 1M input tokens, $0.30 / 1M output tokens (Latest - DEFAULT)
- **Gemini 1.5 Flash**: $0.075 / 1M input tokens, $0.30 / 1M output tokens
- **Gemini 1.5 Pro**: $1.25 / 1M input tokens, $5.00 / 1M output tokens
- **Gemini 1.0 Pro**: $0.50 / 1M input tokens, $1.50 / 1M output tokens

### Free Tier:
- **Generous free tier**: 15 requests per minute
- **1,500 requests per day** for Gemini 1.5 Flash
- Perfect for moderate usage without any cost!

### Notes:
- **Fastest and cheapest** option
- Great free tier for testing
- Excellent quality for most use cases
- **Recommended for beginners**

---

## 🌐 OpenRouter

### Step-by-Step:
1. Go to [OpenRouter](https://openrouter.ai/keys)
2. Sign up with Google, GitHub, or email
3. Go to "Keys" section
4. Click "Create Key"
5. Name your key (e.g., "FAQ Builder")
6. Set spending limits (optional but recommended)
7. Copy the key (starts with `sk-...`)

### Pricing:
Varies by model. Popular options:
- **GPT-4o Mini**: $0.15 / 1M input tokens
- **Claude 3.5 Sonnet**: $3.00 / 1M input tokens
- **Llama 3.1 70B**: $0.35 / 1M input tokens
- **Gemini Pro**: $0.125 / 1M input tokens
- **Mistral Large**: $2.00 / 1M input tokens

### Free Credits:
- Sometimes offers promotional credits
- Check their website for current offers

### Notes:
- Access to **50+ AI models** with one API key
- Great for testing different models
- Built-in cost tracking and limits
- Can set per-key spending limits for safety

---

## 💰 Cost Comparison

For processing **100 FAQ questions** (typical usage):

| Provider | Model | Estimated Cost | Speed | Quality |
|----------|-------|----------------|-------|---------|
| **Gemini (DEFAULT)** | **2.0 Flash** | **FREE** or $0.05 | ⚡⚡⚡ Very Fast | ⭐⭐⭐⭐⭐ Excellent |
| Gemini | 1.5 Flash | **FREE** or $0.05 | ⚡⚡⚡ Very Fast | ⭐⭐⭐⭐ Excellent |
| OpenAI | GPT-4o Mini | $1-2 | ⚡⚡ Fast | ⭐⭐⭐⭐⭐ Best |
| OpenRouter | GPT-4o Mini | $1-2 | ⚡⚡ Fast | ⭐⭐⭐⭐⭐ Best |
| Gemini | 1.5 Pro | $0.10-0.20 | ⚡⚡ Fast | ⭐⭐⭐⭐⭐ Best |
| OpenAI | GPT-4o | $5-10 | ⚡ Medium | ⭐⭐⭐⭐⭐ Best |
| OpenRouter | Claude 3.5 | $3-6 | ⚡ Medium | ⭐⭐⭐⭐⭐ Best |

---

## 🎯 Recommendations

### For Beginners:
**Already Selected: Google Gemini 2.0 Flash (DEFAULT)**
- ✅ Pre-configured in the tool
- ✅ Free tier is generous (1,500/day)
- ✅ No credit card required initially
- ✅ Fastest processing
- ✅ Latest AI technology
- ✅ Great quality

### For Best Quality:
**Choose: OpenAI (GPT-4o Mini)**
- ✅ Most reliable
- ✅ Consistent quality
- ✅ Great documentation
- ⚠️ Requires payment after trial

### For Experimentation:
**Choose: OpenRouter**
- ✅ Access to many models
- ✅ Compare different AI models
- ✅ One key for everything
- ✅ Good cost tracking

### For High Volume:
**Choose: Gemini (Flash) or OpenRouter (Llama)**
- ✅ Very affordable
- ✅ Fast processing
- ✅ Good quality/cost ratio

---

## 🔒 Security Best Practices

1. **Never share your API keys** publicly
2. **Don't commit them to GitHub** (use .gitignore)
3. **Rotate keys regularly** if used in production
4. **Set spending limits** when possible
5. **Monitor your usage** in provider dashboards
6. **Use different keys** for different projects

---

## ⚠️ Important Notes

### API Key Storage
- Keys are stored in your browser's localStorage
- They never leave your computer except to call the AI API
- Clear browser data will delete saved keys

### Rate Limits
- **OpenAI**: Depends on your tier (usually 60 requests/min)
- **Gemini**: 15 requests/min (free tier), 1500/day
- **OpenRouter**: Varies by model

### Support
- **OpenAI**: [help.openai.com](https://help.openai.com)
- **Gemini**: [ai.google.dev/docs](https://ai.google.dev/docs)
- **OpenRouter**: [openrouter.ai/docs](https://openrouter.ai/docs)

---

## 🚀 Quick Start After Getting Key

1. Open `index.html` in your browser
2. Select your AI provider from dropdown
3. Choose a model
4. Paste your API key
5. Start processing questions!

Your settings are saved automatically for next time.

---

**Happy FAQ Building! 🎉**


