// Simplified AI service for Jharkhand Tourism Assistant
// This provides mock responses until Google Generative AI can be installed

import { Message, Language, Languages, Feature } from '@/types/chatbot-types';

// Mock AI responses for different features
const mockResponses: Record<Feature, Record<Language, string>> = {
  [Feature.ITINERARY]: {
    en: "I'd love to help you plan your Jharkhand itinerary! Here's a suggested 3-day plan:\n\n**Day 1: Ranchi**\n- Visit Jagannath Temple\n- Explore Rock Garden\n- Evening at Ranchi Lake\n\n**Day 2: Netarhat**\n- Sunrise at Netarhat Hill Station\n- Visit Magnolia Point\n- Local tribal culture experience\n\n**Day 3: Jamshedpur**\n- Tata Steel Zoological Park\n- Jubilee Park\n- Dalma Wildlife Sanctuary\n\nWould you like me to customize this based on your interests?",
    hi: "मैं आपकी झारखंड यात्रा की योजना बनाने में मदद करना चाहूंगा! यहां 3 दिन की सुझावित योजना है:\n\n**दिन 1: रांची**\n- जगन्नाथ मंदिर\n- रॉक गार्डन\n- रांची झील\n\n**दिन 2: नेतरहाट**\n- नेतरहाट हिल स्टेशन पर सूर्योदय\n- मैग्नोलिया पॉइंट\n- स्थानीय आदिवासी संस्कृति\n\n**दिन 3: जमशेदपुर**\n- टाटा स्टील चिड़ियाघर\n- जुबली पार्क\n- दलमा वन्यजीव अभयारण्य",
    bn: "আমি আপনার ঝাড়খণ্ড ভ্রমণ পরিকল্পনায় সাহায্য করতে চাই! এখানে একটি ৩ দিনের প্রস্তাবিত পরিকল্পনা:",
    mr: "मी तुमच्या झारखंड प्रवासाची योजना करण्यात मदत करू इच्छितो! येथे ३ दिवसाची सुचविलेली योजना आहे:",
    te: "నేను మీ ఝార్ఖండ్ ప్రయాణ ప్రణాళికలో సహాయం చేయాలనుకుంటున్నాను! ఇక్కడ 3 రోజుల సూచిత ప్రణాళిక ఉంది:",
    ta: "உங்கள் ஜார்க்கண்ட் பயணத்தைத் திட்டமிடுவதில் நான் உதவ விரும்புகிறேன்! இங்கே 3 நாள் பரிந்துரைக்கப்பட்ட திட்டம் உள்ளது:"
  },
  [Feature.SOUVENIR]: {
    en: "Jharkhand has amazing handicrafts! Here are some must-buy souvenirs:\n\n**🎨 Traditional Crafts:**\n- Dhokra Art (metal casting)\n- Paitkar Paintings (scroll art)\n- Sohrai Murals\n\n**🧵 Textiles:**\n- Tussar Silk Sarees\n- Kuchai Silk products\n\n**🏺 Pottery:**\n- Handmade Terracotta items\n\n**Where to Buy:**\n- Main Road Market, Ranchi\n- Tribal Museum Shop\n- Local artisan villages\n\nWould you like specific shop recommendations?",
    hi: "झारखंड में अद्भुत हस्तशिल्प हैं! यहां कुछ जरूरी स्मृति चिन्ह हैं:\n\n**🎨 पारंपरिक शिल्प:**\n- ढोकरा कला\n- पैतकर चित्रकारी\n- सोहराई भित्ति चित्र\n\n**🧵 वस्त्र:**\n- तसर सिल्क साड़ी\n- कुचाई सिल्क उत्पाद\n\n**🏺 मिट्टी के बर्तन:**\n- हाथ से बने टेराकोटा आइटम",
    bn: "ঝাড়খণ্ডে আশ্চর্যজনক হস্তশিল্প রয়েছে! এখানে কিছু অবশ্যই কেনার মতো স্মারক রয়েছে:",
    mr: "झारखंडमध्ये आश्चर्यकारक हस्तकला आहेत! येथे काही आवश्यक स्मृतिचिन्हे आहेत:",
    te: "ఝార్ఖండ్‌లో అద్భుతమైన చేతిపనులు ఉన్నాయి! ఇక్కడ కొన్ని తప్పనిసరిగా కొనుగోలు చేయవలసిన జ్ఞాపికలు ఉన్నాయి:",
    ta: "ஜார்க்கண்டில் அற்புதமான கைவினைப்பொருட்கள் உள்ளன! இங்கே சில அவசியம் வாங்க வேண்டிய நினைவுப்பொருட்கள் உள்ளன:"
  },
  [Feature.LOCATION]: {
    en: "Jharkhand has incredible places to explore! Here are some top recommendations:\n\n**🏛️ Historical Sites:**\n- Jagannath Temple, Ranchi\n- Pahari Mandir\n- Deori Temple\n\n**🌲 Natural Beauty:**\n- Netarhat Hill Station\n- Betla National Park\n- Hundru Falls\n\n**🏭 Modern Attractions:**\n- Tata Steel Plant (guided tours)\n- Science Centre, Jamshedpur\n\nWhich type of location interests you most?",
    hi: "झारखंड में घूमने के लिए अविश्वसनीय स्थान हैं! यहां कुछ शीर्ष सिफारिशें हैं:\n\n**🏛️ ऐतिहासिक स्थल:**\n- जगन्नाथ मंदिर, रांची\n- पहाड़ी मंदिर\n- देवरी मंदिर\n\n**🌲 प्राकृतिक सुंदरता:**\n- नेतरहाट हिल स्टेशन\n- बेतला राष्ट्रीय उद्यान\n- हुंडरू जलप्रपात",
    bn: "ঝাড়খণ্ডে অন্বেষণ করার জন্য অবিশ্বাস্য জায়গা রয়েছে! এখানে কিছু শীর্ষ সুপারিশ রয়েছে:",
    mr: "झारखंडमध्ये अन्वेषण करण्यासाठी अविश्वसनीय ठिकाणे आहेत! येथे काही शीर्ष शिफारसी आहेत:",
    te: "ఝార్ఖండ్‌లో అన్వేషించడానికి అద్భుతమైన ప్రదేశాలు ఉన్నాయి! ఇక్కడ కొన్ని అగ్ర సిఫార్సులు ఉన్నాయి:",
    ta: "ஜார்க்கண்டில் ஆராய்வதற்கு நம்பமுடியாத இடங்கள் உள்ளன! இங்கே சில சிறந்த பரிந்துரைகள் உள்ளன:"
  },
  [Feature.LANGUAGE]: {
    en: "I can help you with languages spoken in Jharkhand!\n\n**Main Languages:**\n- Hindi (हिन्दी) - widely spoken\n- Santhali - tribal language\n- Nagpuri - regional language\n- English - in urban areas\n\n**Useful Phrases:**\n- Hello: Namaste (na-mas-te)\n- Thank you: Dhanyawad (dhan-ya-waad)\n- How much?: Kitna hai? (kit-na hai?)\n\nWhich language would you like help with?",
    hi: "मैं झारखंड में बोली जाने वाली भाषाओं में आपकी मदद कर सकता हूं!\n\n**मुख्य भाषाएं:**\n- हिंदी - व्यापक रूप से बोली जाती है\n- संथाली - आदिवासी भाषा\n- नागपुरी - क्षेत्रीय भाषा\n- अंग्रेजी - शहरी क्षेत्रों में\n\n**उपयोगी वाक्य:**\n- नमस्ते\n- धन्यवाद\n- कितना है?",
    bn: "আমি ঝাড়খণ্ডে কথিত ভাষাগুলিতে আপনাকে সাহায্য করতে পারি!",
    mr: "मी झारखंडमध्ये बोलल्या जाणार्‍या भाषांमध्ये तुम्हाला मदत करू शकतो!",
    te: "నేను ఝార్ఖండ్‌లో మాట్లాడే భాషలలో మీకు సహాయం చేయగలను!",
    ta: "ஜார்க்கண்டில் பேசப்படும் மொழிகளில் நான் உங்களுக்கு உதவ முடியும்!"
  },
  [Feature.GENERAL]: {
    en: "Hello! I'm your Jharkhand Tourism AI Assistant. I can help you with:\n\n✈️ Planning itineraries\n🛍️ Finding souvenirs\n📍 Location information\n🌐 Language assistance\n\nHow can I make your Jharkhand experience amazing today?",
    hi: "नमस्ते! मैं आपका झारखंड पर्यटन AI सहायक हूं। मैं आपकी इनमें मदद कर सकता हूं:\n\n✈️ यात्रा योजना\n🛍️ स्मृति चिन्ह खोजना\n📍 स्थान की जानकारी\n🌐 भाषा सहायता\n\nआज मैं आपके झारखंड अनुभव को कैसे अद्भुत बना सकता हूं?",
    bn: "হ্যালো! আমি আপনার ঝাড়খণ্ড পর্যটন AI সহায়ক। আমি আপনাকে সাহায্য করতে পারি:",
    mr: "नमस्कार! मी तुमचा झारखंड पर्यटन AI सहाय्यक आहे। मी तुम्हाला यामध्ये मदत करू शकतो:",
    te: "హలో! నేను మీ ఝార్ఖండ్ టూరిజం AI సహాయకుడిని। నేను మీకు వీటిలో సహాయం చేయగలను:",
    ta: "வணக்கம்! நான் உங்கள் ஜார்க்கண்ட் சுற்றுலா AI உதவியாளர். நான் உங்களுக்கு இவற்றில் உதவ முடியும்:"
  }
};

