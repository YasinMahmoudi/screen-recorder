import Header from "@/components/header";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import Divider from "@/components/ui/Divider";
import Pagination from "@/components/ui/Pagination";
import VideoList from "@/components/VideoList";
import React from "react";

export default function Page() {
  return (
    <PageWrapper>
      <TopHeader
        subTitle="yasin@dev.io"
        title="Yasin Mahmoudi"
        imageSrc="/images/avatar.jpg"
      />

      <Header />

      <VideoList />

      <Divider className="my-8" />

      <div className="flex justify-center">
        <Pagination />
      </div>
    </PageWrapper>
  );
}
