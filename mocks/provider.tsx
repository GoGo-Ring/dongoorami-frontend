'use client';

import { useEffect, useState } from 'react';

import { PropsWithRequiredChildren } from '~/types/utils';

const isMockingMode = 'enabled';

const initMocks = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./node');

    server.listen();
  } else {
    const { worker } = await import('./browser');

    worker.start({ onUnhandledRequest: 'bypass' });
  }
};

export const MSWProvider = ({ children }: PropsWithRequiredChildren) => {
  const [mswReady, setMswReady] = useState(() => !isMockingMode);

  useEffect(() => {
    const init = async () => {
      if (isMockingMode) {
        await initMocks();
        setMswReady(true);
      }
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