const generateBotMessage = (text: string, feature?: Feature): Message => {
  return {
    id: 'bot-' + Date.now(),
    text: text,
    sender: 'bot',
    timestamp: new Date(),
    feature: feature
  };
};

export const translateText = async (text: string, targetLang: Language, sourceLang: Language = 'en'): Promise<string> => {
  // Mock translation - in real implementation, this would use Google Translate API
  if (sourceLang === targetLang) return text;
  
  // Simple mock translations for demo
  const translations: Record<string, Record<Language, string>> = {
    "Hello": {
      hi: "नमस्ते",
      bn: "হ্যালো", 
      mr: "नमस्कार",
      te: "హలో",
      ta: "வணக்கம்",
      en: "Hello"
    }
  };
  
  return translations[text]?.[targetLang] || text;
};

export const getItinerary = async (prompt: string, language: Language = 'en'): Promise<Message> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const response = mockResponses[Feature.ITINERARY][language] || mockResponses[Feature.ITINERARY].en;
  return generateBotMessage(response, Feature.ITINERARY);
};

export const getLocationSuggestion = async (location: string, language: Language = 'en'): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const response = mockResponses[Feature.LOCATION][language] || mockResponses[Feature.LOCATION].en;
  return generateBotMessage(response, Feature.LOCATION);
};

