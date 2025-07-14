import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload as UploadIcon, FileText, Image, Video, Music, X, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Upload = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    tags: [] as string[],
    currentTag: ""
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ""
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith("image/")) return <Image className="h-4 w-4" />;
    if (type.startsWith("video/")) return <Video className="h-4 w-4" />;
    if (type.startsWith("audio/")) return <Music className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "오류",
        description: "제목을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.subject) {
      toast({
        title: "오류",
        description: "과목을 선택해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "오류",
        description: "파일을 업로드해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 여기에 실제 업로드 로직 추가
    toast({
      title: "업로드 완료",
      description: "요약이 성공적으로 업로드되었습니다.",
    });

    // 폼 초기화
    setFormData({
      title: "",
      subject: "",
      description: "",
      tags: [],
      currentTag: ""
    });
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">요약 업로드</h1>
          <p className="text-muted-foreground">학습 자료와 요약을 공유해보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 파일 업로드 영역 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadIcon className="h-5 w-5" />
                파일 업로드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">파일을 드래그하거나 클릭하여 업로드</h3>
                <p className="text-muted-foreground mb-4">
                  PDF, 이미지, 문서 파일을 지원합니다 (최대 10MB)
                </p>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  파일 선택
                </Button>
              </div>

              {/* 업로드된 파일 목록 */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold">업로드된 파일 ({files.length})</h4>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목 *</Label>
                  <Input
                    id="title"
                    placeholder="요약 제목을 입력하세요"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">과목 *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData(prev => ({...prev, subject: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="과목을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">수학</SelectItem>
                      <SelectItem value="science">과학</SelectItem>
                      <SelectItem value="korean">국어</SelectItem>
                      <SelectItem value="english">영어</SelectItem>
                      <SelectItem value="social">사회</SelectItem>
                      <SelectItem value="history">역사</SelectItem>
                      <SelectItem value="programming">프로그래밍</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  placeholder="요약에 대한 간단한 설명을 입력하세요"
                  className="min-h-[100px] resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                />
              </div>

              {/* 태그 */}
              <div className="space-y-2">
                <Label htmlFor="tags">태그</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="태그를 입력하고 Enter를 누르세요"
                    value={formData.currentTag}
                    onChange={(e) => setFormData(prev => ({...prev, currentTag: e.target.value}))}
                    onKeyPress={handleKeyPress}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    추가
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 업로드 버튼 */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" className="gap-2">
              <Check className="h-4 w-4" />
              업로드하기
            </Button>
          </div>
        </form>

        {/* 안내사항 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">업로드 안내사항</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 파일 크기는 최대 10MB까지 업로드 가능합니다</li>
                  <li>• PDF, DOC, DOCX, TXT, JPG, PNG 파일을 지원합니다</li>
                  <li>• 저작권을 침해하지 않는 자료만 업로드해주세요</li>
                  <li>• 부적절한 내용이 포함된 자료는 삭제될 수 있습니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};