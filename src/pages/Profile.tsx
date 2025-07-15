import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X } from "lucide-react";
import { useState } from "react";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "김영수",
    email: "youngsu.kim@example.com",
    phone: "010-1234-5678",
    location: "서울특별시 강남구",
    joinDate: "2024년 1월",
    bio: "안녕하세요! 학습 요약을 통해 더 효율적인 공부를 추구하는 학생입니다."
  });

  const handleSave = () => {
    // 여기에 프로필 저장 로직 추가
    setIsEditing(false);
  };

  const handleCancel = () => {
    // 변경사항 취소
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">프로필</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Edit3 className="h-4 w-4" />
              편집
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="gap-2">
                <Save className="h-4 w-4" />
                저장
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="gap-2">
                <X className="h-4 w-4" />
                취소
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 프로필 카드 */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg" alt="프로필 사진" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto">
                활성 사용자
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>가입일: {profile.joinDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* 정보 편집 카드 */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                개인 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">전화번호</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">지역</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">자기소개</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      placeholder="자기소개를 입력하세요..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">자기소개</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">이름</h4>
                      <p className="text-muted-foreground">{profile.name}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">이메일</h4>
                      <p className="text-muted-foreground">{profile.email}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">전화번호</h4>
                      <p className="text-muted-foreground">{profile.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">지역</h4>
                      <p className="text-muted-foreground">{profile.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 통계 카드들 */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">42</p>
                  <p className="text-sm text-muted-foreground">업로드한 요약</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">조회한 요약</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">23</p>
                  <p className="text-sm text-muted-foreground">즐겨찾기</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 내가 업로드한 요약본 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              내가 업로드한 요약본
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "1", title: "React 컴포넌트 설계 패턴", subject: "프론트엔드", date: "2024-01-15", views: 156 },
                { id: "2", title: "Node.js 성능 최적화", subject: "백엔드", date: "2024-01-10", views: 89 },
                { id: "3", title: "TypeScript 타입 활용법", subject: "프로그래밍", date: "2024-01-05", views: 134 }
              ].map((item) => (
                <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.subject}</Badge>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">조회 {item.views}회</p>
                    </div>
                    <Button variant="outline" size="sm">수정</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 즐겨찾기 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              즐겨찾기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "1", title: "Python 데이터 분석 기초", author: "박데이터", subject: "데이터과학", date: "2024-01-12" },
                { id: "2", title: "AWS 클라우드 아키텍처", author: "이클라우드", subject: "클라우드", date: "2024-01-08" },
                { id: "3", title: "머신러닝 알고리즘 비교", author: "김머신", subject: "AI/ML", date: "2024-01-03" }
              ].map((item) => (
                <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.subject}</Badge>
                        <span className="text-sm text-muted-foreground">by {item.author}</span>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <Button variant="outline" size="sm">제거</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 조회한 요약 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              최근 조회한 요약
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "1", title: "Docker 컨테이너 운영", author: "최도커", subject: "DevOps", date: "2024-01-16" },
                { id: "2", title: "GraphQL API 설계", author: "그래프", subject: "백엔드", date: "2024-01-14" },
                { id: "3", title: "Vue.js 3 Composition API", author: "뷰개발", subject: "프론트엔드", date: "2024-01-11" }
              ].map((item) => (
                <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{item.subject}</Badge>
                        <span className="text-sm text-muted-foreground">by {item.author}</span>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="font-medium">{item.title}</h3>
                    </div>
                    <Button variant="outline" size="sm">제거</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};