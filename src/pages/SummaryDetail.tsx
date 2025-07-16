import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Heart, Share, Download, Eye, Calendar, User, BookOpen } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ShareModal } from "@/components/ShareModal";

export const SummaryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 샘플 데이터 - 실제로는 API에서 가져올 데이터
  const summary = {
    id: id || "1",
    title: "React 컴포넌트 설계 패턴",
    subject: "프론트엔드",
    author: "김개발",
    authorId: "author-1",
    uploadDate: "2024-01-15",
    views: 156,
    likes: 23,
    content: `
# React 컴포넌트 설계 패턴

## 1. 컴포넌트 구조화

React 애플리케이션에서 효율적인 컴포넌트 설계는 유지보수성과 재사용성을 높이는 핵심 요소입니다.

### 주요 패턴들:

**1. Container/Presentational 패턴**
- Container: 데이터 로직 담당
- Presentational: UI 렌더링만 담당
- 관심사의 분리로 테스트와 유지보수 용이

**2. Compound Component 패턴**
- 여러 컴포넌트가 함께 작동하여 하나의 기능 구현
- 예: Select, Dropdown 등
- 유연성과 재사용성 극대화

**3. Render Props 패턴**
- 컴포넌트 간 로직 공유
- 함수를 prop으로 전달하여 렌더링 제어
- HOC 대안으로 활용

## 2. 상태 관리

### useState vs useReducer
- 단순한 상태: useState
- 복잡한 상태 로직: useReducer
- 상태 업데이트 로직의 예측 가능성 중요

### Context API 활용
- 전역 상태 관리
- Prop drilling 방지
- 적절한 범위로 Context 분리

## 3. 성능 최적화

### React.memo
- 불필요한 리렌더링 방지
- props 비교를 통한 최적화
- 적절한 사용이 중요

### useMemo, useCallback
- 계산 비용이 높은 값 메모이제이션
- 자식 컴포넌트로 전달되는 함수 최적화
- 의존성 배열 관리 주의

## 4. 테스트 가능한 컴포넌트

### 단위 테스트
- 각 컴포넌트의 독립적 테스트
- Props에 따른 렌더링 결과 검증
- 사용자 상호작용 테스트

### 통합 테스트
- 여러 컴포넌트 간 상호작용 테스트
- 실제 사용자 시나리오 기반
- E2E 테스트와의 균형

## 5. 실전 팁

1. **컴포넌트는 작고 집중된 역할**을 가져야 합니다
2. **Props 인터페이스를 명확히** 정의하세요
3. **에러 바운더리**를 적절히 활용하세요
4. **접근성(a11y)**을 고려한 설계를 하세요
5. **성능 프로파일링**을 통해 병목 지점을 파악하세요

이러한 패턴들을 적절히 조합하여 사용하면 확장 가능하고 유지보수가 용이한 React 애플리케이션을 구축할 수 있습니다.
    `,
    tags: ["React", "컴포넌트", "설계패턴", "프론트엔드"]
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleAuthorClick = () => {
    navigate(`/author/${summary.authorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 뒤로가기 버튼 */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          뒤로가기
        </Button>

        {/* 헤더 카드 */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Badge variant="secondary" className="w-fit">
                  {summary.subject}
                </Badge>
                <CardTitle className="text-2xl">{summary.title}</CardTitle>
                
                {/* 작성자 정보 */}
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                  onClick={handleAuthorClick}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={summary.author} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {summary.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{summary.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {summary.uploadDate}
                    </div>
                  </div>
                </div>

                {/* 태그들 */}
                <div className="flex flex-wrap gap-2">
                  {summary.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 액션 버튼들 */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleFavoriteToggle}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Heart 
                    className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  {isFavorited ? '좋아요 해제' : '좋아요'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share className="h-4 w-4" />
                  공유
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  다운로드
                </Button>
              </div>
            </div>

            <Separator />

            {/* 통계 정보 */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                조회 {summary.views}회
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                좋아요 {summary.likes}개
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {summary.content.length}자
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 본문 카드 */}
        <Card>
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed bg-card p-4 rounded-md">
                {summary.content}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 */}
        <div className="flex justify-center gap-4">
          <Button onClick={handleAuthorClick} className="gap-2">
            <User className="h-4 w-4" />
            작성자 프로필 보기
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            목록으로 돌아가기
          </Button>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={window.location.href}
        title={summary.title}
      />
    </div>
  );
};

export default SummaryDetail;