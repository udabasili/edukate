import { MainLayout } from '@/components/Layout';
import { CategoriesList, Header, HowItWorks, PopularCourses } from '@/features/home';
import { withProtected } from '@/hook/route';
import { withAuthUser, AuthAction } from 'next-firebase-auth';

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
