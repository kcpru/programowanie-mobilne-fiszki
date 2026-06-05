import { createFileRoute, Outlet } from '@tanstack/react-router';
import mobileQuestionsData from '../data/pytania.json';
import cloudQuestionsData from '../data/przetwarzanie-w-chmurze.json';
import type { Question } from '../types';
import { z } from 'zod';

const dataSetSchema = z.enum(['mobile', 'cloud']);

export const Route = createFileRoute('/$dataSet')({
  parseParams: (params) => ({
    dataSet: dataSetSchema.parse(params.dataSet),
  }),
  loader: ({ params }) => {
    if (params.dataSet === 'mobile') {
      return mobileQuestionsData as Question[];
    } else if (params.dataSet === 'cloud') {
      return cloudQuestionsData as Question[];
    }
    throw new Error('Invalid data set');
  },
  component: DataSetLayout,
});

function DataSetLayout() {
  return <Outlet />;
}
