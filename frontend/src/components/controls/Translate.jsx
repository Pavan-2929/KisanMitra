// src/components/Translate.js
import React, { useEffect } from 'react';

const Translate = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };

    useEffect(() => {
        const addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return (
        <div className=' flex items-center justify-start'>
            <div id="google_translate_element"></div>
        </div>
    );
};

export default Translate;