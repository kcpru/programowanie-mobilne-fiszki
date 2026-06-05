import { createFileRoute } from '@tanstack/react-router';
import { MainMenu } from '../../components/MainMenu';

export const Route = createFileRoute('/$dataSet/')({
  component: DataSetIndex,
});

function DataSetIndex() {
  return <MainMenu />;
}
