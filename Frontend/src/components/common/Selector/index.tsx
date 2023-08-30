import {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from 'react';
import styled from 'styled-components';

import Divider from 'components/common/Divider';
import ErrorMessage from 'components/common/Message/ErrorMessage';
import { IconClose, IconDownArrow } from '@style/icons';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  min-height: 40px;
  border: 2px solid ${({ theme }) => theme.mode.typo_sub};
  border-radius: 5px;
  align-items: center;
  padding: 0.25rem 0.5rem;
  outline: none;
`;

const Label = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const Value = styled.span`
  flex-grow: 1;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
`;

const ValueContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 100%;
`;

const SingleTag = styled.span`
  font-size: 16px;
  line-height: 16px;
  height: 16px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const ValueTag = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.mode.typo_sub};
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  background-color: ${({ theme }) => theme.mode.main};
  color: ${({ theme }) => theme.mode.typo_main};
  padding: 0.15rem 0.25rem;
  gap: 8px;
  text-align: center;
`;

const ValueIndicator = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  gap: 8px;
`;

const Icon = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  svg {
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const Options = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  max-height: 200px;
  overflow-y: auto;
  border: 2px solid ${({ theme }) => theme.mode.typo_sub};
  border-radius: 0.25em;
  width: 100%;
  left: 0;
  top: calc(100% + 0.75em);
  background-color: ${({ theme }) => theme.mode.sub};
  z-index: 100;
`;

const Option = styled.li`
  padding: 0.25em 0.5em;
  cursor: pointer;
  color: ${({ theme }) => theme.mode.typo_sub};
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.mode.typo_sub};
  &:last-child {
    border-bottom: none;
  }
`;

const Empty = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.mode.typo_main};
`;

/**
 * * Multiple true : const [value, setValue] = useState<SelectorOptionType[]>([]);
 * * Multiple false : const [value, setValue] = useState<SelectorOptionType | undefined>(undefined);
 */
export default function Index({
  multiple,
  value,
  onChange,
  options,
  label,
  isValid,
  errorMessage,
  useValidation,
}: SelectorType) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selects, setSelects] = useState<string[]>(options);

  const selectOption = (option: string) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) return onChange(option);
    }
  };

  const onRemoveHandler = (event: ReactMouseEvent, value: string) => {
    event.stopPropagation();
    selectOption(value);
    setSelects((prev) => [...prev, value]);
  };

  const initSelectOption = () => {
    setSelects(options);
  };

  const onClearHandler = (event: ReactMouseEvent) => {
    event.stopPropagation();
    initSelectOption();
    setIsOpen(false);
    return multiple ? onChange([]) : onChange(undefined);
  };

  const handleOptions = (event: ReactMouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const onAddOption = (event: ReactMouseEvent, option: string) => {
    if (multiple) {
      event.stopPropagation();
      selectOption(option);
      setSelects((prev) => prev.filter((v) => v !== option));
      setIsOpen(false);
    } else {
      event.stopPropagation();
      selectOption(option);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {label && <Label>{label}</Label>}
      <Container ref={containerRef} onClick={handleOptions}>
        <ValueContainer>
          <Value>
            {multiple ? (
              value.map((v, idx) => (
                <ValueTag
                  key={idx}
                  onClick={(event) => onRemoveHandler(event, v)}
                >
                  {v}
                  <span className="remove-btn">&times;</span>
                </ValueTag>
              ))
            ) : (
              <SingleTag>{value}</SingleTag>
            )}
          </Value>
          {multiple ? (
            <ValueIndicator>
              {value.length !== 0 && (
                <>
                  <Icon onClick={(event) => onClearHandler(event)}>
                    <IconClose />
                  </Icon>
                  <Divider divider={1} />
                </>
              )}
              <Icon onClick={handleOptions}>
                <IconDownArrow />
              </Icon>
            </ValueIndicator>
          ) : (
            <Icon onClick={handleOptions}>
              <IconDownArrow />
            </Icon>
          )}
        </ValueContainer>
        <Options isOpen={isOpen}>
          {selects.length === 0 ? (
            <Empty>
              <span>목록이 없습니다.</span>
            </Empty>
          ) : (
            selects.map((option, index) => (
              <Option key={index} onClick={(e) => onAddOption(e, option)}>
                {option}
              </Option>
            ))
          )}
        </Options>
      </Container>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}
