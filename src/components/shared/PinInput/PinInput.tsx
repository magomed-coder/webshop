import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type KeyboardEvent,
  type ClipboardEvent,
  type CSSProperties,
} from "react";
import styles from "./PinInput.module.css";

interface PinInputProps {
  length?: number;
  onChange?: (value: string) => void;
  onComplete?: () => void;
  secret?: boolean;
  secretDelay?: number;
  regexCriteria?: RegExp;
  disabled?: boolean;
  focus?: boolean;
  setRef?: (ref: PinInputHandle | null) => void;
  inputStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  inputFocusStyle?: CSSProperties;
  success?: boolean;
  error?: boolean;
  clearError?: () => void;
}

// Интерфейс для внешнего управления через ref
export interface PinInputHandle {
  elements: { input: HTMLInputElement }[];
  clear: () => void;
  focus: (index?: number) => void;
}

const PinInput = forwardRef<PinInputHandle, PinInputProps>(
  (
    {
      length = 4,
      onChange,
      onComplete,
      secret = false,
      secretDelay = 100,
      inputStyle,
      containerStyle,
      regexCriteria = /^\d$/,
      disabled = false,
      focus = false,
      setRef,
      error,
      clearError,
      inputFocusStyle,
    },
    ref
  ) => {
    // Стейт значений инпутов (реальные значения)
    const [values, setValues] = useState<string[]>(Array(length).fill(""));

    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Стейт для отображения маскированных значений (если secret=true)
    const [maskedValues, setMaskedValues] = useState<string[]>(
      Array(length).fill("")
    );

    // Храним реальные рефы на все инпуты
    const inputsRef = useRef<HTMLInputElement[]>([]);

    // Определяем что будет доступно извне через ref
    useImperativeHandle(
      ref,
      () => ({
        elements: inputsRef.current.map((input) => ({ input })),
        clear: () => {
          setValues(Array(length).fill(""));
          setMaskedValues(Array(length).fill(""));
        },
        focus: (index = 0) => {
          const input = inputsRef.current[index];
          if (input) {
            input.focus();
            input.select();
          }
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

    // Дублируем ref наружу, если передан setRef проп
    useEffect(() => {
      if (setRef) {
        const handle: PinInputHandle = {
          elements: inputsRef.current.map((input) => ({ input })),
          clear: () => {
            setValues(Array(length).fill(""));
            setMaskedValues(Array(length).fill(""));
          },
          focus: (index = 0) => {
            const input = inputsRef.current[index];
            if (input) {
              input.focus();
              input.select();
            }
          },
        };
        setRef(handle);
      }
    }, [setRef, length]);

    // Если focus=true, фокусируем первый инпут при монтировании
    useEffect(() => {
      if (focus) {
        inputsRef.current[0]?.focus();
      }
    }, [focus]);

    // Обработка изменения текста в инпуте
    const handleChange = (index: number, value: string) => {
      if (disabled) return;
      if (!regexCriteria.test(value)) return;
      if (error) clearError?.();

      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (secret) {
        // Сначала показываем реальный символ
        setMaskedValues((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });

        // Через задержку маскируем его точкой
        setTimeout(() => {
          setMaskedValues((prev) => {
            const updated = [...prev];
            updated[index] = "•";
            return updated;
          });
        }, secretDelay);
      }

      if (onChange) {
        onChange(newValues.join(""));
      }

      // Если ввели символ, автоматически переходим к следующему инпуту
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      } else if (newValues.every((v) => v)) {
        // Если все поля заполнены — вызовем onComplete
        onComplete?.();
      }
    };

    // Обработка нажатий клавиш
    const handleKeyDown = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (disabled) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        const newValues = [...values];
        const newMasked = [...maskedValues];

        // Если есть значение — удаляем его
        if (values[index]) {
          newValues[index] = "";
          newMasked[index] = "";
          setValues(newValues);
          setMaskedValues(newMasked);
          if (onChange) onChange(newValues.join(""));
        } else if (index > 0) {
          // Если поле пустое — идем на предыдущий и очищаем его
          inputsRef.current[index - 1]?.focus();
          newValues[index - 1] = "";
          newMasked[index - 1] = "";
          setValues(newValues);
          setMaskedValues(newMasked);
          if (onChange) onChange(newValues.join(""));
        }
      }

      if (e.key === "Delete") {
        e.preventDefault();
        const newValues = [...values];
        const newMasked = [...maskedValues];

        // Просто очищаем текущее поле
        newValues[index] = "";
        newMasked[index] = "";
        setValues(newValues);
        setMaskedValues(newMasked);
        if (onChange) onChange(newValues.join(""));
      }

      if (e.key === "ArrowLeft") {
        // Стрелка влево — переход к предыдущему инпуту
        if (index > 0) inputsRef.current[index - 1]?.focus();
        if (index > 0) inputsRef.current[index - 1]?.select();
      }
      if (e.key === "ArrowRight") {
        // Стрелка вправо — переход к следующему инпуту
        if (index < length - 1) {
          inputsRef.current[index + 1]?.focus();
          inputsRef.current[index + 1]?.select();
        }
      }
    };

    // Обработка вставки текста через буфер обмена
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      e.preventDefault();

      // Берем текст из буфера обмена, обрезаем до нужной длины
      const pasteData = e.clipboardData
        .getData("text")
        .slice(0, length)
        .split("");

      const newValues = [...values];
      const newMasked = [...maskedValues];

      // Вставляем символы по одному
      pasteData.forEach((char, idx) => {
        if (regexCriteria.test(char)) {
          newValues[idx] = char;
          newMasked[idx] = secret ? "•" : char;
        }
      });

      setValues(newValues);
      setMaskedValues(newMasked);

      if (onChange) {
        onChange(newValues.join(""));
      }
      if (newValues.every((v) => v)) {
        onComplete?.();
      }
    };

    // При фокусе на инпут — выделяем его содержимое
    const handleFocus = (index: number) => {
      if (disabled) return;
      inputsRef.current[index]?.select();
      setFocusedIndex(index);
    };

    const handleBlur = () => {
      setFocusedIndex(null);
    };

    return (
      <div className={styles.pin_input_container} style={{ ...containerStyle }}>
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) {
                inputsRef.current[index] = el;
              }
            }}
            value={secret ? maskedValues[index] : value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            className={`${styles.pin_input} ${error ? styles.error : ""} ${
              disabled ? styles.disabled : ""
            }`}
            style={{
              ...inputStyle,
              ...(focusedIndex === index ? inputFocusStyle : {}),
            }}
            disabled={disabled}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        ))}
      </div>
    );
  }
);

PinInput.displayName = "PinInput";
export default PinInput;
