import { useState, useEffect, SVGProps, FC } from 'react';
import { DynamicIcon } from 'types/hook';
import { IconType } from 'types/style';

export const useDynamicIcon: DynamicIcon<
  IconType,
  {
    loading: boolean;
    error: unknown;
    svg: FC<SVGProps<SVGElement>> | undefined;
  }
> = (icon) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [svg, setSvg] = useState<FC<SVGProps<SVGElement>> | undefined>(
    undefined
  );

  useEffect(() => {
    setLoading(true);

    const importSvgIcon = async (): Promise<void> => {
      try {
        const { ReactComponent } = await import(
          `../assets/icons/icon${icon}.svg`
        );
        setSvg(() => ReactComponent);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    importSvgIcon();
  }, [icon]);

  return {
    loading,
    error,
    svg,
  };
};
