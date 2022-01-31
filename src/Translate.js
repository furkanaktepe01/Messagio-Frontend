import axios from "./axios";

export const doTranslation = async (text, lang) => {
            
    const { data } = await axios.post("https://translation.googleapis.com/language/translate/v2", {}, {
        params: {
            q: text,
            target: lang,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM"
        }
    });
        
    return data.data.translations[0].translatedText;
}

export const convertToLanguageCode = (languageInput) => {

    if(!languageInput) return "";
    const language = languageInput.toLowerCase();

    switch(language) {
        case "arabic":
            return "ar";
        case "english":
            return "en";
        case "portuguese":
            return "pt-BR";
        case "italian":
            return "it";
        case "french":
            return "fr";
        case "german":
            return "de";
        case "hebrew":
            return "iw";
        case "hindi":
            return "hi";    
        case "japanese":
            return "ja"; 
        case "korean":
            return "ko"; 
        case "russian":
            return "ru";
        case "chinese":
            return "zh-CN"; 
        case "swedish":
            return "sv"; 
        case "spanish":
            return "es";
        case "turkish":
            return "tr";  
        case "bosnian":
            return "bs";
        default:
            alert(languageInput + " is not a supported language")
            return "";                                   
    }
}

