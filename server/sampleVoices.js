// 100% Free & Unlimited Voices (Indian & Global Languages, No Subscription Needed)
const FREE_VOICES = [
  {
    voice_id: "free_char_girl",
    name: "Aanya (आन्या / Cute Girl)",
    category: "free",
    sub_category: "character",
    lang: "en",
    language_name: "Cute Girl Voice (आन्या)",
    flag: "👧",
    font_class: "font-girl",
    labels: {
      accent: "Cute & Sweet",
      description: "Hii, my name is Aanya, how are you?",
      gender: "female",
      use_case: "Kids Stories & Friendly",
      character_type: "girl",
      isFree: true
    },
    sample_text: "Hii, my name is Aanya, how are you?",
    preview_url: "/api/demo-audio?voice_id=free_char_girl"
  },
  {
    voice_id: "free_char_boy",
    name: "Udit (उदित / Playful Boy)",
    category: "free",
    sub_category: "character",
    lang: "en",
    language_name: "Playful Boy Voice (उदित)",
    flag: "👦",
    font_class: "font-boy",
    labels: {
      accent: "Energetic & Playful",
      description: "Hi, I am Udit, how are you?",
      gender: "male",
      use_case: "Adventure & Games",
      character_type: "boy",
      isFree: true
    },
    sample_text: "Hi, I am Udit, how are you?",
    preview_url: "/api/demo-audio?voice_id=free_char_boy"
  },
  {
    voice_id: "free_char_robot",
    name: "Robo-X9 (रोबोट / Sci-Fi Robot)",
    category: "free",
    sub_category: "character",
    lang: "en",
    language_name: "Robotic Sci-Fi AI (रोबोट)",
    flag: "🤖",
    font_class: "font-robot",
    labels: {
      accent: "Metallic & Futuristic",
      description: "Cybernetic android AI synth",
      gender: "robot",
      use_case: "Sci-Fi & Mech",
      character_type: "robot",
      isFree: true
    },
    sample_text: "System diagnostics online. I am Robo-X9. All vocal transmission circuits operational.",
    preview_url: "/api/demo-audio?voice_id=free_char_robot"
  },
  {
    voice_id: "free_char_cartoon",
    name: "Pip (कार्टून / Cartoon Character)",
    category: "free",
    sub_category: "character",
    lang: "en",
    language_name: "Cartoon Character (कार्टून)",
    flag: "🎭",
    font_class: "font-cartoon",
    labels: {
      accent: "Playful & Bouncy",
      description: "Funny animated mascot & comic hero voice",
      gender: "cartoon",
      use_case: "Animation & Fun",
      character_type: "cartoon",
      isFree: true
    },
    sample_text: "Yay! Hey there, I am Pip the cartoon character! Let's have some awesome fun!",
    preview_url: "/api/demo-audio?voice_id=free_char_cartoon"
  },
  {
    voice_id: "free_hi_aarav",
    name: "Aarav (आरव)",
    category: "free",
    sub_category: "free_indian",
    lang: "hi",
    language_name: "Hindi (हिंदी)",
    flag: "🇮🇳",
    labels: {
      accent: "Hindi (हिंदी)",
      description: "Warm & Clear",
      gender: "male",
      use_case: "Narration & Stories",
      isFree: true
    },
    sample_text: "नमस्ते, वोक्सएआई स्टूडियो में आपका स्वागत है। यहाँ आप बिना किसी सब्सक्रिप्शन के मुफ्त में आवाज़ बना सकते हैं।",
    preview_url: "/api/demo-audio?voice_id=free_hi_aarav"
  },
  {
    voice_id: "free_hi_ananya",
    name: "Ananya (अनन्या)",
    category: "free",
    sub_category: "free_indian",
    lang: "hi",
    language_name: "Hindi (हिंदी)",
    flag: "🇮🇳",
    labels: {
      accent: "Hindi (हिंदी)",
      description: "Expressive & Melodic",
      gender: "female",
      use_case: "Conversational & News",
      isFree: true
    },
    sample_text: "नमस्ते! आज का दिन आपके लिए शुभ और प्रेरणादायक हो। वोक्सएआई में आपका स्वागत है।",
    preview_url: "/api/demo-audio?voice_id=free_hi_ananya"
  },
  {
    voice_id: "free_gu_arjun",
    name: "Arjun (અર્જુન)",
    category: "free",
    sub_category: "free_indian",
    lang: "gu",
    language_name: "Gujarati (ગુજરાતી)",
    flag: "🇮🇳",
    labels: {
      accent: "Gujarati (ગુજરાતી)",
      description: "Crisp & Energetic",
      gender: "male",
      use_case: "Business & Stories",
      isFree: true
    },
    sample_text: "નમસ્તે, તમારું ખૂબ ખૂબ સ્વાગત છે. આ વોઇસ જનરેટર સંપૂર્ણપણે મફત અને સરળ છે.",
    preview_url: "/api/demo-audio?voice_id=free_gu_arjun"
  },
  {
    voice_id: "free_mr_tanvi",
    name: "Tanvi (तन्वी)",
    category: "free",
    sub_category: "free_indian",
    lang: "mr",
    language_name: "Marathi (मराठी)",
    flag: "🇮🇳",
    labels: {
      accent: "Marathi (मराठी)",
      description: "Cultured & Fluent",
      gender: "female",
      use_case: "Audiobooks & Drama",
      isFree: true
    },
    sample_text: "नमस्कार! आपले मनापासून स्वागत आहे. आता कोणत्याही वर्गणीशिवाय मोफत आवाज तयार करा.",
    preview_url: "/api/demo-audio?voice_id=free_mr_tanvi"
  },
  {
    voice_id: "free_bn_sourav",
    name: "Sourav (সৌরভ)",
    category: "free",
    sub_category: "free_indian",
    lang: "bn",
    language_name: "Bengali (বাংলা)",
    flag: "🇮🇳",
    labels: {
      accent: "Bengali (বাংলা)",
      description: "Rich & Resonant",
      gender: "male",
      use_case: "Literature & Documentaries",
      isFree: true
    },
    sample_text: "নমস্কার! আমাদের ভয়েস স্টুডিওতে আপনাকে স্বাগতম। বাংলা ভয়েস এখন সম্পূর্ণ বিনামূল্যে।",
    preview_url: "/api/demo-audio?voice_id=free_bn_sourav"
  },
  {
    voice_id: "free_as_pari",
    name: "Pari (পৰী)",
    category: "free",
    sub_category: "free_indian",
    lang: "bn",
    language_name: "Assamese (অসমীয়া)",
    flag: "🇮🇳",
    labels: {
      accent: "Assamese (অসমীয়া)",
      description: "Gentle & Rhythmic",
      gender: "female",
      use_case: "Traditional & Media",
      isFree: true
    },
    sample_text: "নমস্কাৰ! আপোনালোকক অসমীয়াত আন্তৰিক স্বাগতম জনাইছো।",
    preview_url: "/api/demo-audio?voice_id=free_as_pari"
  },
  {
    voice_id: "free_kn_praveen",
    name: "Praveen (ಪ್ರವೀಣ್)",
    category: "free",
    sub_category: "free_indian",
    lang: "kn",
    language_name: "Kannada (ಕನ್ನಡ)",
    flag: "🇮🇳",
    labels: {
      accent: "Kannada (ಕನ್ನಡ)",
      description: "Authoritative & Clear",
      gender: "male",
      use_case: "Presentations & News",
      isFree: true
    },
    sample_text: "ನಮಸ್ಕಾರ! ಕನ್ನಡ ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆಗೆ ಎಲ್ಲರಿಗೂ ಪ್ರೀತಿಯ ಸುಸ್ವಾಗತ.",
    preview_url: "/api/demo-audio?voice_id=free_kn_praveen"
  },
  {
    voice_id: "free_raj_keshav",
    name: "Keshav (केसव)",
    category: "free",
    sub_category: "free_indian",
    lang: "hi",
    language_name: "Rajasthani (राजस्थानी)",
    flag: "🇮🇳",
    labels: {
      accent: "Rajasthani (राजस्थानी)",
      description: "Traditional & Soulful",
      gender: "male",
      use_case: "Folk & Cultural Stories",
      isFree: true
    },
    sample_text: "खम्मा घणी सा! आपरो राजस्थानी वोक्सएआई में घणो घणो स्वागत है।",
    preview_url: "/api/demo-audio?voice_id=free_raj_keshav"
  },
  {
    voice_id: "free_en_uk_oliver",
    name: "Oliver (UK British)",
    category: "free",
    sub_category: "free_global",
    lang: "en-gb",
    language_name: "English (United Kingdom)",
    flag: "🇬🇧",
    labels: {
      accent: "British (UK)",
      description: "Sophisticated & Polished",
      gender: "male",
      use_case: "Documentary & Formal Narration",
      isFree: true
    },
    sample_text: "Good day, welcome to the audio studio. Experience effortless, subscription-free speech synthesis.",
    preview_url: "/api/demo-audio?voice_id=free_en_uk_oliver"
  },
  {
    voice_id: "free_en_us_sophia",
    name: "Sophia (US American)",
    category: "free",
    sub_category: "free_global",
    lang: "en-us",
    language_name: "English (United States)",
    flag: "🇺🇸",
    labels: {
      accent: "American (US)",
      description: "Modern & Engaging",
      gender: "female",
      use_case: "Commercials & Podcasts",
      isFree: true
    },
    sample_text: "Hello there! Create high impact voiceovers with zero cost or subscription needed.",
    preview_url: "/api/demo-audio?voice_id=free_en_us_sophia"
  },
  {
    voice_id: "free_de_maximilian",
    name: "Maximilian (Deutsch)",
    category: "free",
    sub_category: "free_global",
    lang: "de",
    language_name: "German (Deutsch)",
    flag: "🇩🇪",
    labels: {
      accent: "German (Deutsch)",
      description: "Precise & Confident",
      gender: "male",
      use_case: "Corporate & Technical",
      isFree: true
    },
    sample_text: "Guten Tag, herzlich willkommen im Sprachstudio. Erstellen Sie hochwertige Sprachausgaben völlig kostenlos.",
    preview_url: "/api/demo-audio?voice_id=free_de_maximilian"
  },
  {
    voice_id: "free_fr_camille",
    name: "Camille (Français)",
    category: "free",
    sub_category: "free_global",
    lang: "fr",
    language_name: "French (Français)",
    flag: "🇫🇷",
    labels: {
      accent: "French (Français)",
      description: "Smooth & Melodic",
      gender: "female",
      use_case: "Cinema & Expressive Stories",
      isFree: true
    },
    sample_text: "Bonjour et bienvenue. Profitez d'une synthèse vocale fluide et totalement gratuite.",
    preview_url: "/api/demo-audio?voice_id=free_fr_camille"
  },
  {
    voice_id: "free_ta_kavitha",
    name: "Kavitha (கவிதா)",
    category: "free",
    sub_category: "free_indian",
    lang: "ta",
    language_name: "Tamil (தமிழ்)",
    flag: "🇮🇳",
    labels: {
      accent: "Tamil (தமிழ்)",
      description: "Warm & Clear",
      gender: "female",
      use_case: "Media & Education",
      isFree: true
    },
    sample_text: "வணக்கம்! உங்களை அன்போடு வரவேற்கிறோம்.",
    preview_url: "/api/demo-audio?voice_id=free_ta_kavitha"
  },
  {
    voice_id: "free_te_vijay",
    name: "Vijay (విజయ్)",
    category: "free",
    sub_category: "free_indian",
    lang: "te",
    language_name: "Telugu (తెలుగు)",
    flag: "🇮🇳",
    labels: {
      accent: "Telugu (తెలుగు)",
      description: "Dynamic & Resonant",
      gender: "male",
      use_case: "Cinema & Narration",
      isFree: true
    },
    sample_text: "నమస్కారం! మీకు హృదయపూర్వక స్వాగతం.",
    preview_url: "/api/demo-audio?voice_id=free_te_vijay"
  },
  {
    voice_id: "free_pa_gurpreet",
    name: "Gurpreet (ਗੁਰਪ੍ਰੀਤ)",
    category: "free",
    sub_category: "free_indian",
    lang: "pa",
    language_name: "Punjabi (ਪੰਜਾਬੀ)",
    flag: "🇮🇳",
    labels: {
      accent: "Punjabi (ਪੰਜਾਬੀ)",
      description: "Vibrant & Warm",
      gender: "male",
      use_case: "Folk & Storytelling",
      isFree: true
    },
    sample_text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ! ਤੁਹਾਡਾ ਸਾਡੇ ਸਟੂਡੀਓ ਵਿੱਚ ਸਵਾਗਤ ਹੈ।",
    preview_url: "/api/demo-audio?voice_id=free_pa_gurpreet"
  }
];

