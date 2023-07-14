import Icon from 'components/common/Button/Icon';
import styled from 'styled-components';
import { IconCloudyParty, IconPalette, IconSunny } from '@style/icons';
import { useEffect, useRef, useState } from 'react';
import { customize } from '@style/colors';
import Toggle from 'components/common/Toggle';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

const PaletteDropdownContainer = styled.div`
  position: absolute;
  top: 3.5rem;
  display: flex;
  padding: 0.1rem;
  margin-top: 1rem;
  flex-direction: column;
  width: 10rem;
  height: auto;
  border-width: 1px;
  border-color: ${customize.gray['100']};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.mode.main};
`;

const PaletteDropdownMenu = styled.ul`
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const PaletteDropdownButton = styled.li`
  border-radius: 0.5rem;
  padding: 10px;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.mode.sub};
  color: ${({ theme }) => theme.mode.typo_sub};
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

export default function HeaderPalette() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isOn, setIsOn] = useState(false);

  const paletteRef = useRef<HTMLDivElement>(null);

  const handlePalette = () => {
    setIsOpened((prev) => !prev);
  };

  const handlePaletteOutside = (event: MouseEvent) => {
    if (
      paletteRef.current &&
      !paletteRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handlePaletteOutside);
    return () => {
      document.removeEventListener('mousedown', handlePaletteOutside);
    };
  }, [isOpened]);

  return (
    <>
      <Container ref={paletteRef}>
        <Icon icon={<IconPalette />} onClick={handlePalette}>
          Palette Settings
        </Icon>
        {isOpened && (
          <PaletteDropdownContainer>
            <PaletteDropdownMenu>
              <PaletteDropdownButton style={{ marginBottom: '10px' }}>
                Theme
                <Toggle
                  isOn={isOn}
                  setIsOn={setIsOn}
                  icons={[
                    <IconCloudyParty
                      key="cloud"
                      style={{ fill: customize.yellow['400'] }}
                    />,
                    <IconSunny
                      key="sunny"
                      style={{ fill: customize.yellow['300'] }}
                    />,
                  ]}
                />
              </PaletteDropdownButton>
              <PaletteDropdownButton>Color</PaletteDropdownButton>
            </PaletteDropdownMenu>
          </PaletteDropdownContainer>
        )}
      </Container>
    </>
  );
}
