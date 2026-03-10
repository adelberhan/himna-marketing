"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Camera, Video } from "lucide-react";

// أنواع الأعمال
type ProjectType = 'video' | 'photography';

const projects = [
  {
    id: "1",
    title: "حملة إعلانية مرئية",
    type: 'video' as ProjectType,
    category: "إدارة إعلانات",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: "2",
    title: "جلسة تصوير منتجات عطور",
    type: 'photography' as ProjectType,
    category: "تصوير فوتوغرافي",
    thumbnail: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "فيديو ترويجي لشركة عقارات",
    type: 'video' as ProjectType,
    category: "إنتاج مرئي",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: "4",
    title: "تصوير هوية بصرية مطعم",
    type: 'photography' as ProjectType,
    category: "تصوير فوتوغرافي",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <section id="portfolio" className="py-24 bg-bg-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-100 mb-4">معرض أعمالنا</h2>
          <p className="text-text-200 max-w-2xl mx-auto mb-8">نستعرض هنا نتاج شغفنا في صناعة المحتوى البصري والإنتاج المرئي.</p>
          
          {/* أزرار الفلترة بنمط مودرن وبسيط */}
          <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${filter === 'all' ? 'bg-primary-100 text-white' : 'bg-bg-200 text-text-200'}`}
            >
              الكل
            </button>
            <button 
              onClick={() => setFilter('photography')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${filter === 'photography' ? 'bg-primary-100 text-white' : 'bg-bg-200 text-text-200'}`}
            >
              <Camera size={18} /> تصوير
            </button>
            <button 
              onClick={() => setFilter('video')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${filter === 'video' ? 'bg-primary-100 text-white' : 'bg-bg-200 text-text-200'}`}
            >
              <Video size={18} /> فيديو
            </button>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-bg-200 shadow-soft border border-primary-100/5">
                  {project.type === 'video' ? (
                    activeVideo === project.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="relative w-full h-full cursor-pointer" onClick={() => setActiveVideo(project.id)}>
                        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-primary-100/10 flex items-center justify-center">
                          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                            <Play className="text-primary-100 fill-primary-100 w-5 h-5 ml-1" />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    /* عرض أعمال التصوير الفوتوغرافي */
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="mt-4 px-2">
                  <span className="text-xs font-bold text-primary-100 uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-lg font-bold text-text-100 mt-1">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}