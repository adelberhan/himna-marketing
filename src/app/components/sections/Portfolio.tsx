"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Camera, Video, Layers } from "lucide-react";
import { fetchPortfolio } from "@/services/supabase/portfolio";

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    const data = await fetchPortfolio();
    if (data) {
      setProjects(data);
      // استخراج الأنواع الفريدة الموجودة في البيانات فعلياً
      const types = Array.from(new Set(data.map((item: any) => item.type))) as string[];
      setAvailableTypes(types);
    }
    setLoading(false);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  // دالة مساعدة لاختيار الأيقونة المناسبة للنوع
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video': return <Video size={18} />;
      case 'image': 
      case 'photography': return <Camera size={18} />;
      default: return <Layers size={18} />;
    }
  };

  if (loading) return <div className="py-24 text-center">جاري تحميل المعرض...</div>;

  return (
    <section id="portfolio" className="py-24 bg-transparent" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-text-100 mb-4">معرض أعمالنا</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            نستعرض هنا نتاج شغفنا في صناعة المحتوى البصري والإنتاج المرئي.
          </p>
          
          {/* أزرار الفلترة الديناميكية */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-bold transition-all border hover:text-primary-200 ${
                filter === 'all' ? 'bg-foreground text-background border-foreground hover:text-primary-200 hover:bg-white' : 'border-input hover:bg-muted '
              }`}
            >
              الكل
            </button>
            {availableTypes.map((type) => (
              <button 
                key={type}
                onClick={() => setFilter(type)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all border capitalize hover:text-primary-200 ${
                  filter === type ? 'hover:bg-foreground bg-muted text-primary-200 hover:text-white border-foreground ' : 'border-input hover:bg-muted'
                }`}
              >
                {getTypeIcon(type)}
                {type === 'image' ? 'تصوير' : type === 'video' ? 'فيديو' : type === 'branding' ? 'براندينغ' : type === 'website' ? 'موقع ويب' : 'آخر'}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted shadow-sm border border-border">
                  {project.type === 'video' && project.video_url ? (
                    activeVideo === project.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeID(project.video_url)}?autoplay=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="relative w-full h-full cursor-pointer" onClick={() => setActiveVideo(project.id)}>
                        <img 
                          src={project.image_url || `https://img.youtube.com/vi/${getYouTubeID(project.video_url)}/maxresdefault.jpg`} 
                          alt={project.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                            <Play className="text-black fill-current w-5 h-5 mr-1" />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <img 
                      src={project.image_url} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  )}
                </div>
                <div className="mt-4 px-2 text-right">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {project.type}
                  </span>
                  <h3 className="text-lg font-bold mt-1 leading-tight">{project.title}</h3>
                  {project.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// دالة مساعدة لاستخراج ID اليوتيوب من الرابط
function getYouTubeID(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}