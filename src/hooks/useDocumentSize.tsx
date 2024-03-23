import { useEffect, useState } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

const useDocumentSize = (): WindowSize => {
  const [documentSize, setDocumentSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setDocumentSize({
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      });
    };

    const handleMutation = () => {
      handleResize();
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);

      const observer = new MutationObserver(handleMutation);
      observer.observe(document.body, { subtree: true, childList: true });

      return () => {
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
      };
    }

    return () => {};
  }, []);

  return documentSize;
};

export default useDocumentSize;
