import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

interface GlobalErrorBoundaryProps {
    children: ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }: { reset: () => void }) => (
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                    {children}
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}
