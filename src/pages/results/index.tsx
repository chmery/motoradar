import { useRouter } from 'next/router';

const ResultsPage = () => {
  const router = useRouter();
  console.log(router.query);
};

export default ResultsPage;
