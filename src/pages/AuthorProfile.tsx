import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, User, Calendar, MapPin, BookOpen, Eye, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const AuthorProfile = () => {
  const navigate = useNavigate();
  const { authorId } = useParams();

  // 샘플 데이터 - 실제로는 API에서 가져올 데이터
  const author = {
    id: authorId || "author-1",
    name: "김개발",
    email: "kimdev@example.com",
    joinDate: "2023년 3월",
    location: "서울특별시",
    bio: "풀스택 개발자로 React, Node.js, Python을 주로 다룹니다. 새로운 기술을 학습하고 공유하는 것을 좋아합니다.",
    stats: {
      totalSummaries: 24,
      totalViews: 1250,
      totalLikes: 89
    }
  };

  // 작성자의 요약본들 (샘플 데이터)
  const authorSummaries = [
    {
      id: "1",
      title: "React 컴포넌트 설계 패턴",
      subject: "프론트엔드",
      uploadDate: "2024-01-15",
      views: 156,
      likes: 23
    },
    {
      id: "2", 
      title: "Node.js 성능 최적화 가이드",
      subject: "백엔드",
      uploadDate: "2024-01-10",
      views: 89,
      likes: 15
    },
    {
      id: "3",
      title: "TypeScript 고급 타입 활용법",
      subject: "프로그래밍",
      uploadDate: "2024-01-05",
      views: 134,
      likes: 28
    },
    {
      id: "4",
      title: "Docker 컨테이너 운영 실전 가이드",
      subject: "DevOps",
      uploadDate: "2023-12-28",
      views: 201,
      likes: 35
    }
  ];

  const handleSummaryClick = (summaryId: string) => {
    navigate(`/summary/${summaryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 뒤로가기 버튼 */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          뒤로가기
        </Button>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 작성자 프로필 카드 */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg" alt="프로필 사진" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{author.name}</CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto">
                활성 작성자
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>가입일: {author.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{author.location}</span>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">자기소개</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 통계 및 활동 */}
          <div className="md:col-span-2 space-y-6">
            {/* 통계 카드들 */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{author.stats.totalSummaries}</p>
                      <p className="text-sm text-muted-foreground">업로드한 요약</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{author.stats.totalLikes}</p>
                      <p className="text-sm text-muted-foreground">받은 좋아요</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 작성한 요약본 목록 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {author.name}님이 작성한 요약본
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {authorSummaries.map((summary) => (
                    <div 
                      key={summary.id}
                      onClick={() => handleSummaryClick(summary.id)}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {summary.subject}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {summary.uploadDate}
                            </span>
                          </div>
                          <h3 className="font-medium hover:text-primary transition-colors">
                            {summary.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {summary.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {summary.likes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};