// Official ElevenLabs pre-made voices with public preview audio & metadata
const DEFAULT_VOICES = [
  {
    voice_id: "CwhRBWXzGAHq8TQ4Fs17",
    name: "Roger",
    category: "premade",
    labels: { accent: "american", description: "laid-back, casual, resonant", age: "middle aged", gender: "male", use_case: "conversational" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/CwhRBWXzGAHq8TQ4Fs17/df920e58-6927-4638-9475-b9d5c8052eb1.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    category: "premade",
    labels: { accent: "american", description: "deep", age: "middle aged", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pNInz6obpgDQGcFmaJgB/6734d750-4d5e-4c74-a035-7c30089f3cb1.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "ErXwobaYiN019PkySvjV",
    name: "Antoni",
    category: "premade",
    labels: { accent: "american", description: "well-rounded", age: "young", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/ErXwobaYiN019PkySvjV/38d8f8f0-0412-4217-bc2a-71b53c15aa1f.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella",
    category: "premade",
    labels: { accent: "american", description: "soft", age: "young", gender: "female", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/092e03d4-9d5f-40e8-be0c-e2f5b66d6910.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "VR6AewLTigWG4qcVjk42",
    name: "Arnold",
    category: "premade",
    labels: { accent: "american", description: "crisp", age: "middle aged", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/VR6AewLTigWG4qcVjk42/a322eaee-9d04-4ccf-a89a-0e6259022ee7.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "AZnzlk1XvdvUeBnXmlld",
    name: "Domi",
    category: "premade",
    labels: { accent: "american", description: "strong", age: "young", gender: "female", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/AZnzlk1XvdvUeBnXmlld/508e64d0-a08b-4b13-94c6-48f8c7b415a7.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "MF3mGyEYCl7XYWbV9V6O",
    name: "Elli",
    category: "premade",
    labels: { accent: "american", description: "emotional", age: "young", gender: "female", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/MF3mGyEYCl7XYWbV9V6O/2f5343f8-c578-4ea8-aa92-f04eb25b6a7a.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "TxGEqnHWrfWFTfGW9XjX",
    name: "Josh",
    category: "premade",
    labels: { accent: "american", description: "deep", age: "young", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/TxGEqnHWrfWFTfGW9XjX/3a1ab775-472f-4d27-beab-ff93b6e82502.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "yoZ06aMxZJJ28mfd3POQ",
    name: "Sam",
    category: "premade",
    labels: { accent: "american", description: "raspy", age: "young", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/yoZ06aMxZJJ28mfd3POQ/b09e25d4-cc1d-40d9-95e2-63dd17e3f889.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "JBFqnCBsd6RMkjVDRZzb",
    name: "George",
    category: "premade",
    labels: { accent: "british", description: "warm", age: "middle aged", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/JBFqnCBsd6RMkjVDRZzb/e6206d1a-0721-4787-ac34-a00270a6c6cc.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "XB0fDUnXU5powFXDhCwa",
    name: "Charlotte",
    category: "premade",
    labels: { accent: "english-swedish", description: "seductive", age: "middle aged", gender: "female", use_case: "video games" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/XB0fDUnXU5powFXDhCwa/942356dc-f10d-4d23-9c59-a9a3b9d4e5d6.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "Xb7hH8MSUJpSbSDYk0k2",
    name: "Alice",
    category: "premade",
    labels: { accent: "british", description: "confident", age: "middle aged", gender: "female", use_case: "news" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/Xb7hH8MSUJpSbSDYk0k2/d10f7534-11f6-41fe-a012-2de1e4713d07.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "XrExE9yKIg1WjnnlVkGX",
    name: "Matilda",
    category: "premade",
    labels: { accent: "american", description: "warm", age: "middle aged", gender: "female", use_case: "audiobook" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/XrExE9yKIg1WjnnlVkGX/b930e18d-6b4d-4a45-9c3b-5d1730d74a41.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "bIHbv24MWmeRgasZH58o",
    name: "Will",
    category: "premade",
    labels: { accent: "american", description: "friendly", age: "young", gender: "male", use_case: "social media" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/bIHbv24MWmeRgasZH58o/8caf3071-700d-4001-aa8e-49b084920fc9.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "cgSgspJ2msm6clMCkdW9",
    name: "Jessica",
    category: "premade",
    labels: { accent: "american", description: "expressive", age: "young", gender: "female", use_case: "conversational" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/cgSgspJ2msm6clMCkdW9/56a97bf8-b69b-448f-846c-c3a11683d45a.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "nPczCjzI2devNBz1zQrb",
    name: "Brian",
    category: "premade",
    labels: { accent: "american", description: "deep", age: "middle aged", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/nPczCjzI2devNBz1zQrb/2dd3e1e5-5d07-42b8-b4b1-87271424e2c8.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "onwK4e9ZLuTAKqWW03F9",
    name: "Daniel",
    category: "premade",
    labels: { accent: "british", description: "authoritative", age: "middle aged", gender: "male", use_case: "news" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/onwK4e9ZLuTAKqWW03F9/79ced44a-0a25-455b-80a5-f09d846fd20f.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "pFZP5JQG7iQjIQuC4Bku",
    name: "Lily",
    category: "premade",
    labels: { accent: "british", description: "warm", age: "middle aged", gender: "female", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pFZP5JQG7iQjIQuC4Bku/15b54e83-fcd2-425e-9737-074624712497.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  },
  {
    voice_id: "pqHfZKP75CvOlQylNhV4",
    name: "Bill",
    category: "premade",
    labels: { accent: "american", description: "trustworthy", age: "old", gender: "male", use_case: "narration" },
    preview_url: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pqHfZKP75CvOlQylNhV4/d782b3ff-84ba-4029-9fa8-ae9fcf084534.mp3",
    high_quality_base_model_ids: ["eleven_multilingual_v2", "eleven_turbo_v2_5"]
  }
];

const DEFAULT_MODELS = [
  {
    model_id: "eleven_multilingual_v2",
    name: "Eleven Multilingual v2",
    description: "Cutting-edge multilingual model supporting 29 languages. Unmatched emotional range and human-like natural delivery.",
    can_be_finetuned: false,
    can_do_text_to_speech: true,
    can_do_voice_conversion: true,
    languages: [
      { language_id: "en", name: "English" },
      { language_id: "es", name: "Spanish" },
      { language_id: "fr", name: "French" },
      { language_id: "de", name: "German" },
      { language_id: "it", name: "Italian" },
      { language_id: "pt", name: "Portuguese" },
      { language_id: "pl", name: "Polish" },
      { language_id: "hi", name: "Hindi" },
      { language_id: "ja", name: "Japanese" },
      { language_id: "zh", name: "Chinese" },
      { language_id: "ko", name: "Korean" },
      { language_id: "ar", name: "Arabic" },
      { language_id: "ru", name: "Russian" }
    ],
    badge: "Most Expressive",
    latency: "Normal (~400ms)"
  },
  {
    model_id: "eleven_flash_v2_5",
    name: "Eleven Flash v2.5",
    description: "Ultra-fast generation (~75ms latency) at 50% lower cost. Optimized for conversational streaming, real-time agents and gaming.",
    can_be_finetuned: false,
    can_do_text_to_speech: true,
    can_do_voice_conversion: false,
    languages: [
      { language_id: "en", name: "English" },
      { language_id: "es", name: "Spanish" },
      { language_id: "fr", name: "French" },
      { language_id: "de", name: "German" },
      { language_id: "ja", name: "Japanese" }
    ],
    badge: "Ultra Fast",
    latency: "Ultra-Low (~75ms)"
  },
  {
    model_id: "eleven_turbo_v2_5",
    name: "Eleven Turbo v2.5",
    description: "High quality combined with high speed. Great balance for long-form audio narration, blogs and podcasts.",
    can_be_finetuned: false,
    can_do_text_to_speech: true,
    can_do_voice_conversion: true,
    languages: [
      { language_id: "en", name: "English" },
      { language_id: "es", name: "Spanish" },
      { language_id: "fr", name: "French" },
      { language_id: "de", name: "German" }
    ],
    badge: "Balanced Speed",
    latency: "Low (~200ms)"
  },
  {
    model_id: "eleven_monolingual_v1",
    name: "Eleven English v1",
    description: "Classic high-stability English speech synthesis. Ideal for formal audiobooks, tutorials, and clear voiceovers.",
    can_be_finetuned: true,
    can_do_text_to_speech: true,
    can_do_voice_conversion: true,
    languages: [
      { language_id: "en", name: "English" }
    ],
    badge: "High Stability",
    latency: "Normal (~450ms)"
  },
  {
    model_id: "free_indic_neural",
    name: "Free Indic & Global Engine",
    description: "100% Free & Unlimited. No subscription required. Instant synthesis for Hindi, Gujarati, Marathi, Assamese, Rajasthani, Kannada, Bengali, UK/US English, German & French.",
    can_be_finetuned: false,
    can_do_text_to_speech: true,
    can_do_voice_conversion: false,
    languages: [
      { language_id: "hi", name: "Hindi" },
      { language_id: "gu", name: "Gujarati" },
      { language_id: "mr", name: "Marathi" },
      { language_id: "bn", name: "Bengali / Assamese" },
      { language_id: "kn", name: "Kannada" },
      { language_id: "en", name: "English (UK/US)" },
      { language_id: "de", name: "German" },
      { language_id: "fr", name: "French" }
    ],
    badge: "100% Free • Unlimited",
    latency: "Instant (~150ms)",
    isFree: true
  }
];

module.exports = {
  FREE_VOICES,
  DEFAULT_VOICES,
  DEFAULT_MODELS
};