export const getLanguageHelp = async (prompt: string, targetLanguage: Language): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const response = mockResponses[Feature.LANGUAGE][targetLanguage] || mockResponses[Feature.LANGUAGE].en;
  return generateBotMessage(response, Feature.LANGUAGE);
};

export const recommendSouvenirs = async (prompt: string, language: Language = 'en'): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const response = mockResponses[Feature.SOUVENIR][language] || mockResponses[Feature.SOUVENIR].en;
  return generateBotMessage(response, Feature.SOUVENIR);
};

export const getGeneralResponse = async (prompt: string, language: Language = 'en'): Promise<Message> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple keyword-based responses
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi') || lowerPrompt.includes('नमस्ते')) {
    const response = mockResponses[Feature.GENERAL][language] || mockResponses[Feature.GENERAL].en;
    return generateBotMessage(response, Feature.GENERAL);
  }
  
  if (lowerPrompt.includes('itinerary') || lowerPrompt.includes('plan') || lowerPrompt.includes('योजना')) {
    return getItinerary(prompt, language);
  }
  
  if (lowerPrompt.includes('souvenir') || lowerPrompt.includes('shopping') || lowerPrompt.includes('स्मृति')) {
    return recommendSouvenirs(prompt, language);
  }
  
  if (lowerPrompt.includes('location') || lowerPrompt.includes('place') || lowerPrompt.includes('स्थान')) {
    return getLocationSuggestion(prompt, language);
  }
  
  // Default response
  const defaultResponse = language === 'hi' 
    ? "मैं समझ नहीं पाया। कृपया मुझसे झारखंड पर्यटन के बारे में पूछें!" 
    : "I'd be happy to help you with Jharkhand tourism! You can ask me about itineraries, locations, souvenirs, or language help.";
    
  return generateBotMessage(defaultResponse, Feature.GENERAL);
};