import { HeroBanner } from "src/containers/hero-banner";
import { HomeLayout } from "src/layouts/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <HeroBanner heading="Pocketex" />
    </HomeLayout>
  );
};

export default HomePage;
