import { createFileRoute } from '@tanstack/react-router';
import { DataSetSelector } from '../components/DataSetSelector';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return <DataSetSelector />;
}
