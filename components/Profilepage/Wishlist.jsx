"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";

const MoodBoard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Worli Project",
      address: "Worli, Mumbai",
      products: 3,
      thumbnail: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Beach House",
      address: "Goa",
      products: 5,
      thumbnail: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
      createdAt: new Date().toISOString()
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleCreateProject = () => {
    if (!formData.name.trim()) return;
    
    const newProject = {
      id: Date.now(),
      name: formData.name,
      address: formData.address,
      products: [],
      thumbnail: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg", // Default thumbnail
      createdAt: new Date().toISOString()
    };

    setProjects(prev => [...prev, newProject]);
    setFormData({ name: "", address: "" });
    setShowCreateModal(false);
  };

  const handleEditProject = () => {
    if (!formData.name.trim() || !currentProject) return;

    setProjects(prev => prev.map(project => 
      project.id === currentProject.id 
        ? { ...project, name: formData.name, address: formData.address }
        : project
    ));
    setShowEditModal(false);
    setCurrentProject(null);
    setFormData({ name: "", address: "" });
  };

  const handleDeleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setFormData({ name: project.name, address: project.address });
    setShowEditModal(true);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Modal Component
  const Modal = ({ show, onClose, title, onSubmit, children }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          {children}
          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={onSubmit}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              {title === "Create New Project" ? "Create" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mood Board</h2>
          <p className="text-gray-500 mt-1">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Create New Project Card */}
        <button 
          onClick={() => setShowCreateModal(true)}
          className="aspect-square border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <Plus className="text-gray-600" />
          </div>
          <span className="text-gray-600 font-medium">Create New</span>
        </button>

        {/* Project Cards */}
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden"
          >
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <p className="text-white/80 text-sm">
                    {project.products.length} products
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(project)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Pencil size={16} className="text-white" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Project Modal */}
      <Modal 
        show={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
          setFormData({ name: "", address: "" });
        }}
        title={showEditModal ? "Edit Project" : "Create New Project"}
        onSubmit={showEditModal ? handleEditProject : handleCreateProject}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Address
            </label>
            <textarea 
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              rows={3}
              placeholder="Enter project address"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MoodBoard;
