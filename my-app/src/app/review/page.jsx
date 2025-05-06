
import React, { Suspense } from 'react';
const ReviewClient = React.lazy(() => import('./ReviewClient'));

export default function ReviewPage() {
  return (
    <Suspense fallback={<div>Loading review...</div>}>
      <ReviewClient />
    </Suspense>
  );
}
