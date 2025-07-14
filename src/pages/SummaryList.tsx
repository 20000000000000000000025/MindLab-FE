import { useState } from "react";
import { Header } from "@/components/Header";
import { SummaryCard } from "@/components/SummaryCard";
import { SubjectFilter } from "@/components/SubjectFilter";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-banner.jpg";

// Mock data
const mockSummaries = Array.from({ length: 50 }, (_, i) => ({
  id: `summary-${i + 1}`,
  title: `학습 요약본 ${i + 1}: 주요 개념 정리`,
  content: `이 요약본은 중요한 학습 내용을 체계적으로 정리한 자료입니다. 핵심 개념들을 쉽게 이해할 수 있도록 구성되어 있으며, 효율적인 학습을 위한 다양한 방법론이 포함되어 있습니다.`,
  userEmail: `student${i + 1}@example.com`,
  subject: ["수학", "과학", "영어", "국어", "사회"][i % 5],
  viewCount: Math.floor(Math.random() * 1000) + 10,
}));

export const SummaryList = () => {
  const [selectedSubject, setSelectedSubject] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Filter summaries
  const filteredSummaries = mockSummaries.filter((summary) => {
    const matchesSubject = selectedSubject === "전체" || summary.subject === selectedSubject;
    const matchesSearch = searchQuery === "" || 
      summary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSummaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSummaries = filteredSummaries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            학습 요약본 보관소
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            다양한 과목의 학습 자료를 공유하고 함께 성장하는 학습 플랫폼
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        {/* Search and Filter */}
        <div className="bg-card rounded-xl shadow-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <SearchBar onSearch={setSearchQuery} />
            <SubjectFilter 
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            총 <span className="font-semibold text-foreground">{filteredSummaries.length}</span>개의 요약본
          </p>
          <p className="text-sm text-muted-foreground">
            {currentPage} / {totalPages} 페이지
          </p>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentSummaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              {...summary}
              onClick={() => console.log("Navigate to detail:", summary.id)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              이전
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              다음
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};