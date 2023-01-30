import { MainLayout } from '@/components/Layout';
import { CategoriesList, Header, HowItWorks, PopularCourses } from '@/features/home';
import { withProtected } from '@/hook/route';

const Home = () => {
	return (
		<MainLayout title="Home Page">
			<Header />
			<HowItWorks />
			<CategoriesList />
			<PopularCourses />
		</MainLayout>
	);
};

export default withProtected(Home);
