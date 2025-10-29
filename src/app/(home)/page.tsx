import Header from "@/components/header";
import TopHeader from "@/components/TopHeader";
import VideoList from "@/components/VideoList";
import Divider from "@/components/ui/Divider";
import Pagination from "@/components/ui/Pagination";

export default function Home() {
  return (
    <main className="mx-auto my-4 max-w-7xl px-4 md:px-8 py-2 md:py-4">
      <TopHeader 
      subTitle="Public Assets"
      title="All Videos"
      
      />

      <Header />

      <VideoList />

      <Divider className="mt-8 mb-4"/>

      <div className="flex justify-center p-2">
        <Pagination />
      </div>
    </main>
  );
}
