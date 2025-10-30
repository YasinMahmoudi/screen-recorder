import Header from "@/components/header";
import TopHeader from "@/components/TopHeader";
import VideoList from "@/components/VideoList";
import Divider from "@/components/ui/Divider";
import Pagination from "@/components/ui/Pagination";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <TopHeader subTitle="Public Assets" title="All Videos" />

      <Header />

      <VideoList />

      <Divider className="mt-8 mb-4" />

      <div className="flex justify-center p-2">
        <Pagination />
      </div>
    </PageWrapper>
  );
}
