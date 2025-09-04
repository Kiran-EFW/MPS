import { useState, useEffect, useRef, useCallback } from 'react';
import { showError } from '@/utils/toast';

interface SpeechRecognitionHook {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
}

const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechRecognition = (
  { onResult, lang }: { onResult: (transcript: string) => void, lang: string }
): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const hasRecognitionSupport = !!SpeechRecognition;

  useEffect(() => {
    if (!hasRecognitionSupport) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        const transcript = lastResult[0].transcript.trim() + ' ';
        onResult(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        showError(`Speech recognition error: ${event.error}`);
      }
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [hasRecognitionSupport, onResult, lang]);

  const startListening = useCallback(() => {
    if (!hasRecognitionSupport) {
      showError('Speech recognition is not supported in your browser.');
      return;
    }
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening, hasRecognitionSupport]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return { isListening, startListening, stopListening, hasRecognitionSupport };
};